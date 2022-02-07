import express from 'express';
import categories from './api/categories';

const routes = express.Router();
routes.use('/categories', categories);

export default routes;
