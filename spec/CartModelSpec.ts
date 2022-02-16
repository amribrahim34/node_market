import { ProductModel, ProductType } from '../src/models/product';
import { CartModel, CartType } from '../src/models/cart';
import { Category, CategoryType } from '../src/models/category';
import {UserModel , UserType} from '../src/models/user';

describe('Cart Model', () => {

 

  it('should have create method', () => {
    expect(CartModel.create).toBeDefined;
  });

  it('create method should insert a Cart', async () => {
    const userArray = {
      "first_name" : 'Amr',
      "last_name" : 'Ibrahim',
      "email":'mail@mail.com',
      "password":"password"
    }
    const category = await Category.create("name");
    const catId = Number( category[0].id)
    const productArray = {
        "name":"product 1",
        "details": "details",
        "price" : 125,
        "category_id":catId as number
    }
    
    const product = await ProductModel.create(productArray);
    const prodId = Number( product[0].id)
    const user = await UserModel.create(userArray);
    const usrId = Number( user[0].id)
    const cartArray :CartType[]= [{
        "user_id": usrId as number,
        "product_id": prodId as number,
        "quantity" : 125,
    }]
    const result = await CartModel.create(cartArray);
    expect(result[0].user_id).toEqual(usrId);
  });

  it('should have index method', () => {
    expect(CartModel.index).toBeDefined;
  });

  it('index method should return a list of categories', async () => {
    const result = await CartModel.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have update method', () => {
    expect(CartModel.update).toBeDefined;
  });

  it('update method should insert a Cart', async () => {
    const userArray = {
        "first_name" : 'Amr',
        "last_name" : 'Ibrahim',
        "email":'mail@mail.com',
        "password":"password"
      }
      const category = await Category.create("name");
      const catId = Number( category[0].id)
      const productArray = {
          "name":"product 1",
          "details": "details",
          "price" : 125,
          "category_id":catId as number
      }
      
      const product = await ProductModel.create(productArray);
      const prodId = Number( product[0].id)
      const user = await UserModel.create(userArray);
      const usrId = Number( user[0].id)
      const cartArray :CartType[]= [{
          "user_id": usrId as number,
          "product_id": prodId as number,
          "quantity" : 125,
      }]
    const result = await CartModel.update(cartArray);
    expect(result[0].user_id).toEqual(usrId);
  });

  it('should have delete method', () => {
    expect(CartModel.delete).toBeDefined;
  });

  it('delete method should delete a Cart', async () => {
    const name :string = 'Cart_test';
    const msg :string = 'row was deleted successfully';
    

    const userArray = {
        "first_name" : 'Amr',
        "last_name" : 'Ibrahim',
        "email":'mail@mail.com',
        "password":"password"
      }
      const category = await Category.create("name");
      const catId = Number( category[0].id)
      const productArray = {
          "name":"product 1",
          "details": "details",
          "price" : 125,
          "category_id":catId as number
      }
      
      const product = await ProductModel.create(productArray);
      const prodId = Number( product[0].id)
      const user = await UserModel.create(userArray);
      const usrId = Number( user[0].id)
      const cartArray :CartType[]= [{
          "user_id": usrId as number,
          "product_id": prodId as number,
          "quantity" : 125,
      }]
    const cart = await CartModel.create(cartArray);
    const id :number = Number(cart[0].id);
    const result = await CartModel.delete(id);
    expect(result).toEqual(msg);
  });
});
