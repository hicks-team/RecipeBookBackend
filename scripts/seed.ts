import { PrismaClient } from '@prisma/client';
import recipes from './recipes.json';

const prisma = new PrismaClient();

const seed = async () => {
  console.log('seeding started');

  // cleanup
  await Promise.all([
    prisma.app_user.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.direction.deleteMany(),
    prisma.user_favorites.deleteMany(),
  ]);

  // pre-populate users from auth?

  const user = await prisma.app_user.create({
    data: {
      display_name: 'adminGuy123',
    },
  });

  await Promise.all(
    recipes.map((r) =>
      prisma.recipe.create({
        data: {
          cooking_time: r.cookingTime,
          course: r.course,
          description: r.description || 'no description found',
          difficulty: Number(r.difficulty),
          emoji: r.emoji,
          name: r.name,
          servings: Number(r.servings),
          author_id: user.id,
          directions: {
            create: r.directions.map((d, index) => ({ index, text: d.text })),
          },
          ingredients: {
            create: r.ingredients.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              unit: i.unit,
            })),
          },
        },
      })
    )
  );

  console.log('seeding finished');
};

seed();
