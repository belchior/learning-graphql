import graphqlHTTP from 'express-graphql';

import { schema } from './schema';


describe('schema', () => {
  it('should be parsable', () => {
    const resolver = {
      user: () => 'Hi Im user'
    };
    const fn = () => graphqlHTTP({
      schema: schema,
      rootValue: resolver,
    });

    expect(fn).not.toThrow();
  });
});
