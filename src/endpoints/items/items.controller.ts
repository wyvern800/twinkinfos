import { Router, Response, Request } from 'express';
import * as repository from './items.repository';
import DatabaseError from '../../utils/errorTypes/database';
import * as validator from './items.validator';

import expressValidator from '../../middlewares/ExpressValidator';

require('dotenv').config();

const routes = Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Gets all items from WoW
 *     description: Endpoint to retrieve items from World of Warcraft.
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Item name (optional)
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of items.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 description: Unique identifier for the item
 *               name:
 *                 type: string
 *                 description: Name of the item
 *               icon:
 *                 type: string
 *                 format: uri
 *                 description: URL to the item's icon image
 *               class:
 *                 type: string
 *                 description: Item class (e.g., Weapon, Armor, etc.)
 *               subclass:
 *                 type: string
 *                 description: Item subclass (e.g., Sword, Plate, etc.)
 *               sellPrice:
 *                 type: integer
 *                 description: Price at which the item can be sold
 *               quality:
 *                 type: string
 *                 description: Item quality (e.g., Epic, Rare, etc.)
 *               itemLevel:
 *                 type: integer
 *                 description: Level of the item
 *               requiredLevel:
 *                 type: integer
 *                 description: Minimum level required to use the item
 *               slot:
 *                 type: string
 *                 description: Equipment slot for the item (e.g., Two-Hand, Head, etc.)
 *               tooltip:
 *                 type: array
 *                 description: Array of tooltip labels describing the item
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       description: Label describing the item property
 *                     format:
 *                       type: string
 *                       description: Format for displaying the item property
 *               itemLink:
 *                 type: string
 *                 description: Link to the item in the game
 *               contentPhase:
 *                 type: integer
 *                 description: Phase of the game content in which the item is available
 *               source:
 *                 type: object
 *                 description: Details about the source of the item
 *                 properties:
 *                   category:
 *                       type: string
 *                       description: Category of the item
 *                   dropChance:
 *                       type: double
 *                       description: Drop chance
 */
routes.get(
  '/',
  validator.search,
  expressValidator,
  async (request: Request, response: Response) => {
    const { name, page } = request.query;

    /* const paginate = (items, perPage = 3) => {
      const offset = perPage * (page - 1);
      const totalPages = Math.ceil(items.length / perPage);
      const paginatedItems = items.slice(offset, perPage * page);

      return {
        previousPage: page - 1 ? page - 1 : null,
        nextPage: totalPages > page ? page + 1 : null,
        total: items.length,
        totalPages,
        items: paginatedItems,
      };
    }; */

    try {
      const items = await repository.getAllItems(name);

      /* if (page) {
        const paginated = paginate(user);
        return response.status(200).json(paginated);
      } */

      return response.status(200).json(items);
    } catch (err) {
      throw new DatabaseError('Failed to fetch data from the database.');
    }
  },
);

export default routes;
