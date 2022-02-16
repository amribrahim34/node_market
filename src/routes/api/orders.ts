import express from 'express';
import bodyParser from 'body-parser';
import { OrderModel, OrderType } from '../../models/order';
import jwt from 'jsonwebtoken';

const orders = express.Router();
orders.use(bodyParser.urlencoded({ extended: false }));
orders.use(bodyParser.json());

/**
 * methode to get all orders from the database
 * @method get
 * @return orders
 */
orders.get('/', (req: express.Request, res: express.Response): void => {
  OrderModel.index()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
   * methode to insert new order to the database
   * @method POST
   * @param [products , user_id , quantity]
   * @return order
   */
orders.post(
  '/create',
  (req: express.Request, res: express.Response): void => {
    const order = req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    OrderModel.create(order)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
   * methode to update order in the database
   * @method PUT
   * @param [id ,products , user_id , quantity]
   * @return order
   */
orders.put(
  '/update',
  (req: express.Request, res: express.Response): void => {
    const order = req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    OrderModel.update(order)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
   * methode to delete order from the database
   * @method delete
   * @param Id
   * @return message
   */
orders.delete(
  '/delete',
  (req: express.Request, res: express.Response): void => {
    const id: number = Number(req.query.id);
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    OrderModel.delete(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

export default orders;
