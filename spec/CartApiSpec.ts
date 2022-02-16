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

  

describe("test cart API endpoints ", async () => {

    it("test that cart index return code 200", async () => {
      const res = await request(app).get("/api/carts");
      expect(res.status).toBe(200);
    });
  
    it("test the cart create API return code 200", async () => {
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
                        token
                    }
                );
        const user = await UserModel.create(user_array);
        const usrId = Number( user[0].id)
        const prodId = Number( product.body.id)
        const cartArray = {
            "user_id": usrId as number,
            "product_id": prodId as number,
            "quantity" : 125,
            token,
        }
        const res = await request(app)
            .post("/api/carts/create")
            .send(cartArray);
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
        const product = await request(app)
                .post("/api/products/create")
                .send(
                    {
                        "name":"category",
                        "details":'details lorem',
                        "price":25,
                        "category_id":catId,
                        token
                    }
                );
        const user = await UserModel.create(user_array);
        const usrId = Number( user[0].id)
        const prodId = Number( product.body.id)
        const cartArray = {
            "user_id": usrId as number,
            "product_id": prodId as number,
            "quantity" : 125,
            token,
        }
        const res = await request(app)
            .put("/api/carts/update")
            .send(cartArray);
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
                const user = await UserModel.create(user_array);
                const usrId = Number( user[0].id)
                const prodId = Number( product.body.id)
                const cartArray = {
                    "user_id": usrId as number,
                    "product_id": prodId as number,
                    "quantity" : 125,
                    token,
                }
                const cart = await request(app)
                    .put("/api/carts/update")
                    .send(cartArray);
                const crtId = Number( cart.body.id)
                const res = await request(app)
                    .delete("/api/carts/delete")
                    .send(
                        {
                            "id":crtId,
                            "token":  token
                        }
                    );
        expect(res.status).toBe(200);
    });
})