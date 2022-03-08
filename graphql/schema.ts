import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as RecipeResolvers, typeDefs as Recipe } from './recipe';

const Query = `
    type Query {
        _empty: String
    }
`;

const resolver = {
  ...RecipeResolvers,
};

const schema = makeExecutableSchema({
  typeDefs: [Query, Recipe],
  resolvers: resolver,
});

export default schema;
