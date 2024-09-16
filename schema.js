const { gql } = require('apollo-server-express');
const { Character } = require('./database');

const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    movie: String!
  }

  type Query {
    getCharacter(id: ID!): Character
    getCharacters: [Character]
  }

  type Mutation {
    createCharacter(name: String!, movie: String!): Character
    updateCharacter(id: ID!, name: String, movie: String): Character
    deleteCharacter(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getCharacter: async (_, { id }) => {
      return await Character.findByPk(id);
    },
    getCharacters: async () => {
      return await Character.findAll();
    },
  },
  Mutation: {
    createCharacter: async (_, { name, movie }) => {
      return await Character.create({ name, movie });
    },
    updateCharacter: async (_, { id, name, movie }) => {
      const character = await Character.findByPk(id);
      if (character) {
        character.name = name || character.name;
        character.movie = movie || character.movie;
        await character.save();
        return character;
      }
      throw new Error('Character not found');
    },
    deleteCharacter: async (_, { id }) => {
      const character = await Character.findByPk(id);
      if (character) {
        await character.destroy();
        return 'Character deleted';
      }
      throw new Error('Character not found');
    },
  },
};

module.exports = { typeDefs, resolvers };
