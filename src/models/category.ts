import { Connection } from 'pg';
import Client from '../database';

export type CategoryType = {
    id: Number;
    name: String;
}

export class Category {
    async index(): Promise<CategoryType[]> {
        try {
            const con = await Client.connect();
            const sql = 'SELECT * FROM categpries';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get categpries ${error}`);
        }
    }
}