import app from "../src/server";
import supertest from 'supertest';
import {UserModel , UserType} from "../src/models/user"
const request = supertest;


const user_array :UserType= {
    first_name:"amr",
    last_name:"ibrahim",
    email:"mail@mail.com",
    password:"password",
  };
const user = UserModel.create(user_array);

  

describe("test API endpoints ", async () => {

    it("test that product index return code 200", async () => {
      const res = await request(app).get("/api/products");
      expect(res.status).toBe(200);
    });
  
    it("test the create API return code 200", async () => {

        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const category = await request(app)
            .post("/api/categories/create")
            .send(
                {
                    "name":'name',
                    token
                }
            );
        const catId = Number(category.body.id)
        const res = await request(app)
                .post("/api/products/create")
                .send(
                    {
                        "name":"category",
                        "details":'details lorem',
                        "price":25,
                        "category_id":catId,
                        "token":  token
                    }
                );
        expect(res.status).toBe(200);
    });

    it("test the update Product API return code 200", async () => {
        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const category = await request(app)
            .post("/api/categories/create")
            .send(
                {
                    "name":'name',
                    token
                }
            );
        const catId = Number(category.body.id)
        const res = await request(app)
            .put("/api/products/update")
            .send(
                {
                    "id":1,
                    "name":"category",
                    "details":'details lorem',
                    "price":25,
                    "category_id": catId,
                    token
                    
                }
            );
        expect(res.status).toBe(200);
    });

    it("test the delete API return code 200", async () => {

        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const category = await request(app)
            .post("/api/categories/create")
            .send(
                {
                    "name":'name',
                    token
                }
            );
        const catId = Number(category.body.id)
        const product = await request(app)
                .post("/api/products/create")
                .send(
                    {
                        "name":"category",
                        "details":'details lorem',
                        "price":25,
                        "category_id":catId,
                        "token":  token
                    }
                );
        const prodId = Number(product.body.id)
        const res = await request(app)
                .delete("/api/products/delete")
                .send(
                    {
                        "id":prodId,
                        "token":  token
                    }
                );
        expect(res.status).toBe(200);
    });
})