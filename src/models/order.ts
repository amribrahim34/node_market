import { Connection } from 'pg';
import Client from '../database';

export type OrderType = {
  id?: number;
  user_id: number;
  quantity: number;
  products: number;
};

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
   static async create(order: OrderType): Promise<OrderType[]> {
    try {
      const con = await Client.connect();
      const sql = 'INSERT INTO orders (user_id,quantity,products) VALUES($1,$2,$3) RETURNING *';
      const result = await con.query(sql, [order.user_id,order.quantity,order.products]);
      con.release();
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
  static async update(order: OrderType): Promise<OrderType[]> {
    try {
      const con = await Client.connect();
      const sql = 'UPDATE orders SET quantity=$1 , products=2 WHERE id=$2 RETURNING *';
      const result = await con.query(sql, [order.quantity, order.products]);
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
      const sql = 'DELETE FROM orders WHERE id=$1';
      await con.query(sql, [id]);
      con.release();
      return 'row was deleted successfully';
    } catch (error) {
      throw new Error(`cannot delete order ${error}`);
    }
  }
}
