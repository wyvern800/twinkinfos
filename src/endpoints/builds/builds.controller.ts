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
  async (request: Request, response: Response) => {
    const { search } = request.query;

    const allBuilds = await repository.getAllBuilds(search);
    const parsedBuilds: any[] = [];

    allBuilds.map(build => {
      const newBuildObject: any = { ...build };

      // Map all builds and their object key/vals
      Object.entries(build).map(([buildKey, buildValue]) => {
        if (buildValue !== null) {
          const newBuildEquipmentParsed: any = {};
          // if the build key is within the equipments array, then proceed the parsing
          if (equipment.includes(buildKey)) {
            Object.entries(buildValue).map(([k, v]) => {
              // Convert mainItemId to an actual item
              if (k === 'hordeMainItemId') {
                const item = itemsRepository.getById(Number(v));
                if (item) {
                  // newBuildEquipmentParsed.mainItem = item;
                  newBuildEquipmentParsed.hordeItem = item;
                }
              } else if (k === 'allianceMainItemId') {
                const item = itemsRepository.getById(Number(v));
                if (item) {
                  // newAlternactive.item = item;
                  newBuildEquipmentParsed.allianceItem = item;
                }
              } else if (k === 'alternatives') {
                const parsedAlternactives: any[] = [];
                const alternativesOriginal: any = v;
                alternativesOriginal.map((alt: any) => {
                  const newAlternactive: any = {};
                  // Map the alternactive object
                  Object.entries(alt).map(([altKey, altVal]) => {
                    if (altKey === 'hordeItemId') {
                      const item = itemsRepository.getById(Number(altVal));
                      if (item) {
                        // newAlternactive.item = item;
                        newAlternactive.hordeItem = { ...item, isHorde: true };
                      }
                    } else if (altKey === 'allianceItemId') {
                      const item = itemsRepository.getById(Number(altVal));
                      if (item) {
                        // newAlternactive.item = item;
                        newAlternactive.allianceItem = {
                          ...item,
                          isHorde: false,
                        };
                      }
                    } else {
                      newAlternactive.priority = altVal;
                    }

                    return [altKey, altVal];
                  });
                  parsedAlternactives.push(newAlternactive);
                  return newAlternactive;
                });
                // Map the alternatives
                newBuildEquipmentParsed.alternatives = parsedAlternactives.sort(
                  a => a.priority,
                );
              }
              return [k, v];
            });

            // delete all old object vals
            Object.entries(newBuildObject).map(([nBOK, nBOV]) => {
              if (!equipment.includes(nBOK)) {
                delete newBuildObject[nBOK];
              }
              return [nBOK, nBOV];
            });

            newBuildObject[buildKey] = newBuildEquipmentParsed;
          }

          return newBuildEquipmentParsed;
        }
        return [buildKey, buildValue];
      });

      parsedBuilds.push({ ...build, ...newBuildObject });
      return build;
    });

    return BaseResponse.success(response, parsedBuilds);
  },
);

/* routes.get('/builds/view/:buildId', async (request: Request, response) => {

}); */

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
