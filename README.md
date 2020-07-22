# Learning GraphQL

> The purpose of this repository is to practice GraphQL acquired knowledge as well as your ecosystem

[Demo](http://ec2-3-133-112-31.us-east-2.compute.amazonaws.com)

The purpose of this **branch** is to find out the best setup and usage of the specified stack. Each branch at this repo has a unique stack, take a look at [all branches](https://github.com/belchior/learning-graphql/branches/all).

## Stack

The `server` is based on

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [GraphQL.js](https://github.com/graphql/graphql-js)
- [PostgreSQL](https://www.postgresql.org/)

The `client` is based on

- [TypeScript](https://github.com/microsoft/TypeScript)
- [React.js](https://github.com/facebook/react)
- [Relay Modern](https://github.com/facebook/relay)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Create React App](https://github.com/facebook/create-react-app)

The server implement the [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm) to handle paginated list and are compliance with [Relay GraphQL Server Specification](https://relay.dev/docs/en/graphql-server-specification.html) to take's advantages of Relay Modern features.

## Development

### Server

The data used by this server is strongly based on the [GraphQL API of Github](https://developer.github.com/v4/explorer/), I don't know if I have legal right to share the data that I copy to develop this project, so you must provide your on data.

The better way to run the server is using [docker-compose](https://docs.docker.com/compose/). First create a `.env` file using the command below in root directory.

```shell
#!/usr/bin/env bash

cat << EOF > ./.env
# Client
CLIENT_PORT=3000
CLIENT_URL=http://localhost:3000

# Server
NODE_ENV=development
SERVER_PORT=4000
SERVER_HOST=localhost
DEBUG=db

# Database
PGHOST=database
PGUSER=postgres
PGDATABASE=learning_graphql
PGPASSWORD=secret
PGPORT=5432
PGDBPATH=/path/to/postgresql/data
POSTGRES_PASSWORD="$PGPASSWORD"
EOF
```

You must change the env variable `PGDBPATH` to a valid path.

Then start the server in development mode executing the compose command

```shell
docker-compose -f docker-compose.dev.yml up
```

#### Debug

You can use the environment variable `DEBUG` to enable some level of debug, it's possible to use more than one, like: `DEBUG='db query'`

| value | description                 |
|-------|-----------------------------|
| db    | enable database log         |
| query | enable GraphQL query log    |
| *     | enable full application log |

### Client

In development mode relay has [watchman](https://github.com/facebook/watchman) as dependency to enable the `--watch` feature, you must install it first and make it available at `PATH` environment variable, after that you are ready to install client dependencies.

```shell
cd ./client
npm ci
```

start client in development mode

```shell
npm run start
```

### Integration between server and client

After change some definition inside `server/src/graphql` the client must run the script below to update the `client/src/schema.graphql`.

```shell
npm run get-schema
```

## References

Some links that have somehow helped to develop this project or influenced my decisions

### Docs

- [GitHub GraphQL API](https://developer.github.com/v4/explorer/)
- [GraphQL Specification](http://spec.graphql.org/June2018/)
- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)
- [Relay - GraphQL Server Specification](https://relay.dev/docs/en/graphql-server-specification.html)
- [Relay - Fragment Container](https://relay.dev/docs/en/fragment-container)
- [Relay - Pagination Container](https://relay.dev/docs/en/pagination-container)
- [Relay - Testing Relay Components](https://relay.dev/docs/en/testing-relay-components#relay_test_operation)
- [Getting Started With GraphQL.js](https://graphql.org/graphql-js/)
- [DataLoader](https://github.com/graphql/dataloader)
- [GraphQL Foundation](https://foundation.graphql.org/)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [PostgreSQL UUID](https://www.postgresql.org/docs/9.1/uuid-ossp.html)

### Articles

- [Input object type as an argument for GraphQL mutations and queries](https://atheros.ai/blog/input-object-type-as-an-argument-for-graphql-mutations-and-queries)
- [GraphQL Resolvers: Best Practices](https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55)
- [Code-first vs. schema-first development in GraphQL](https://blog.logrocket.com/code-first-vs-schema-first-development-graphql/)
- [Solving the N+1 Problem for GraphQL through Batching](https://engineering.shopify.com/blogs/engineering/solving-the-n-1-problem-for-graphql-through-batching)
- [Five ways to paginate in Postgres, from the basic to the exotic](https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/)
- [Debugging complex GraphQL queries with shortlinks to GraphiQL](https://nilsnh.no/2018/08/04/debugging-complex-graphql-queries-with-shortlinks-to-graphiql/)
- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
- [Modularizing your GraphQL schema code](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
- [stackoverflow - TypeScript: Interfaces vs Types](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types#answer-52682220)

### Videos

- [DataLoader – Source code walkthrough](https://www.youtube.com/watch?v=OQTnXNCDywA&feature=youtu.be)
- [Lessons from 4 Years of GraphQL](https://www.youtube.com/watch?v=zVNrqo9XGOs)
