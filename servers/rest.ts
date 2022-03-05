import { PrismaClient } from '@prisma/client';
import { Express } from 'express';

function restServer(app: Express, prisma: PrismaClient) {
  /**
   * @openapi
   * /api/hello:
   *  get:
   *    description: say hello
   *    responses:
   *      200:
   *        description: Returns a string, hello
   *
   */
  app.get('/api/hello', (req, res) => {
    res.json('hello');
  });

  /**
   * @openapi
   * /api/recipes:
   *  get:
   *    description: get all recipes
   *    responses:
   *      200:
   *        description:  List of Recipe json objects
   *
   */
  app.get('/api/recipes', async (req, res) => {
    const recipes = await prisma.recipe.findMany({
      include: {
        app_user: true,
        // recipe_directions: true,
        // recipe_ingredients: true,
        user_favorites: true,
      },
    });
    res.json(recipes);
  });
}

export default restServer;
