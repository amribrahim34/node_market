import { ProductModel, ProductType } from '../../src/models/product';
import {CategorySeeder}from './CategorySeeder'


export class ProductSeeder {
    static async  array (){
        try {

            const category_id :number= Number( await CategorySeeder.id());
            const name = 'Product';
            const details = 'ProductModel details';
            const price:number = 10;
            const productArray = {
                name : 'name',
                details,
                price,
                category_id,
            }
            const product = await ProductModel.create(productArray);
            return product[0]
        } catch (error) {
            throw new Error(error as string);
        }
    }

    static async  id () :Promise<number|void>{
        try {
            const category_id :number= Number( await CategorySeeder.id());
            const name = 'Product';
            const details = 'ProductModel details';
            const price:number = 10;
            const productArray = {
                name : 'name',
                details,
                price,
                category_id,
            }
            const product = await ProductModel.create(productArray);
            return Number(product[0].id)
        } catch (error) {
            throw new Error(error as string);
        }
    }
}