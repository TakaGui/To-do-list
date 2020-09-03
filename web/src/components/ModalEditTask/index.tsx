import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ITask {
  id: number;
  title: string;
  description?: string;
  status?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateTask: (task: Omit<ITask, 'id'>) => void;
  editingTask: ITask;
}

interface IEditTaskData {
  title: string;
  description?: string;
}

const ModalEdit: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingTask,
  handleUpdateTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditTaskData) => {
      handleUpdateTask(data);

      setIsOpen();
    },
    [handleUpdateTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingTask}>
        <h1>Editar Tarefa</h1>

        <Input name="title" placeholder="Digite o título da tarefa aqui" />

        <Input name="description" placeholder="Digite a descrição aqui" />

        <button type="submit" >
          <div className="text">Editar Tarefa</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
