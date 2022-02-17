import { ProductModel, ProductType } from '../src/models/product';
import { OrderModel, OrderType ,ComingOrderType , UpdateOrderType} from '../src/models/order';
import { Category, CategoryType } from '../src/models/category';
import {UserModel , UserType} from '../src/models/user';

describe('order Model', () => {

  it('should have create method', () => {
    expect(OrderModel.create).toBeDefined;
  });

  it('create method should insert a order', async () => {
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
    const orderArray :ComingOrderType= {
        "user_id": usrId as number,
        "products": [{
            "product_id": prodId as number,
            "quantity":  5
        }],
    }
    const result = await OrderModel.create(orderArray);
    expect(result[0].user_id).toEqual(usrId);
  });

  it('should have index method', () => {
    expect(OrderModel.index).toBeDefined;
  });

  it('index method should return a list of categories', async () => {
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
    const orderArray :ComingOrderType= {
        "user_id": usrId as number,
        "products": [{
            "product_id": prodId as number,
            "quantity":  5
        }],
    }
    const order = await OrderModel.create(orderArray);
    const result = await OrderModel.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have update method', () => {
    expect(OrderModel.update).toBeDefined;
  });

  it('update method should insert a order', async () => {
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
      const orderArray : ComingOrderType= {
        "user_id": usrId as number,
        "products": [{
            "product_id": prodId as number,
            "quantity":  5
        }],
    }
    const order = await OrderModel.create(orderArray);
      const ordrId = Number( order[0].id)
      const newOrderArray :UpdateOrderType= {
        "id": ordrId as number,
        "user_id": usrId as number,
        "products": [{
            "product_id": prodId as number,
            "quantity":  5
        }],
    }
    const result = await OrderModel.update(newOrderArray);
    expect(result[0].user_id).toEqual(usrId);
  });

  it('should have delete method', () => {
    expect(OrderModel.delete).toBeDefined;
  });

  it('delete method should delete a order', async () => {
    const name :string = 'order_test';
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
      const orderArray :ComingOrderType= {
        "user_id": usrId as number,
        "products": [{
            "product_id": prodId as number,
            "quantity":  5
        }],
    }
    const order = await OrderModel.create(orderArray);
    const id :number = Number(order[0].id);
    const result = await OrderModel.delete(id);
    expect(result).toEqual(msg);
  });
});
