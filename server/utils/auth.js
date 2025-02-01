const jwt = require('jsonwebtoken');
// const { GraphQLError } = require('graphql');
// // require('dotenv').config();

// // process.env.JWT_SECRET_KEY 
const secret = 'supersecret';
const expiration = '12h';

const signToken = (user) => {
  const payload = { _id: user._id, email: user.email, username: user.username };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, secret);
    return { user: data };
  } catch {
    console.log('Invalid token');
    return { user: null };
  }
};

module.exports = { authMiddleware, signToken };
