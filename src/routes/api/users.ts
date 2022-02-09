import express from 'express';
import {UserModel , UserType} from '../../models/user'

const users = express.Router();

/**
 * methode to get all users from the database
 * @method get
 * @return users
 */
users.get('/', (req: express.Request, res: express.Response): void => {
  UserModel.index()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * methode to insert new User to the database
 * @method POST
 * @param Name
 * @return User
 */
users.post(
  '/create',
  (req: express.Request, res: express.Response): void => {
    const name: string = String(req.query.name);
    const email: string = String(req.query.email);
    const password: string = String(req.query.password);
    const user_data : UserType = {
        name: name,
        email: email,
        password: password,
    }
    UserModel.create(user_data)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
 * methode to update User in the database
 * @method PUT
 * @param [Name , Id]
 * @return User
 */
users.put(
  '/update',
  (req: express.Request, res: express.Response): void => {
    const id: number = Number(req.query.id);
    const name: string = String(req.query.name);
    const email: string = String(req.query.email);
    const password: string = String(req.query.password);
    const user_data : UserType = {
        id: id,
        name: name,
        email: email,
        password: password,
    }
    UserModel.update(user_data)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

/**
 * methode to delete User from the database
 * @method delete
 * @param Id
 * @return message
 */
users.delete(
  '/delete',
  (req: express.Request, res: express.Response): void => {
    const id: number = Number(req.query.id);
    UserModel.delete(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.send(error);
      });
  },
);

export default users;