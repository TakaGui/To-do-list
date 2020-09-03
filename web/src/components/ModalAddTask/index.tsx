import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface ICreateTaskData {
  title: string;
  description: string;
  status: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTask: (task: Omit<ITask, 'id'>) => void;
}

const ModalAddTask: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTask,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateTaskData) => {
      handleAddTask(data);

      setIsOpen();
    },
    [handleAddTask, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Tarefa</h1>

        <Input name="title" placeholder="Digite o título da tarefa aqui" />

        <Input name="description" placeholder="Digite a descrição aqui" />

        <button type="submit">
          <p className="text">Adicionar Tarefa</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;