const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
    findByCredentials(input: FindUserInput): User
    findByEmail(email: String): [User]
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

  input FindUserInput {
    email: String
    password: String
  }

  type Mutation {
    newUser(input: UserInput): User!
  }
`;

module.exports = typeDefs;
