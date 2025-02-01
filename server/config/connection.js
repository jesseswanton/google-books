const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jswan7692:mongodb7@cluster0.o8ap0.mongodb.net/googlebooks?retryWrites=true&w=majority&appName=Cluster0' || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
