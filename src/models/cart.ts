import { Connection } from 'pg';
import Client from '../database';

export type CartType = {
  id?: Number;
  user_id: Number;
  product_id: Number;
};

export class CartModel {

  /**
   * get all carts from the database 
   * @return cart[]
   */
  static async index(): Promise<CartType[]> {
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

  /**
   * create new cart  
   * @return cart
   * @param [user_id,product_id]
   */
   static async create(cart:CartType): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'INSERT INTO carts (user_id,product_id) VALUES ($1,$2) RETURNING *';
      const result = await con.query(sql,[cart.user_id,cart.product_id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot store carts ${error}`);
    }
  }

  /**
   * return  cart  
   * @return cart
   * @param id
   */
   static async show(id:number): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM carts WHERE id=$1';
      const result = await con.query(sql,[id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get cart ${error}`);
    }
  }

  /**
   * edit existing cart  
   * @return cart
   * @param id
   */
   static async update(cart:CartType): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'UPDATE carts SET user_id=$1 , product_id=$2 WHERE id=$3 RETURNING *';
      const result = await con.query(sql,[cart.user_id,cart.product_id,cart.id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot update cart ${error}`);
    }
  }


  /**
   * delete existing cart from database 
   * @return delete message
   * @param id
   */
   static async delete(id:number): Promise<string> {
    try {
      const con = await Client.connect();
      const sql = 'DELETE FROM carts WHERE id=$1';
      const result = await con.query(sql,[id]);
      con.release();
      return 'cart was deleted successfully';
    } catch (error) {
      throw new Error(`cannot delete cart ${error}`);
    }
  }
  
}
