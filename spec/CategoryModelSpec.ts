import { Category, CategoryType } from '../src/models/category';
import {UserModel , UserType} from '../src/models/user';

describe('Category Model', () => {

 

  it('should have create method', () => {
    expect(Category.create).toBeDefined;
  });

  it('create method should insert a category', async () => {
    const name = 'category_test';
    const result = await Category.create(name);
    expect(result[0].name).toEqual(name);
  });

  it('should have index method', () => {
    expect(Category.index).toBeDefined;
  });

  it('index method should return a list of categories', async () => {
    const result = await Category.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have update method', () => {
    expect(Category.update).toBeDefined;
  });

  it('update method should insert a category', async () => {
    const cat = await Category.create('cat');
    const name :string = 'category_tes';
    const new_cat : CategoryType = {
      id: cat[0].id,
      name,
    };
    const result = await Category.update(new_cat);
    expect(result[0].name).toEqual(name);
  });

  it('should have delete method', () => {
    expect(Category.delete).toBeDefined;
  });

  it('delete method should delete a category', async () => {
    const name :string = 'category_test';
    const msg :string = 'row was deleted successfully';
    const cat = await Category.create(name);
    const id :number = Number(cat[0].id);
    const result = await Category.delete(id);
    expect(result).toEqual(msg);
  });
});
