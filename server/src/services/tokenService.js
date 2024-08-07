const { Token } = require('../models/Token');
const { Comment } = require('../models/Comment');

async function getAll() {
    return Token.find().lean();
};

async function getPartial() {
    return Token.find().limit(15).lean();
};

async function getOne(id) {
    return Token.findById(id);
};

function createComment(commentData, username, authorId) {
    const comment = new Comment({
        author: authorId,
        text: commentData,
        authorUsername: username,
    });

    return comment;
};

async function appendComment(comment, tokenId) {
    const token = await getOne(tokenId);
    
    token.articleContent.comments.push(comment);

    await token.save();

    return token;
};

module.exports = {
    getAll,
    getOne,
    getPartial,
    createComment,
    appendComment,
};