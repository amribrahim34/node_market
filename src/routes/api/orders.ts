import express from 'express';
import { OrderModel, OrderType } from '../../models/order';


const orders = express.Router();


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
      const user_id: number = Number(req.query.user_id);
      const quantity: number = Number(req.query.quantity);
      const products: number = Number(req.query.products);
      const order:OrderType = {
          user_id: user_id,
          quantity: quantity,
          products: products
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
        const id: number = Number(req.query.id);
        const user_id: number = Number(req.query.user_id);
        const quantity: number = Number(req.query.quantity);
        const products: number = Number(req.query.products);
        const order: OrderType = {
            id: id,
            user_id: user_id,
            quantity: quantity,
            products: products
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