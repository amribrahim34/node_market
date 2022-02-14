import express from 'express';
import { CartModel, CartType } from '../../models/cart';
import bodyParser from 'body-parser';


// const jsonParser = bodyParser.json()
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
    // jsonParser,
    (req: express.Request, res: express.Response): void => {
      const cartArray = req.body;
      console.log(cartArray);
      CartModel.create(cartArray)
        .then((result) => {
          console.log('done');
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
      const cartArray :CartType[]= req.body.carts;
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