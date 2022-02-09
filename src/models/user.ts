import { Connection } from 'pg';
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


type UserType = {
  id?: Number;
  name: String;
  password: String;
  email: String;
};

dotenv.config();

const {
  SALT_ROUNDS,
  ENV,
} = process.env;

class UserModel {

  /**
   * async method to get all users
   * @returns User::all
   */
  static async  index(): Promise<UserType[]> {
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
  static async create(user :UserType):Promise<UserType[]>{
    try {
      const con = await Client.connect();
      const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
      const hash = bcrypt.hashSync(String(user.password), salt);
      const sql = `INSERT INTO users (name , password , email) VALUES ($1 , $2 ,$3)`;
      const result = await con.query(sql,  [user.name, hash  , user.email]);
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
      const sql = 'UPDATE users SET name=$1 , email=$2 , password=$3 WHERE id=$4 RETURNING *';
      const result = await con.query(sql, [user.name,user.email,user.password, user.id]);
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
}
export { UserModel, UserType };