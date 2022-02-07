import { User, UserType } from '../src/models/user';

const person = new User();
describe('User Model', () => {
  it('should have index method', () => {
    expect(person.index).toBeDefined;
  });

  it('index method should return a list of users', async () => {
    const result = await person.index();
    expect(result).toEqual([]);
  });
});
