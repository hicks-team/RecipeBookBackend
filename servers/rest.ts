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
   * /api/recipe:
   *  get:
   *    description: get all recipes
   *    responses:
   *      200:
   *        description:  List of Recipe json objects
   *
   */
  app.get('/api/recipe', async (req, res) => {
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

  /**
   * @openapi
   * /api/recipe/{id}:
   *  get:
   *    description: get a recipe
   *    parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the Recipe to retrieve.
   *         schema:
   *           type: integer
   *    responses:
   *      200:
   *        description:  Recipe json object
   *        content:
   *          application/json:
   *           schema:
   *             $ref: '#/rest/recipe'
   *
   */
  app.get('/api/recipe/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.json(recipe);
  });
}

export default restServer;
