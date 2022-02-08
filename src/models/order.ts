import { Connection } from 'pg';
import Client from '../database';

export type OrderType = {
  id: Number;
  user_id: Number;
  quantoty: Number;
  products: Number;
};

export class Order {
  async index(): Promise<OrderType[]> {
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
}
