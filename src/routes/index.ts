import express from 'express';
import carts from './api/carts';
import categories from './api/categories';
import orders from './api/orders';
import products from './api/products';
import users from './api/users';

const routes = express.Router();
routes.use('/categories', categories);
routes.use('/users', users);
routes.use('/carts', carts);
routes.use('/orders', orders);
routes.use('/products', products);

export default routes;
