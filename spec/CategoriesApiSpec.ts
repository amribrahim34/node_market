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
  
    // it("test the create API return code 200", async () => {
    //     request(app)
    //         .post("/api/users/login")
    //         .send(
    //             {
    //                 "email":user_array.email,
    //                 "password":  user_array.password
    //             }
    //         )
    //         .then(async (token)=>{
    //             const res = await request(app)
    //                 .post("/api/categories/create")
    //                 .send(
    //                     {
    //                         "name":"category",
    //                         "token":  token.text
    //                     }
    //                 );
    //             expect(res.status).toBe(200);
    //         });
    // });

    // it("test the update API return code 200", async () => {
    //     request(app)
    //         .post("/api/users/login")
    //         .send(
    //             {
    //                 "email":user_array.email,
    //                 "password":  user_array.password
    //             }
    //         )
    //         .then(async (token)=>{
    //             const res = await request(app)
    //                 .post("/api/categories/update")
    //                 .send(
    //                     {
    //                         "id":1,
    //                         "name":"category",
    //                         "token":  token.text
    //                     }
    //                 );
    //             expect(res.status).toBe(200);
    //         });
    // });
})