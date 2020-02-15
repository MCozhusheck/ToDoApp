const resolvers = {
  Query: {
    findByCredentials: (_, { input }, { models }) => {
      return models.User.findByCredentials(input);
    },
    users: (_, __, { models }) => {
      return models.User.find({});
    },
    findByEmail: (_, { input }, { models }) => {
      return models.User.find(input);
    }
  },
  Mutation: {
    newUser: (_, { input }, { models }) => {
      const newUser = new models.User(input);
      newUser.save();
      return newUser;
    }
  }
};

module.exports = resolvers;
