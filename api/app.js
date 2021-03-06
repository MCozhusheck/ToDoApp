const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/User');
const port = process.env.PORT || 3000;
require('./db/db');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const header =  req.headers.authorization;
    const token = header.replace('Bearer ', '');
    const loggedUser = await User.findOne({"tokens.token": token})

    return {loggedUser,User}
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
