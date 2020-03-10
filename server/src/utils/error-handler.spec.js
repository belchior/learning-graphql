import { GraphQLError } from 'graphql';

import { handleError } from './error-handler';


describe('handleError', () => {
  it('should return rejected promise with a graphql error instance', async () => {
    const error = { message: 'test error' };
    const promise = handleError(error);
    await expect(promise).rejects.toThrow(GraphQLError);
  });
  it('should return a custom message when mongodb return "duplicate key erro"', async () => {
    const error = {
      code: '11000',
      keyPattern: {
        login: 'error message',
        name: 'error message',
      },
      message: 'mongodb message',
      name: 'MongoError',
    };
    const promise = handleError(error);
    await expect(promise).rejects.toThrow(/The following keys should be unique: login, name/);
  });
});
