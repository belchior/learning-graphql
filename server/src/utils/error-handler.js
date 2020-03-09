import { GraphQLError } from 'graphql';
import { NODE_ENV } from '../enviroment';

const mongoError = {
  '11000': error => {
    const keys = Object.keys(error.keyPattern).join(', ');
    return `Duplicate key error: The following keys should be unique: ${keys}`;
  }
};

export const handleError = error => {
  if (NODE_ENV !== 'test') console.error(error);

  let message = error.message;
  if (
    error.name === 'MongoError' &&
    typeof mongoError[error.code] === 'function'
  ) {
    message = mongoError[error.code](error);
  }
  return Promise.reject(new GraphQLError(message));
};