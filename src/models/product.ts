import { Connection } from 'pg';
import Client from '../database';

type ProductType = {
  id: Number;
  name: String;
  details: String;
  price: Number;
  category_id: Number;
};

class ProductModel {
  /**
   * async function to get all products 
   * @returns Product[]
   */
  static async index(): Promise<ProductType[]> {
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

   /**
   * async static method to create and return new entry to Products table
   * @param Products[]
   * @returns Product
   */
    static async create(product: ProductType): Promise<ProductType[]> {
      try {
        const con = await Client.connect();
        const Product_sql = `
        INSERT INTO Products 
          (name,details,price,category_id) 
        VALUES
          ($1,$2,$3,$4) 
        RETURNING *`;
        const result = await con.query(Product_sql, [
          product.name,
          product.details,
          product.price,
          product.category_id
        ]);
        con.release();
        return result.rows;
      } catch (error) {
        throw new Error(`cannot get Product ${error}`);
      }
    }
  
    /**
     * a method to create and return new entry to Products table
     * @param [Name , Id]
     * @returns Product
     */
    static async update(product: ProductType): Promise<ProductType[]> {
      try {
        const con = await Client.connect();
        const sql = `
        UPDATE products 
        SET 
          name=$1 , 
          details=$2 , 
          price = $3 ,
          category_id = $4 
        WHERE 
          id=$5 
        RETURNING *`;
        const result = await con.query(sql, [
          product.name, 
          product.details, 
          product.price, 
          product.category_id, 
          product.id
        ]);
        con.release();
        return result.rows;
      } catch (error) {
        throw new Error(`cannot update Product ${error}`);
      }
    }
  
    /**
     * methode to delete Product from the database
     * @param Id
     * @return message
     */
    static async delete(id: number): Promise<any> {
      try {
        const con = await Client.connect();
        const sql = 'DELETE FROM Products WHERE id=$1';
        await con.query(sql, [id]);
        con.release();
        return 'row was deleted successfully';
      } catch (error) {
        throw new Error(`cannot delete Product ${error}`);
      }
    }
}


export {ProductModel , ProductType};