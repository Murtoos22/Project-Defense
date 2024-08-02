const { Token } = require('../models/Token');

async function getAll() {
    return Token.find().lean();
};

async function getPartial() {
    return Token.find().limit(15).lean();
};

// TODO create the collections via mongoose, not imported!!!
async function getOne(id) {
    return Token.findById(id);
};

module.exports = {
    getAll,
    getOne,
    getPartial,
};