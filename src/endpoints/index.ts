import auth from './auth/auth.controller';
import users from './users/users.controller';
import items from './items/items.controller';

// Controllers
import { Controller } from '../types/controller';

// Define the routes with its controllers here
export default [
  { endpoint: '/auth', controller: auth },
  { endpoint: '/users', controller: users },
  { endpoint: '/items', controller: items },
] as Controller[];
