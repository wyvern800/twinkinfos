/* eslint-disable import/prefer-default-export */
import { query, ValidationChain } from 'express-validator';

/**
 * Validation chain for SEARCHING classes
 */
export const search: ValidationChain[] = [
  query('name')
    .optional()
    .isString()
    .withMessage('A name is required to search.'),
];
