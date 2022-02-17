import { ProductModel, ProductType } from '../src/models/product';
import { OrderModel, OrderType ,ComingOrderType , UpdateOrderType} from '../src/models/order';
import { Category, CategoryType } from '../src/models/category';
import {UserModel , UserType} from '../src/models/user';
import { UserSeeder} from './seeders/UserSeeder';
import { ProductSeeder} from './seeders/ProductSeeder';

describe('order Model', () => {

  it('should have create method', () => {
    expect(OrderModel.create).toBeDefined;
  });

  it('create method should insert a order', async () => {
    const prodId = Number( await ProductSeeder.id())
    const usrId = Number( await UserSeeder.id())
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
    const prodId = Number( await ProductSeeder.id())
    const usrId = Number( await UserSeeder.id())
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
    const prodId = Number( await ProductSeeder.id())
    const usrId = Number( await UserSeeder.id())
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
    const prodId = Number( await ProductSeeder.id())
    const usrId = Number( await UserSeeder.id())
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
