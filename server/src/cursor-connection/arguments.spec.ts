import { GraphQLError } from 'graphql';

import { TPaginationArgs } from '../utils/interfaces';
import { validateArgs } from './arguments';


describe('connection arguments', () => {
  it('should return a boolean true when all rules match', () => {
    let args: TPaginationArgs = { first: 10, after: 'MHwtMjA=' };
    expect(validateArgs(args)).toBe(args);

    args = { last: 10, before: 'MTl8LTE=' };
    expect(validateArgs(args)).toBe(args);
  });

  it('should provides an object as pagination argument', () => {
    const error = new GraphQLError('Missing pagination boundaries');
    // @ts-expect-error
    expect(() => validateArgs()).toThrow(error);

    const args: TPaginationArgs = { first: 1 };
    expect(() => validateArgs(args)).not.toThrow();
  });

  it('should provides at minimun one argument, first or last', () => {
    const error = new GraphQLError('Missing pagination boundaries');
    let args: TPaginationArgs;
    expect(() => validateArgs(args)).toThrow(error);

    args = { first: 10 };
    expect(() => validateArgs(args)).not.toThrow();

    args = { last: 5 };
    expect(() => validateArgs(args)).not.toThrow();
  });

  it('should provides first and last as positive integer', () => {
    const error = new GraphQLError('first and last must be a positive integer');
    let args: TPaginationArgs = { first: 0 };

    expect(() => validateArgs(args)).toThrow(error);

    args = { first: 1 };
    expect(validateArgs(args)).toBe(args);

    args = { last: 100 };
    expect(validateArgs(args)).toBe(args);
  });

  it('should provides first in pair with after', () => {
    const args: TPaginationArgs = { first: 10, after: 'MHwtMjA=' };
    expect(validateArgs(args)).toBe(args);
  });

  it('should provides last in pair with before', () => {
    const args: TPaginationArgs = { last: 10, before: 'MTl8LTE=' };
    expect(validateArgs(args)).toBe(args);
  });

  it('when provided before and after should be a non empty string', () => {
    const error = new GraphQLError('before and after must be non empty string');
    let args: TPaginationArgs = { first: 10, after: '' };
    expect(() => validateArgs(args)).toThrow(error);

    args = { first: 10, after: 'CDE' };
    expect(validateArgs(args)).toBe(args);
  });

  it('should not provides first and last at same time', () => {
    const error = new GraphQLError('first and last must not be specified at the same time');
    const args: TPaginationArgs = { first: 10, last: 10 };
    expect(() => validateArgs(args)).toThrow(error);
  });

  it('should not provides after and before at same time', () => {
    const error = new GraphQLError('before and after must not be specified at the same time');
    const args: TPaginationArgs = { first: 10, after: 'MHwtMjA=', before: 'MTl8LTE=' };
    expect(() => validateArgs(args)).toThrow(error);
  });

  it('should not provides first in pair with before', () => {
    const error = new GraphQLError('first must be used with after but receive before instead');
    const args: TPaginationArgs = { first: 10, before: 'MTl8LTE=' };
    expect(() => validateArgs(args)).toThrow(error);
  });

  it('should not provides last in pair with after', () => {
    const error = new GraphQLError('last must be used with before but receive after instead');
    const args: TPaginationArgs = { last: 10, after: 'MHwtMjA=' };
    expect(() => validateArgs(args)).toThrow(error);
  });
});
