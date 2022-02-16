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


  

describe("test API endpoints ", () => {

    it("test that users index return code 200", async () => {
      const res = await request(app).get("/api/users");
      expect(res.status).toBe(200);
    });
  
    it("test user create API return code 200", async () => {

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
            .post("/api/users/create")
            .send(
                {
                    "first_name":"user",
                    "last_name":"user",
                    "email":"mail@mail.com",
                    "password":"password",
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
        const user = await request(app)
            .put("/api/users/create")
            .send(
                {
                    "name":"user",
                    "token":  token
                }
            );
        const usrId = Number(user.body.id);
        const res = await request(app)
            .put("/api/users/update")
            .send(
                {
                    "id":usrId,
                    "first_name":"user",
                    "last_name":"user",
                    "email":"mail@mail.com",
                    "password":"password",
                    "token":  token
                }
            );
        expect(res.status).toBe(200);
    });

    it("test the delete user API return code 200", async () => {

        const tokenRespose = await request(app)
            .post("/api/users/login")
            .send(
                {
                    "email":user_array.email,
                    "password":  user_array.password
                }
            );
        const token = String(tokenRespose.text).replace(/['"]+/g, '')
        const user = await request(app)
            .put("/api/users/create")
            .send(
                {
                    "name":"user",
                    "token":  token
                }
            );
        const usrId = Number(user.body.id);
        const res = await request(app)
            .delete("/api/users/delete")
            .send(
                {
                    "id":usrId,
                    "token":  token
                }
            );
        expect(res.status).toBe(200);
    });
})