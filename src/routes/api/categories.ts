import express from 'express';
import { Category, CategoryType } from '../../models/category';

const categories = express.Router();
const cat = new Category;

categories.get('/', (req: express.Request, res: express.Response): void => {
  const result = async ()=>{
    await Category.index;
  }
  console.log(result);
  res.send(result);
//   res.end();
});

export default categories;
