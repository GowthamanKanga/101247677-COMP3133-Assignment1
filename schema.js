const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Employee {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    login(email: String!, password: String!): User
  }

  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): User
    addEmployee(
      firstname: String!
      lastname: String!
      email: String!
      gender: String
      salary: Float
    ): Employee
    updateEmployeeById(
      id: ID!
      firstname: String
      lastname: String
      email: String
      gender: String
      salary: Float
    ): Employee
    deleteEmployeeById(id: ID!): ID
  }
`;

exports.typeDefs = gql`
  extend type User {
    success: Boolean!
    message: String!
  }
`;

exports.typeDefs = gql`
  extend type Employee {
    success: Boolean!
    message: String!
  }
`;
