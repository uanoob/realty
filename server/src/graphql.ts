import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: (): string => 'Hello from the Query!',
    },
  },
});
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: (): string => 'Hello from the Mutation!',
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
