
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017/company';
export const DEBUG = process.env.DEBUG;
export const PORT = process.env.PORT || 4000;
export const ORIGIN = process.env.ORIGIN || `http://localhost:${PORT}/graphql`;
