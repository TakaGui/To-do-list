import { Request, Response } from 'express';

import knex from '../database/connection';

class TasksRepository {
  async index(request: Request, response: Response) {
    const tasks = await knex('tasks').select('*');

    return response.json(tasks);
  }

  async create(request: Request, response: Response) {
    const { title, description, status } = request.body;

    await knex('tasks').insert({
      title,
      description,
      status,
    });

    response.json({ success: true });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description } = request.body;

    const task = await knex('tasks').where('id', id).first();

    if (!task) {
      return response.status(400).json({ message: 'Task not found.' });
    }

    await knex('tasks')
      .where({id})
      .update({ title, description });
    
    response.json({ success: true });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const task = await knex('tasks').where('id', id).first();
  
    if (!task) {
      return response.status(400).json({ message: 'Task not found.' });
    }
  
    await knex('tasks')
      .where({id})
      .del();
  
    response.json({ success: true });
  }
}

export default TasksRepository;
