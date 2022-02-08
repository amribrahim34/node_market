import { Connection } from 'pg';
import Client from '../database';

type CategoryType = {
    id?: Number;
    name: String;
}

class Category {
  static async create(n: string): Promise<any> {
    try {
      const con = await Client.connect();
      const sql = `INSERT INTO categories (name) VALUES($1) RETURNING *`;
      const result = await con.query(sql,[n]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }

  static async index(): Promise<CategoryType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM categories';
      const result = await con.query(sql);
      console.log(result);
      con.release();
      return result.rows;
    } catch (error) {
      console.log(`the error is ${error}`)
      throw new Error(`cannot get categories ${error}`);
    }
  }
}

export { Category, CategoryType };
