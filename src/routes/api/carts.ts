import express from 'express';
import { CartModel, CartType } from '../../models/cart';


const carts = express.Router();


/**
 * methode to get all carts from the database
 * @method get
 * @return carts
 */
 carts.get('/', (req: express.Request, res: express.Response): void => {
    CartModel.index()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  });
  
  /**
   * methode to insert new Cart to the database
   * @method POST
   * @param product_id , user_id
   * @return Cart
   */
  carts.post(
    '/create',
    (req: express.Request, res: express.Response): void => {
      const cartArray :any= req.query.carts;
      CartModel.create(cartArray)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.send(error);
        });
    },
  );
  
  /**
   * methode to update Cart in the database
   * @method PUT
   * @param [Name , Id]
   * @return Cart
   */
  carts.put(
    '/update',
    (req: express.Request, res: express.Response): void => {
        const id: number = Number(req.query.id);
        const user_id: number = Number(req.query.user_id);
        const product_id: number = Number(req.query.product_id);
        const cart: CartType = {
            id: id,
            user_id: user_id,
            product_id: product_id
        }
      CartModel.update(cart)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.send(error);
        });
    },
  );
  
  /**
   * methode to delete Cart from the database
   * @method delete
   * @param Id
   * @return message
   */
  carts.delete(
    '/delete',
    (req: express.Request, res: express.Response): void => {
      const id: number = Number(req.query.id);
      CartModel.delete(id)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.send(error);
        });
    },
  );
  
  export default carts;