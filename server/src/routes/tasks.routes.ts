import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/', (request, response) => {
  return response.json({ task: 'test' });
});

export default tasksRouter;
