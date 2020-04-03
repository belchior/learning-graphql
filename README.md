# Learning GraphQL

> The purpose of this repository is to practice GraphQL acquired knowledge as well as your ecosystem


The purpose of this branch is to find the best usage and setup of the specified stack.

## Stack
The `server` is based on
- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [MongoDB](https://www.mongodb.com/)


The `client` is based on
- JavaScript
- [React.js](https://github.com/facebook/react)
- [Relay Modern](https://github.com/facebook/relay)
- [Material-UI](https://github.com/mui-org/material-ui)


## Get started
After clone this repo you should install the dependencies of the `client` and `server`.

### Server
At this moment you must have installed and configured MongoDB on your machine or in a cloud provider, you can use the environment variable `DB_CONNECTION` to specify the database connection, the data used by this server is strongly based on the [GraphQL API of Github](https://developer.github.com/v4/explorer/), I don't know if I have legal right to share the data that I scraping to develop this project, so you must provide your on data.

install dependencies
```shell
cd ./server;
npm install
```

then
```shell
npm start
```

### Client
```shell
cd ./client;
npm install
```

then
```shell
npm start
```
