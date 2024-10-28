// const { makeExecutableSchema } = require('@graphql-tools/schema');
import { Request } from 'express';
import cors from 'cors';
import verifyTokenMiddleware from '../../common/Token/verifyTokenMiddleware';
import cookieParser from 'cookie-parser';
import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types';
//import publicRouter from '../Routes/publicRouter';
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const resolver = require('../schema/schema');
require('dotenv').config();


const app = express();
const PORT = 3005;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(verifyTokenMiddleware);


const typeDefs = gql`

  type Query {
    checkUserExistence(name: String!, password: String!): Boolean
    isProtectedQuery: Boolean
    loginUser(name: String!, password: String!): Token
    verifyToken(token: String!, type: TokenType!): TokenStatus
    refreshTokens(refreshToken: String!): Token
    getUserInformation(id: Int!): MainUserInfo
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  type MainUserInfo{
    name: String,
    gmail: String
  }

  enum TokenType {
    ACCESS
    REFRESH
  }

  type TokenStatus {
    valid: Boolean!
    message: String
    data: String
  }

  type Mutation {
    registerUser(name: String!, gmail: String!, password: String!): Token
  }

`;

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  context: ({ req }: { req: Request }) => {
    console.log("Request received at:", new Date());
    return { user: req.user };
  },
  formatResponse: (response: GraphQLResponse, requestContext: GraphQLRequestContext) => {
    console.log("Response sent at:", new Date());
    return response;
  },
});

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
