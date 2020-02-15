const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 3000;
require('./db/db');

const app = express();

const schema = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch'
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
