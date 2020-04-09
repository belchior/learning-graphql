import { GraphQLError } from 'graphql';

import { IPaginationArgs } from '../graphql/interfaces';
import { validateArgs } from './arguments';


describe('connection arguments', () => {
  it('should return a boolean true when all rules match', () => {
    let args: IPaginationArgs = { first: 10, after: 'MHwtMjA=' };
    const callback = () => args;
    expect(validateArgs(callback)(args)).toBe(args);

    args = { last: 10, before: 'MTl8LTE=' };
    expect(validateArgs(callback)(args)).toBe(args);
  });

  it('should provides an object as pagination argument', () => {
    const error = new GraphQLError('Missing pagination boundaries');
    let args: IPaginationArgs;
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);

    args = { first: 1 };
    expect(() => validateArgs(callback)(args)).not.toThrow();
  });

  it('should provides at minimun one argument, first or last', () => {
    const error = new GraphQLError('Missing pagination boundaries');
    let args: IPaginationArgs;
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);

    args = { first: 10 };
    expect(() => validateArgs(callback)(args)).not.toThrow();

    args = { last: 5 };
    expect(() => validateArgs(callback)(args)).not.toThrow();
  });

  it('should provides first and last as positive integer', () => {
    const error = new GraphQLError('first and last must be a positive integer');
    let args: IPaginationArgs = { first: 0 };
    const callback = () => args;

    expect(() => validateArgs(callback)(args)).toThrow(error);

    args = { first: 1 };
    expect(validateArgs(callback)(args)).toBe(args);

    args = { last: 100 };
    expect(validateArgs(callback)(args)).toBe(args);
  });

  it('should provides first in pair with after', () => {
    const args: IPaginationArgs = { first: 10, after: 'MHwtMjA=' };
    const callback = () => args;
    expect(validateArgs(callback)(args)).toBe(args);
  });

  it('should provides last in pair with before', () => {
    const args: IPaginationArgs = { last: 10, before: 'MTl8LTE=' };
    const callback = () => args;
    expect(validateArgs(callback)(args)).toBe(args);
  });

  it('when provided before and after should be a non empty string', () => {
    const error = new GraphQLError('before and after must be non empty string');
    let args: IPaginationArgs = { first: 10, after: '' };
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);

    args = { first: 10, after: 'CDE' };
    expect(validateArgs(callback)(args)).toBe(args);
  });

  it('should not provides first and last at same time', () => {
    const error = new GraphQLError('first and last must not be specified at the same time');
    const args: IPaginationArgs = { first: 10, last: 10 };
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);
  });

  it('should not provides after and before at same time', () => {
    const error = new GraphQLError('before and after must not be specified at the same time');
    const args: IPaginationArgs = { first: 10, after: 'MHwtMjA=', before: 'MTl8LTE=' };
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);
  });

  it('should not provides first in pair with before', () => {
    const error = new GraphQLError('first must be used with after but receive before instead');
    const args: IPaginationArgs = { first: 10, before: 'MTl8LTE=' };
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);
  });

  it('should not provides last in pair with after', () => {
    const error = new GraphQLError('last must be used with before but receive after instead');
    const args: IPaginationArgs = { last: 10, after: 'MHwtMjA=' };
    const callback = () => args;
    expect(() => validateArgs(callback)(args)).toThrow(error);
  });
});
