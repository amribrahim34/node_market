import { Category, CategoryType } from '../../src/models/category';


export class CategorySeeder {
    static async  array (){
        try {
            const category = await Category.create("category");
            console.log ("category created")
            return category
        } catch (error) {
            console.log("error");
            console.log(error);
            throw new Error(error as string);
        }
    }

    static async  id () :Promise<number|void>{
        try {
            const category = await Category.create("category");
            return Number(category[0].id)
        } catch (error) {
            // throw new Error(error as string);
            return 1
        }
    }
}