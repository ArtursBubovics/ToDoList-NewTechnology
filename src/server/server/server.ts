// const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const resolver = require('../schema/schema');

const app = express();
const PORT = 3005;


const typeDefs = gql`

  type Query {
    user(gmail: String!): User
    users: [User]
    checkUser(name: String!, gmail: String, password: String): Boolean
  }

  type User {
    id: ID
    name: String
    password: String
    gmail: String
  }

  type Mutation {
    createUser(name: String!, password: String!, gmail: String!): User
  }

`;

const server = new ApolloServer({ typeDefs, resolvers: resolver });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(PORT, (err?: Error) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Server started!');
    }
  });
});
 