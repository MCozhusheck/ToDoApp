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
    },
    addTodo: async (_, args, {models, user}) => {
      const {
        data: {title, description, completed}
      } = args;
      const todo = new models.Todo({title, description, completed});
      user.todos.concat(todo);
      user.save();
      return todo
    },
    deleteTodo: async (_, args, {models, user}) => {
      const {
        data: id
      } = args;
      console.log(id)
      const todo = user.todos.remove(id)
      user.save()

      return todo
    },
    changeStatusTodo: async (_, args, {models}) => {

    }
  }
};

module.exports = resolvers;
