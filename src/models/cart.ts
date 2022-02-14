import { Connection } from 'pg';
import Client from '../database';

type CartType = {
  id?: Number;
  user_id: Number;
  product_id: Number;
  quantity: Number;
};

type CartProductType = {
  user_id: Number;
  product_id: Number;
  name: string;
  details: string;
  quantity: Number;
  price: Number;
};

class CartModel {

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
   * @return carts[]
   * @param carts[]
   */
   static async create(carts:CartType[]): Promise<CartProductType[]> {
    try {
      const con = await Client.connect();
      carts.forEach(async(cart) => {
        const insert_sql = `INSERT INTO carts (user_id,product_id,quantity) VALUES ($1,$2,$3)`;
        await con.query(insert_sql,[cart.user_id , cart.product_id , cart.quantity]);
      });
      const sql = `
      SELECT
        carts.* , 
        products.name ,
        products.price ,
        products.details 
      FROM carts 
      JOIN products 
      ON carts.product_id=products.id 
      WHERE carts.user_id=$1`; 
      const result =  await con.query(sql,[carts[0].user_id]);
      con.release();
      console.log(result.rows);
      console.log(result);
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
   * @description delete user carts and create new ones
   * @return carts[]
   * @param carts[]
   */
   static async update(carts:CartType[]): Promise<CartProductType[]> {
    try {
      const con = await Client.connect();
      const delete_sql = "DELETE FROM carts WHERE WHERE user_id=$1"
      await con.query(delete_sql,[carts[0].user_id]);
      carts.forEach(async(cart) => {
        const insert_sql = 'INSERT INTO carts (user_id,product_id,quantity) VALUES ($1,$2,$3)';
        await con.query(insert_sql,[cart.user_id , cart.product_id , cart.quantity]);
      });
      const sql = 
      `SELECT
        carts.* , 
        products.name ,
        products.price ,
        products.details ,
      FORM carts 
      INNER JOIN products 
      ON carts.product_id=products.id 
      WHERE carts.user_id=$1`;
      const result =  await con.query(sql,[carts[0].user_id]);
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

export {CartModel , CartProductType,CartType}
