const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
  }
  type User {
    name: String
    email: String
    password: String
    tokens: [String]
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Mutation {
    newUser(input: UserInput): User!
  }
`;

module.exports = typeDefs;
