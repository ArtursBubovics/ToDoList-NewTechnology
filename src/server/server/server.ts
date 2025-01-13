import { Request } from 'express';
import cors from 'cors';
import verifyTokenMiddleware from '../../common/Token/verifyTokenMiddleware';
import cookieParser from 'cookie-parser';
import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types';
import { graphqlUploadExpress } from 'graphql-upload';
import path from 'path';
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const resolver = require('../schema/schema');
require('dotenv').config();

const app = express();
const PORT = 3005;

app.use(graphqlUploadExpress());
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000' , 'https://studio.apollographql.com'],
  credentials: true,
}));

app.use(verifyTokenMiddleware);


const typeDefs = gql`
  scalar Upload

  type Query {
    checkUserExistence(name: String!, password: String!): Boolean
    isProtectedQuery: Boolean
    loginUser(name: String!, password: String!): Token
    verifyToken(token: String!, type: TokenType!): TokenStatus
    refreshTokens(refreshToken: String!): Token
    getUserInformation(UserID: Int!): MainUserInfo
    passwordValidation(UserID: Int!, currentPassword: String!): Boolean
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
    user: User
  }

  type User {
    UserID: Int!
    name: String!
    gmail: String!
    iat: Int!
    exp: Int!
  }

  type UpdateUserInfo {
    success: Boolean!,
    message: String!
  }

  type Mutation {
    registerUser(name: String!, gmail: String!, password: String!): Token
    updateUserInfo(UserID: Int!, name: String!, gmail: String!, password: String!): UpdateUserInfo
    singleUpload(file: Upload!): Boolean
  }
 
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  uploads: false,
  context: ({ req }: { req: Request }) => {
    console.log("Request received at:", new Date());
    return { user: req.user };
  },
  formatResponse: (response: GraphQLResponse, requestContext: GraphQLRequestContext) => {
    console.log("Response sent at:", new Date());
    return response;
  },
  playground: true, // Включает GraphiQL (в ApolloServer это называется playground)
  introspection: true, // Делает схему доступной для клиента
});

server.start().then(() => {
  server.applyMiddleware({ app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
   });

   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.listen(PORT, (err?: Error) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Server started!');
    }
  });
});
