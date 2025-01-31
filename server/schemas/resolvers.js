const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (_, _id) => {
          return User.findOne({_id}).populate('savedBooks')
      },
      user: async () => {
          return User.find({})
      }
  },

  Mutation: {
     login: async (_, { email, password }) => {
          const user = await User.findOne({ email });
          
          if (!user) {
              throw AuthenticationError
          }

          const correctPW = await user.isCorrectPassword(password)

          if (!correctPW) {
              throw AuthenticationError
          }

          const token = signToken(user);

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