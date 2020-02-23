const resolvers = {
  Query: {
    users: async (_, __, { models, req }) => {
      // const decoded = decodedToken(req);
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
      const newUser = new models.User({ email, name, password });
      await newUser.save();
      const token = await newUser.generateAuthToken();
      return { token };
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
