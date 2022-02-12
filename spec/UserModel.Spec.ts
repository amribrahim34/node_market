import { UserModel, UserType } from '../src/models/user';

// const person = new UserModel();
describe('User Model', () => {
  it('should have index method', () => {
    expect(UserModel.index).toBeDefined;
  });

  it('index method should return a list of users', async () => {
    const result = await UserModel.index();
    expect(result).toEqual([]);
  });
});
