import { PrismaClient } from '@prisma/client';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import restServer from '../servers/rest';

(async () => {
  const prisma = new PrismaClient();
  const port = process.env.PORT || 8989;
  const app = express();

  const spec = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Recipe Book',
        version: '0.0.1',
      },
    },
    apis: ['./servers/rest.ts'],
  });

  app.use('/rest-docs', serve, setup(spec));
  restServer(app, prisma);

  app.listen(port, () => {
    console.log('server start');
  });
})();
