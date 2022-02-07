import { Connection } from 'pg';
import Client from '../database';

export type CartType = {
    id: Number;
    user_id: Number;
    product_id: Number;
}

export class Cart {
  async index(): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM carts';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get carts ${error}`);
    }
  }
}
