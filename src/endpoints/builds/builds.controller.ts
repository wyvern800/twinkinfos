import { Router, Response, Request } from 'express';
import { DeepPartial } from 'typeorm';
import Build from '../../models/Build';
import jwtWebToken from '../../middlewares/JwtWebToken';
import * as repository from './builds.repository';
import * as validator from './builds.validator';

import BaseResponse from '../../utils/response';

import expressValidator from '../../middlewares/ExpressValidator';

const routes = Router();

/**
 * @swagger
 * /builds:
 *   get:
 *     summary: Get a list of builds
 *     description: Retrieve a list of users from the database.
 *     tags: [Builds]
 *     responses:
 *       200:
 *         description: Successful response with a list of users
 */
routes.get('/', async (request: Request, response: Response) => {
  const allBuilds = await repository.getAllBuilds();
  return BaseResponse.success(response, allBuilds);
});

// TODO:
routes.post(
  '/',
  validator.createBuild,
  expressValidator,
  jwtWebToken,
  async (request: Request, response: Response): Promise<unknown> => {
    const user: DeepPartial<Build> = { ...request.body };

    try {
      const createdBuild = await repository.insert(user);
      return BaseResponse.success(response, createdBuild);
    } catch (error) {
      return BaseResponse.error(response, error);
    }
  },
);

export default routes;
