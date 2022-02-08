import express from 'express';
import { Category, CategoryType } from '../../models/category';

const categories = express.Router();

/**
 * methode to get all categories from the database 
 * @method get
 * @return Categories
 */
categories.get('/', (req: express.Request, res: express.Response): void => {
    Category.index().then((result)=>{
      res.json(result);
    }).catch((error) => {
      res.send(error);
    });
});

/**
 * methode to insert new category to the database 
 * @method POST
 * @param Name
 * @return Category
 */
categories.post('/create', (req: express.Request, res: express.Response): void => {
  Category.create('cat1').then((result)=>{
    res.json(result);
  }).catch((error) => {
    res.send(error);
  });
});



export default categories;
