const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      console.log("Context User:", context.user);
      return User.findOne({ _id: context.user._id }).populate('savedBooks');
    },    
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(email);
      if (!user) {
          throw new AuthenticationError
      }

      const correctPW = await user.isCorrectPassword(password)
      console.log(password);
      if (!correctPW) {
          throw new AuthenticationError
      }

      const token = signToken(user);
      console.log(token);
      return { user, token };

     },
     addUser: async (_, { username, email, password }) => {
      const user = await User.create({username, email, password});

      const token = signToken(user)

      return { user, token } 
     },
     saveBook: async (_, { _id, criteria }) => {
      const savedBook = await User.findOneAndUpdate(
        {_id},
        {$addToSet: {savedBooks: criteria}},
        {new: true, runValidators: true}
      )
        return savedBook
     },
       removeBook: async (_, { _id, bookId }) => {
          const removedBook = await User.findOneAndUpdate({ _id }, { $pull: { savedBooks: { bookId } } }, { new: true });
          return removedBook;
  }
}
}

module.exports = resolvers;