import express from 'express';
import { Category, CategoryType } from '../../models/category';

const categories = express.Router();

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
