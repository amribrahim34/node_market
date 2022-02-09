import express from 'express';
import categories from './api/categories';
import users from './api/users';

const routes = express.Router();
routes.use('/categories', categories);
routes.use('/users', users);

export default routes;
