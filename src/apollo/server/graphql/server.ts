import { DocumentNode } from "graphql";

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
  console.log("gooo!")
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              console.log('Apollo Server shutting down...');
              await server.stop();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server is running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startApolloServer(typeDefs, resolvers);
