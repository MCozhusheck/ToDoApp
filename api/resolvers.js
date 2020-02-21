const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: (_, __, { models }) => {
      return models.User.find({});
    },
    findByEmail: (_, { input }, { models }) => {
      return models.User.find(input);
    }
  },
  Mutation: {
    signupUser: async (_, args, { models }) => {
      const {
        data: { email, name, password }
      } = args;
      console.log(email, name, password);
      const newUser = new models.User({ email, name, password });
      await newUser.save();
      return { token: jwt.sign({ _id: newUser._id }, process.env.JWT_KEY) };
    },
    loginUser: async (_, args, { models }) => {
      const {
        data: { email, password }
      } = args;
      const user = models.User.findByCredentials({ email, password });
      if (!user) throw new Error('Unable to login!');
      return { token: jwt.sign({ _id: user._id }, process.env.JWT_KEY) };
    }
  }
};

module.exports = resolvers;
