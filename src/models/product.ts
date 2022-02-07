import { Connection } from 'pg';
import Client from '../database';

export type ProductType = {
    id: Number;
    name: String;
    details: String;
    price: Number;
    category_id: Number;
}

export class Product {
  async index(): Promise<ProductType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }
}
