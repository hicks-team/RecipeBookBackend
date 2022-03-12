import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type Recipe {
    id: Int
    created_at: String
    updated_at: String
    cooking_time: String
    course: String
    description: String
    difficulty: Int
    emoji: String
    name: String
    servings: Int
    author_id: Int
  }

  extend type Query {
    recipes: [Recipe]
    recipe(id: Int!): Recipe
  }
`;

// app_user           app_user?            @relation(fields: [author_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk9moeuwu3etkpyxwvn1tcn3dii")
// recipe_directions  recipe_directions[]  @ignore
// recipe_ingredients recipe_ingredients[] @ignore
// user_favorites

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    recipes: () => prisma.recipe.findMany(),
    recipe: (id: string) =>
      prisma.recipe.findFirst({
        where: {
          id,
        },
      }),
  },
};

export { typeDefs, resolvers };
