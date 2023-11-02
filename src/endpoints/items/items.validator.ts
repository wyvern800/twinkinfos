/* eslint-disable import/prefer-default-export */
import { query, ValidationChain } from 'express-validator';

/**
 * Validation chain for SEARCHING items
 */
export const search: ValidationChain[] = [
  query('name').exists().withMessage('A name is required to search.'),
];
