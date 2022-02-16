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

  

describe("test API endpoints ", () => {

    it("test that index return code 200", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
    });
  
    it("test category create API return code 200", async () => {

        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const res = await request(app)
            .post("/api/categories/create")
            .send(
                {
                    "name":"category",
                    "token":  token
                }
            );
        expect(res.status).toBe(200);
    });

    it("test the update API return code 200", async () => {

        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const res = await request(app)
            .put("/api/categories/update")
            .send(
                {
                    "id":1,
                    "name":"category",
                    "token":  token
                }
            );
        expect(res.status).toBe(200);
    });

    it("test the delete category API return code 200", async () => {

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
            .put("/api/categories/create")
            .send(
                {
                    "name":"category",
                    "token":  token
                }
            );
        const catId = Number(category.body.id);
        const res = await request(app)
            .delete("/api/categories/delete")
            .send(
                {
                    "id":catId,
                    "token":  token
                }
            );
        expect(res.status).toBe(200);
    });
})