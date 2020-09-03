import 
  React, {
    useRef,
    useState, 
    useEffect, 
    useCallback
  } 
from 'react';
import { FormHandles } from '@unform/core';
import { FiPlusCircle, FiEdit, FiTrash } from 'react-icons/fi';

import api from '../../services/api';
import ModalAddTask from '../../components/ModalAddTask';
import ModalEditTask from '../../components/ModalEditTask';

import { Header, Title, Form, Tasks } from './styles';

interface ITask {
  id: number;
  title: string;
  description?: string;
  status?: string;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<ITask>({} as ITask);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      const response = await api.get('/tasks');

      setTasks(response.data);
    }

    loadTasks();
  });

  const handleGetTask = useCallback(
    async (task: ITask) => {
      try {
        console.log('pesquisar')
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  async function handleUpdateTask(
    task: Omit<ITask, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/tasks/${editingTask.id}`, {
        ...editingTask,
        ...task,
      });

      console.log(response.data);

      setTasks(
        tasks.map(mapTask =>
          mapTask.id === editingTask.id ? { ...response.data } : mapTask,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteTask(id: number): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function toggleAddModal(): void {
    setAddModalOpen(!addModalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  async function handleAddTask(
    task: Omit<ITask, 'id' | 'status'>,
  ): Promise<void> {
    try {
      const response = await api.post('/tasks', {
        ...task,
        status: 'em aberto'
      });

      console.log(response.data);

      setTasks([...tasks, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEditTask(task: ITask): void {
    setEditingTask(task);

    toggleEditModal();
  }

  return (
    <>
      <Header>
        <Title>Pesquise uma tarefa</Title>
        <button onClick={() => toggleAddModal()}>
          <FiPlusCircle />
        </button>
      </Header>
      
      <Form ref={formRef} onSubmit={handleGetTask}>
        <input name="title" placeholder="Digite o título da tarefa aqui" />

        <button type="submit">Pesquisar</button>
      </Form>

      <Tasks>
        {tasks && tasks.map((task) => (
          <div key={task.id}>
            <strong>{task.title}</strong>

            <button
              onClick={() => handleEditTask(task)}
            >
              <FiEdit size={35} />
            </button>

            <button
              onClick={() => handleDeleteTask(task.id)}
            >
              <FiTrash size={35} />
            </button>
          </div>
        ))}        
      </Tasks>

      <ModalAddTask
        isOpen={addModalOpen}
        setIsOpen={toggleAddModal}
        handleAddTask={handleAddTask}
      />

      <ModalEditTask
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingTask={editingTask}
        handleUpdateTask={handleUpdateTask}
      />
    </>
  );
}

export default Task;
