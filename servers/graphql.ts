import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import schema from '../graphql/schema';

async function graphqlServer(app: Express) {
  const graphServer = new ApolloServer({
    schema,
    introspection: true,
  });

  await graphServer.start();
  graphServer.applyMiddleware({ app });
}

export default graphqlServer;
