/* eslint-disable import/prefer-default-export */
import { query } from 'express-validator';

export const searchForItem = [
  query('name')
    .optional()
    .isString()
    .withMessage('A name is required to search.'),
];
