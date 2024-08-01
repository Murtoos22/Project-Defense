const { Schema, model } = require('mongoose');

const articleContentSchema = new Schema({
    introduction: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
    methodology: {
        type: String,
        required: true,
    },
    specialties: {
        type: String,
        required: true,
    },
    benefits: {
        type: String,
        required: true,
    },
});

const tokenSchma = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    articleContent: {
        type: articleContentSchema,
        required: true,
    },
});

const Token = model('Token', tokenSchma);

module.exports = {
    Token,
};