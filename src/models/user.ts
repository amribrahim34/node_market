import { Connection } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Client from '../database';
import { CartType } from './cart';

type UserType = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

dotenv.config();

const {
  SALT_ROUNDS,
  ENV,
  BCRYPT_PASSWORD,
} = process.env;

class UserModel {
  /**
   * async method to get all users
   * @returns User::all
   */
  static async index(): Promise<UserType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }

  /**
   * async method to create new user
   * @param User
   * @returns User
   */
  static async create(user :UserType):Promise<UserType[]> {
    try {
      const con = await Client.connect();
      const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
      const hashed = bcrypt.hashSync(String(user.password) + BCRYPT_PASSWORD, salt);
      const sql = `
      INSERT INTO 
        users (first_name , last_name  , email , password) 
      VALUES ($1 , $2 ,$3 , $4) RETURNING *`;
      const result = await con.query(sql, [
        user.first_name, 
        user.last_name, 
        user.email,
        hashed
      ]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot create user ${error}`);
    }
  }

  /**
   * a method to create and return new entry to categories table
   * @param [Name , Id]
   * @returns User
   */
  static async update(user: UserType): Promise<UserType[]> {
    try {
      const con = await Client.connect();
      const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
      const hash = bcrypt.hashSync(String(user.password) + BCRYPT_PASSWORD, salt);
      const sql = `
      UPDATE users 
      SET 
        first_name=$1 , 
        last_name=$2 , 
        email=$3 , 
        password=$4 
      WHERE id=$5 RETURNING *`;
      const result = await con.query(sql, [
        user.first_name, 
        user.last_name, 
        user.email, 
        hash, 
        user.id
      ]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }

  /**
   * methode to delete User from the database
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

  
  /**
   * async method to create new user
   * @param User
   * @returns User
   */
   static async authenticate(user :UserType):Promise<UserType[]|string> {
    try {
      const con = await Client.connect();
      const get_user_query = `SELECT * FROM users WHERE email=$1`
      const user_array = await con.query(get_user_query,[user.email]);
      con.release();
      if (bcrypt.compareSync(user.password+BCRYPT_PASSWORD,user_array.rows[0].password)) {
        return user_array.rows[0]
      }else{
        return "please provide valid credentials"
      }
    } catch (error) {
      throw new Error(`cannot create user ${error}`);
    }
  }

  /**
   * method to get cart of the user from the database
   * @param Id
   * @return message
   */
  async cart(id: number): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM carts WHERE user_id=$1';
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get cart ${error}`);
    }
  }

  /**
   * method to get products of the user from the database
   * @param user_id
   * @return Products
   */
  async cartProducts(user_id: number): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT quantity FORM carts INNER JOIN products ON carts.product_id=products.id WHERE carts.user_id=$1';
      const result = await con.query(sql, [user_id]);
      console.log(result);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get cart ${error}`);
    }
  }

  /**
   * method to get ordered products of the user from the database
   * @param Id
   * @return Products
   */
  async orders(id: number): Promise<CartType[]> {
    try {
      const con = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1';
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get cart ${error}`);
    }
  }
}
export { UserModel, UserType };
