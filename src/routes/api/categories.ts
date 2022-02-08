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
  let name: string = String(req.query.name);
  Category.create(name).then((result)=>{
    res.json(result);
  }).catch((error) => {
    res.send(error);
  });
});

/**
 * methode to update category in the database 
 * @method PUT
 * @param [Name , Id]
 * @return Category
 */
 categories.put('/update', (req: express.Request, res: express.Response): void => {
    const id: number = Number(req.query.id);
    const name: string = String(req.query.name);
    const cat: CategoryType = {
        id:id,
        name:name
    }
    Category.update(cat).then((result)=>{
        res.json(result);
    }).catch((error) => {
    res.send(error);
  });
});

  /**
 * methode to delete category from the database 
 * @method delete
 * @param Id
 * @return message
 */
 categories.delete('/delete', (req: express.Request, res: express.Response): void => {
  const id: number = Number(req.query.id);
  Category.delete(id).then((result)=>{
    res.json(result);
  }).catch((error) => {
    res.send(error);
  });
})

export default categories;
