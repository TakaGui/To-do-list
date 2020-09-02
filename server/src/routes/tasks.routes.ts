import { Router } from 'express';

import TasksRepository from '../repositories/TasksRepository';

const tasksRouter = Router();

const tasksRepository = new TasksRepository();

tasksRouter.get('/', tasksRepository.index);
tasksRouter.post('/', tasksRepository.create);
tasksRouter.put('/:id', tasksRepository.update);
tasksRouter.delete('/:id', tasksRepository.delete);

export default tasksRouter;
