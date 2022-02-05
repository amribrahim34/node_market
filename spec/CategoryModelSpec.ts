import { Category, CategoryType } from "../src/models/category";

const cat = new Category();
describe('Category Model', () => {

    it('should have index method', () => {
        expect(cat.index).toBeDefined;
    });

    it('create method should insert a category', async () => {
        const result = await cat.create('cat1');
        expect(result.name).toEqual('cat1');
    });

    it('index method should return a list of categories', async () => {
        const result = await cat.index();
        expect(result).toEqual([]);
    });


});

