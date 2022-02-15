import express from 'express';
import { UserModel, UserType } from '../../models/user';
import bodyParser from 'body-parser';


const users = express.Router();
users.use(bodyParser.urlencoded({ extended: false }));
users.use(bodyParser.json());

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
    const user_data = req.body;
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
    const user_data = req.body;
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
    const id: number = Number(req.body.id);
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
