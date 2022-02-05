import { Connection } from 'pg';
import Client from '../database';

type CategoryType = {
    id: Number;
    name: String;
}

class Category {

    async create(n: String): Promise<any> {
        try {
            const con = await Client.connect();
            const sql = `INSERT INTO categories ('name') VALUES(${n})`;
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get categories ${error}`);
        }
    }


    async index(): Promise<CategoryType[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM categories';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get categories ${error}`);
        }
    }
}

export { Category, CategoryType };