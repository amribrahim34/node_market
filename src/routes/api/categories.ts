import express from 'express';
import { Category, CategoryType } from '../../models/category';
import bodyParser from 'body-parser';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';


const categories = express.Router();
categories.use(bodyParser.urlencoded({ extended: false }));
categories.use(bodyParser.json());

/**
 * methode to get all categories from the database
 * @method get
 * @return Categories
 */
categories.get('/', (req: express.Request, res: express.Response): void => {
  Category.index()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * methode to insert new category to the database
 * @method POST
 * @param Name
 * @return Category
 */
categories.post(
  '/create',
  (req: express.Request, res: express.Response): void => {
    const name: string = String(req.body.name);
    jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    Category.create(name)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
 * methode to update category in the database
 * @method PUT
 * @param [Name , Id]
 * @return Category
 */
categories.put(
  '/update',
  (req: express.Request, res: express.Response): void => {
    
    const cat: CategoryType = req.body;
    jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    Category.update(cat)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
 * methode to delete category from the database
 * @method delete
 * @param Id
 * @return message
 */
categories.delete(
  '/delete',
  (req: express.Request, res: express.Response): void => {
    const id: number = Number(req.body.id);
    jwt.verify(req.body.token , process.env.TOKEN_SECRET as string);
    Category.delete(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

export default categories;
