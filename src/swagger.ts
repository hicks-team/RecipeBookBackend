import swaggerJSDoc from 'swagger-jsdoc';

export const spec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Book',
      version: '0.0.1',
    },
  },
  apis: ['./src/rest/recipe.ts', './src/api.ts'],
});
