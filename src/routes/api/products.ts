import express from 'express';
import bodyParser from 'body-parser';
import { ProductModel, ProductType } from '../../models/product';
import jwt from 'jsonwebtoken';

const products = express.Router();
products.use(bodyParser.urlencoded({ extended: false }));
products.use(bodyParser.json());

/**
 * methode to get all products from the database
 * @method get
 * @return products
 */
products.get('/', (req: express.Request, res: express.Response): void => {
  ProductModel.index()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
   * methode to insert new Product to the database
   * @method POST
   * @param [products , user_id , quantity]
   * @return Product
   */
products.post(
  '/create',
  (req: express.Request, res: express.Response): void => {
    const Product = req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    ProductModel.create(Product)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
   * methode to update Product in the database
   * @method PUT
   * @param [id ,products , user_id , quantity]
   * @return Product
   */
products.put(
  '/update',
  (req: express.Request, res: express.Response): void => {
    const Product :ProductType= req.body;
    try {
      jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    } catch (error) {
      res.status(401)
      res.json(`invalid token ${error}`)
      return;
    }
    ProductModel.update(Product)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
   * methode to delete Product from the database
   * @method delete
   * @param Id
   * @return message
   */
products.delete(
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
    ProductModel.delete(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

export default products;
