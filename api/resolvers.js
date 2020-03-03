const resolvers = {
  Query: {
    users: async (_, __, { User }) => {
      // const decoded = decodedToken(req);
      return User.find({});
    },
    findByEmail: (_, { input }, { User }) => {
      return User.find(input);
    },
    todos: async (_, __, {loggedUser}) => {
      return loggedUser.todos
    }
  },
  Mutation: {
    signupUser: async (_, args, { User }) => {
      const {
        data: { email, name, password }
      } = args;
      const newUser = new User({ email, name, password });
      await newUser.save();
      const token = await newUser.generateAuthToken();
      return { token };
    },
    loginUser: async (_, args, { User }) => {
      const {
        data: { email, password }
      } = args;
      const user = await User.findByCredentials({ email, password });
      if (!user) throw new Error('Unable to login!');
      const token = await user.generateAuthToken();
      return {token}
    },
    addTodo: async (_, args, { loggedUser }) => {
      const {
        data: {title, description, completed}
      } = args;
      const todo = loggedUser.todos.create({title, description, completed});
      loggedUser.todos.push(todo);
      loggedUser.save();
      return todo
    },
    deleteTodo: async (_, args, { loggedUser }) => {
      const {
        data: id
      } = args;
      const todos = loggedUser.todos.pull(id)
      loggedUser.save()

      return todos
    },
    changeStatusTodo: async (_, args, {loggedUser}) => {
      const {
        data: {id, completed}
      } = args
      const todo = loggedUser.todos.id(id)
      todo.completed = completed
      loggedUser.save()
      return todo
    }
  }
};

module.exports = resolvers;
