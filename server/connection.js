const mongoose = require('mongoose');
require('dotenv').config();  // For loading environment variables

// MongoDB URI from environment variables
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/google-books';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
