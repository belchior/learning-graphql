import { GraphQLError } from 'graphql';
import { NODE_ENV } from '../enviroment';


interface MongoError extends Error {
  code: string
  keyPattern: { [key: string]: string }
  name: 'MongoError'
}
interface MongoErrorHandler {
  [code: string]: (error: MongoError) => string
}

const mongoError: MongoErrorHandler = {
  '11000': (error: MongoError) => {
    const keys = Object.keys(error.keyPattern).join(', ');
    return `Duplicate key error: The following keys should be unique: ${keys}`;
  }
};

export const handleError = (error: any) => {
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

export const handleNotFound = (message: string) => async (data: any) => {
  if (data == undefined || (Array.isArray(data) && data.length === 0)) {
    return handleError(new Error(message));
  }
  return data;
};
