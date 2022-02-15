import express from 'express';
import bodyParser from 'body-parser';
import { ProductModel, ProductType } from '../../models/product';

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
    const Product :ProductType= req.body;
    console.log(Product);
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
