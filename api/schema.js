const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
    findByEmail(email: String): [User]
    todos: [Todo]
  }
  type User {
    name: String!
    email: String!
    password: String!
  }
  type Todo {
    _id: ID
    title: String!
    description: String
    completed: Boolean
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayLoad!
    loginUser(data: UserLoginInput!): AuthPayLoad!
    addTodo(data: TodoCreateInput!): Todo!
    deleteTodo(data: ID): [Todo]!
    changeStatusTodo(data: TodoChangeStatusInput): Todo!
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
  input TodoCreateInput {
    title: String!
    description: String
    completed: Boolean
  }
  input TodoChangeStatusInput {
    id: String!
    completed: Boolean!
  }
  type AuthPayLoad {
    token: String!
  }
`;

module.exports = typeDefs;
