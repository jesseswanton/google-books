const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware to authenticate GraphQL requests
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1].trim();
    }

    if (!token) {
      return { user: null }; // Return null if no token is provided
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (error) {
      console.log('Invalid token:', error.message);
      return { user: null }; // Return null if verification fails
    }
  },

  // Function to sign a JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
