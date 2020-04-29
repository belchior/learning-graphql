# Learning GraphQL

> The purpose of this repository is to practice GraphQL acquired knowledge as well as your ecosystem

[Demo](https://belchior-learning-graphql.herokuapp.com/)

The purpose of this **branch** is to find out the best setup and usage of the specified stack. Each branch at this repo has a unique stack, take a look.

## Stack

The `server` is based on

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [MongoDB](https://www.mongodb.com/)

The `client` is based on

- [TypeScript](https://github.com/microsoft/TypeScript)
- [React.js](https://github.com/facebook/react)
- [Relay Modern](https://github.com/facebook/relay)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Create React App](https://github.com/facebook/create-react-app)

The server implement the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm) to handle paginated list and are compliance with [Relay GraphQL Server Specification](https://relay.dev/docs/en/graphql-server-specification.html) to take's advantages of Relay Modern features.

## Development

### Server

the data used by this server is strongly based on the [GraphQL API of Github](https://developer.github.com/v4/explorer/), I don't know if I have legal right to share the data that I copy to develop this project, so you must provide your on data.

After clone this repo you can enter in server directory and install all dependencies

```shell
cd ./server
npm install
```

start server in develop mode

```shell
npm run start:ts
```

#### Debug

You can use the environment variable `DEBUG` to enable some level of debug, it's possible to use more than one, like: `DEBUG='db query'`

| value | description                 |
|-------|-----------------------------|
| db    | enable database log         |
| query | enable GraphQL query log    |
| *     | enable full application log |

### Client

In development mode relay has [watchman](https://github.com/facebook/watchman) as dependency to enable the `--watch` feature, you must install it first and make it available at `PATH` environment variable after that you are ready to install client dependencies.

```shell
cd ./client
npm install
```

start client in development mode

```shell
npm run start
```

### Integration between server and client

After server change some definition inside `server/src/graphql` the client must run the above script to update the `client/src/schema.graphql`.

```shell
npm run get-schema
```
