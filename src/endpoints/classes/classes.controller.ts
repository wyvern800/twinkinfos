import { Router, Response, Request } from 'express';
import * as repository from './classes.repository';
import DatabaseError from '../../utils/errorTypes/database';
import * as validator from './classes.validator';
import ResponseBase from '../../utils/response';

require('dotenv').config();

const routes = Router();

// TODO:
routes.get(
  '/',
  validator.search,
  async (request: Request, response: Response) => {
    const { name } = request.query;

    try {
      const classes = await repository.getAllClasses(name);
      return ResponseBase.success(response, classes);
    } catch (err) {
      throw new DatabaseError('Failed to fetch data from the database.');
    }
  },
);

export default routes;
