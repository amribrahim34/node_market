import { UserModel, UserType } from '../../src/models/user';
// import {CategorySeeder}from './CategorySeeder'


export class UserSeeder {
    static async  array (){
        try {

            const userArray = {
                "first_name" : 'Amr',
                "last_name" : 'Ibrahim',
                "email":'mail@mail.com',
                "password":"password"
              }
            const user = await UserModel.create(userArray);
            return user[0]
        } catch (error) {
            throw new Error(error as string);
        }
    }

    static async  id () :Promise<number|void>{
        try {
            const userArray = {
                "first_name" : 'Amr',
                "last_name" : 'Ibrahim',
                "email":'mail@mail.com',
                "password":"password"
              }
            const user = await UserModel.create(userArray);
            return Number(user[0].id)
        } catch (error) {
            throw new Error(error as string);
        }
    }
}