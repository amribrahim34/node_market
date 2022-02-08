import { Connection } from 'pg';
import Client from '../database';

export type UserType = {
  id: Number;
  name: String;
  password: String;
  email: String;
};

export class User {
  async index(): Promise<UserType[]> {
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
}
