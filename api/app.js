const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models/index');
const port = process.env.PORT || 3000;
require('./db/db');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    models,
    req
  })
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
