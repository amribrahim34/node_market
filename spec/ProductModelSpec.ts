import { ProductModel, ProductType } from '../src/models/product';
import { Category, CategoryType } from '../src/models/category';

describe('ProductModel Model', () => {
  it('should have create method', () => {
    expect(ProductModel.create).toBeDefined;
  });

  it('create method should insert a ProductModel', async () => {
    const category_name = 'ProductModel_test';
    const category = await Category.create(category_name);
    const name = 'ProductModel_test';
    const details = 'ProductModel details';
    const category_id :number= Number(category[0].id);
    const price:number = 10;
    const product = {
        name,
        details,
        price,
        category_id
    }
    const result = await ProductModel.create(product);
    expect(result[0].name).toEqual(name);
  });

  it('should have index method', () => {
    expect(ProductModel.index).toBeDefined;
  });

  it('index method should return a list of products', async () => {
    const result = await ProductModel.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have update method', () => {
    expect(ProductModel.update).toBeDefined;
  });

  it('update method should insert a ProductModel', async () => {
    const category_name = 'ProductModel_test';
    const category = await Category.create(category_name);
    const category_id :number= Number(category[0].id);
    const name = 'ProductModel_test';
    const details = 'ProductModel details';
    const price:number = 10;
    const product = {
        name : 'name',
        details,
        price,
        category_id,
    }
    
    const old_product = await ProductModel.create(product);
    const id:number = Number(old_product[0].id);
    const new_product = {
        id ,
        name ,
        details,
        price,
        category_id,
    }
    const result = await ProductModel.update(new_product);
    expect(result[0].name).toEqual(name);
  });

  it('should have delete method', () => {
    expect(ProductModel.delete).toBeDefined;
  });

  it('delete method should delete a ProductModel', async () => {
    const msg :string = 'row was deleted successfully';
    const category_name = 'ProductModel_test';
    const category = await Category.create(category_name);
    const category_id :number= Number(category[0].id);
    const name = 'ProductModel_test';
    const details = 'ProductModel details';
    const price:number = 10;
    const product = {
        name,
        details,
        price,
        category_id,
    }
    const created_product = await ProductModel.create(product);
    const id :number = Number(created_product[0].id);
    const result = await ProductModel.delete(id);
    expect(result).toEqual(msg);
  });
});
