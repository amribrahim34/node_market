import { UserModel, UserType } from '../src/models/user';

// const person = new UserModel();
describe('User Model', () => {
  it('should have index method', () => {
    expect(UserModel.index).toBeDefined;
  });

  it('index method should return a list of users', async () => {
    const result = await UserModel.index();
    expect(result.length).toBeGreaterThan(0);
  });


  it('should have create method', () => {
    expect(UserModel.create).toBeDefined;
  });

  it('create method should insert a UserModel', async () => {
    const first_name = 'Amr';
    const last_name = 'Ibrahim';
    const email = 'mail@mail.com';
    const password = "password";
    const user = {
      first_name,
      last_name,
      email,
      password
    }
    const result = await UserModel.create(user);
    expect(result[0].first_name).toEqual(first_name);
  });

  it('should have update method', () => {
    expect(UserModel.update).toBeDefined;
  });

  it('update method should insert a UserModel', async () => {
    const first_name = 'Amr';
    const last_name = 'Ibrahim';
    const email = 'mail@mail.com';
    const password = "password";
    const user = {
      first_name,
      last_name,
      email,
      password
    }
    const old_user = await UserModel.create(user);
    const id:number = Number(old_user[0].id);
    const new_user = {
        id ,
        first_name,
        last_name,
        email,
        password
    }
    const result = await UserModel.update(new_user);
    expect(result[0].first_name).toEqual(first_name);
  });

  it('should have delete method', () => {
    expect(UserModel.delete).toBeDefined;
  });

  it('delete method should delete a UserModel', async () => {
    const msg :string = 'row was deleted successfully';
    const first_name = 'Amr';
    const last_name = 'Ibrahim';
    const email = 'mail@mail.com';
    const password = "password";
    const user = {
      first_name,
      last_name,
      email,
      password
    }
    const created_user = await UserModel.create(user);
    const id :number = Number(created_user[0].id);
    const result = await UserModel.delete(id);
    expect(result).toEqual(msg);
  });
});
