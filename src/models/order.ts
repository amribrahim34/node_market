import { Connection } from 'pg';
import Client from '../database';

export type OrderType = {
  id?: number;
  user_id: number;
  status: boolean;
  products ?: {product_id : number; quantity:number;} [];
};

export type UpdateOrderType = {
  id: number;
  user_id: number;
  status?: boolean;
  products : {product_id : number; quantity:number;} [];
};

type RequestProductType = {
  product_id: number;
  quantity: number;
  order_id? :number
}

export type ComingOrderType = {
  products: {product_id : number; quantity:number;} [];
  user_id: number;
}

export class OrderModel {
  /**
   * async static method to get all orders
   * @returns Order::all
   */
  static async index(): Promise<OrderType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get orders ${error}`);
    }
  }

  /**
   * async static method to create and return new entry to orders table
   * @param Name
   * @returns Order
   */
  static async create(order: ComingOrderType): Promise<OrderType[]> {
    try {
      const con = await Client.connect();
      const order_sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
      const created_order = await con.query(order_sql, [order.user_id]);
      order.products.forEach(async (product :RequestProductType) => {
        const insert_sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES ($1,$2,$3)';
        await con.query(insert_sql, [created_order.rows[0].id, product.product_id, product.quantity]);
      });
      con.release();
      const sql = `SELECT
        orders.* , 
        order_product.quantity ,
        products.name ,
        products.price ,
        products.details 
      FROM orders 
      JOIN order_product ON orders.id=order_product.order_id 
      JOIN products ON order_product.product_id=products.id 
      WHERE orders.id=$1`;
      const result = await con.query(sql, [created_order.rows[0].id]);
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get order ${error}`);
    }
  }

  /**
   * a method to create and return new entry to orders table
   * @param [Name , Id]
   * @returns Order
   */
  static async update(order: UpdateOrderType): Promise<OrderType[]> {
    try {
      const con = await Client.connect();
      const delete_sql = 'DELETE FROM order_product WHERE order_id=$1';
      await con.query(delete_sql, [order.id]);
      order.products.forEach(async (product :RequestProductType) => {
        const insert_sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES ($1,$2,$3)';
        await con.query(insert_sql, [order.id, product.product_id, product.quantity]);
      });

      const sql = `SELECT
        orders.user_id , 
        orders.status , 
        order_product.quantity ,
        products.name ,
        products.price ,
        products.details 
      FROM orders 
      JOIN order_product ON orders.id=order_product.order_id 
      JOIN products ON order_product.product_id=products.id 
      WHERE orders.id=$1`;
      const result = await con.query(sql, [order.id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot update order ${error}`);
    }
  }

  /**
   * methode to delete Order from the database
   * @param Id
   * @return message
   */
  static async delete(id: number): Promise<any> {
    try {
      const con = await Client.connect();
      const orderProductDelSql = 'DELETE FROM order_product WHERE order_id=$1';
      await con.query(orderProductDelSql, [id]);
      const orderDelSql = 'DELETE FROM orders WHERE id=$1';
      await con.query(orderDelSql, [id]);
      con.release();
      return 'row was deleted successfully';
    } catch (error) {
      throw new Error(`cannot delete order ${error}`);
    }
  }
}
