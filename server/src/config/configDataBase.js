const mongoose = require('mongoose');
require('../models/User');
 
async function configDataBase() {
    // TODO change connection string if needed to connect to local mongo collection
    const connectionsString = 'mongodb://localhost:27017/crypto-news';

    await mongoose.connect(connectionsString);

    console.log('Database connected');
};

module.exports = {
    configDataBase,
};