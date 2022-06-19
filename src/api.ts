import express from 'express';
import prisma from './prisma';

const router = express.Router();

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
router.get('/hello', (req, res) => {
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
router.get('/recipe', async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: { select: { id: true, displayName: true } },
      directions: true,
      ingredients: true,
    },
    orderBy: { createdAt: 'desc' },
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
 *             $ref: '#/src/rest/recipe'
 *
 */
router.get('/recipe/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await prisma.recipe.findFirst({
    where: {
      id,
    },
    include: {
      author: { select: { id: true, displayName: true } },
      directions: true,
      ingredients: true,
    },
  });
  res.json(recipe);
});

export default router;
