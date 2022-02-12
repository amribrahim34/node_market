import { Connection } from 'pg';
import Client from '../database';

type CategoryType = {
  id?: number;
  name: string;
};

class Category {
  /**
   * async method to get all categories
   * @returns Category::all
   */
  static async index(): Promise<CategoryType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM categories';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      console.log(`the error is ${error}`);
      throw new Error(`cannot get categories ${error}`);
    }
  }

  /**
   * a method to create and return new entry to categories table
   * @param Name
   * @returns Category
   */
  static async create(n: string): Promise<CategoryType[]> {
    try {
      const con = await Client.connect();
      const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
      const result = await con.query(sql, [n]);
      con.release();
      console.log(result.rows[0].name);
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }

  /**
   * a method to create and return new entry to categories table
   * @param [Name , Id]
   * @returns Category
   */
  static async update(category: CategoryType): Promise<any> {
    try {
      const con = await Client.connect();
      const sql = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *';
      const result = await con.query(sql, [category.name, category.id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }

  /**
   * methode to delete category from the database
   * @param Id
   * @return message
   */
  static async delete(id: number): Promise<string> {
    try {
      const con = await Client.connect();
      const sql = 'DELETE FROM categories WHERE id=$1';
      await con.query(sql, [id]);
      con.release();
      return 'row was deleted successfully';
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }
}

export { Category, CategoryType };
