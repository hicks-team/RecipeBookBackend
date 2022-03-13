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
    prisma.userFavorites.deleteMany(),
  ]);

  // pre-populate users from auth?

  const user = await prisma.app_user.create({
    data: {
      displayName: 'adminGuy123',
    },
  });

  await Promise.all(
    recipes.map((r) =>
      prisma.recipe.create({
        data: {
          cookingTime: r.cookingTime,
          course: r.course,
          description:
            r.description ||
            'This is where a description would go...if we HAD one! It would tell you what you can expect from this recipe.',
          difficulty: Number(r.difficulty),
          emoji: r.emoji,
          name: r.name,
          servings: Number(r.servings),
          authorId: user.id,
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
