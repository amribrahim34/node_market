import express from 'express';
import bodyParser from 'body-parser';
import { CartModel, CartType } from '../../models/cart';
import jwt from 'jsonwebtoken';

const carts = express.Router();
carts.use(bodyParser.urlencoded({ extended: false }));
carts.use(bodyParser.json());

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
    const cartArray = req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
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
    const cartArray :CartType[] = req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    CartModel.update(cartArray)
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
    const id: number = Number(req.body.id);
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
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
