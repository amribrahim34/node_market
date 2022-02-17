import { ProductModel, ProductType } from '../src/models/product';
import { Category, CategoryType } from '../src/models/category';
import {CategorySeeder}from './seeders/CategorySeeder'
import {ProductSeeder}from './seeders/ProductSeeder'

describe('ProductModel Model', () => {
  it('should have create method', () => {
    expect(ProductModel.create).toBeDefined;
  });

  it('create method should insert a ProductModel', async () => {
    const name = 'ProductModel_test';
    const details = 'ProductModel details';
    const category_id :number= Number( await CategorySeeder.id());
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

    const category_id :number= Number( await CategorySeeder.id());
    const name = 'ProductModel_test';
    const details = 'ProductModel details';
    const price:number = 10;
    const id:number = Number(await ProductSeeder.id());
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
    const id:number = Number(await ProductSeeder.id());
    const result = await ProductModel.delete(id);
    expect(result).toEqual(msg);
  });
});
