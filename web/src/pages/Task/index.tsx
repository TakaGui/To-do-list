import 
  React, { 
    useState, 
    useEffect, 
    useCallback
  } 
from 'react';

import { FiEdit, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import { Title, Form, Tasks } from './styles';

interface ITask {
  id: number;
  title: string;
  description?: string;
  status?: string;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      const response = await api.get('/tasks');

      setTasks(response.data);
    }

    loadTasks();
  });

  const handleAddTask = useCallback(
    async(data: ITask) => {
      try {
        await api.post('/task', data);

        setTasks([...tasks, data]);
      } catch (err) {
        console.log(err);
      }
    }, [tasks]);

  async function handleDeleteTask(id: number): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Title>Adicione uma tarefa</Title>

      <Form onSubmit={() => handleAddTask}>
        <input
          placeholder="Digite uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </Form>

      <Tasks>
        {tasks && tasks.map((task) => (
          <div key={task.id}>
            <strong>{task.title}</strong>

            <button>
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
    </>
  );
}

export default Task;
