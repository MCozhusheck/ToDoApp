const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
    findByCredentials(input: FindUserInput): User
    findByEmail(email: String): [User]
  }
  type User {
    name: String!
    email: String!
    password: String!
  }

  input FindUserInput {
    email: String
    password: String
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayLoad!
    loginUser(data: UserLoginInput!): AuthPayLoad!
  }
  input UserCreateInput {
    email: String!
    name: String!
    password: String!
  }
  input UserLoginInput {
    email: String!
    password: String!
  }
  type AuthPayLoad {
    token: String!
  }
`;

module.exports = typeDefs;
