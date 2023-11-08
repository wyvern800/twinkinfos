/* eslint-disable no-underscore-dangle */
import { Router, Response, Request } from 'express';
import { DeepPartial } from 'typeorm';
import Build from '../../models/Build';
import jwtWebToken from '../../middlewares/JwtWebToken';
import * as repository from './builds.repository';
import * as validator from './builds.validator';

import BaseResponse from '../../utils/response';

import expressValidator from '../../middlewares/ExpressValidator';

import * as itemsRepository from '../items/items.repository';

import { equipment } from '../../utils/constants';
import * as buildParser from './build.parser';

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
routes.get(
  '/',
  validator.searchByClass,
  expressValidator,
  async (request: Request, response: Response): Promise<any> => {
    const { search } = request.query;
    let resp: any;
    try {
      const builds = await repository.getAllBuilds(search);

      const parsedBuilds = await Promise.all(
        builds.map(
          async (build: any): Promise<any> => {
            if (build) {
              const result = await repository.getByIdMongo({
                buildId: build.id,
              });

              if (result) {
                const parsedBuild = { ...build, ...result };
                return parsedBuild;
              }
            }
            return build;
          },
        ),
      );
      resp = BaseResponse.success(response, parsedBuilds);
    } catch (err) {
      resp = BaseResponse.internalError(response, { error: "Didn't work" });
    }
    return resp;
  },
);

routes.post(
  '/',
  validator.createBuild,
  expressValidator,
  jwtWebToken,
  async (request: Request, response: Response): Promise<any> => {
    let responseToFront: any | undefined;
    const {
      alias,
      className,
      user,
      hordeRace,
      allianceRace,
      bracket,
    } = request.body;

    try {
      const postgresBuild: DeepPartial<Build> = {
        alias,
        className,
        user,
        hordeRace,
        allianceRace,
        bracket,
      };

      const createdBuild = await repository.insert(postgresBuild);

      const mongoBuild = { buildId: createdBuild.id, ...request.body };

      // Delete the keys that arent part of the equipment
      Object.keys(mongoBuild).map((key: any): void => {
        if (!equipment.includes(key) && key !== 'buildId') {
          delete mongoBuild[key];
        }
        return key;
      });

      const newBuildObject: any = buildParser.parseBuild(
        request.body,
        itemsRepository,
      );

      const result = await repository.insertMongo({
        ...newBuildObject,
        buildId: createdBuild.id,
      });

      if (result) {
        const toFront = {
          ...createdBuild,
          ...mongoBuild,
          mongoBuildId: mongoBuild.id,
        };

        delete toFront._id;

        responseToFront = BaseResponse.success(response, toFront);
      }
    } catch (error) {
      responseToFront = BaseResponse.error(response, error);
    }
    return responseToFront;
  },
);

export default routes;
