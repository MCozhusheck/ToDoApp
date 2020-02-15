const resolvers = {
  Query: {
    users: (_, __, { models }) => {
      return models.User.find({});
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
