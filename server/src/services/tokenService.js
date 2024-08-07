const { Token } = require('../models/Token');

async function getAll() {
    return Token.find().lean();
};

async function getPartial() {
    return Token.find().limit(15).lean();
};

async function getOne(id) {
    return Token.findById(id);
};

async function appendComment(comment, tokenId) {
    const token = await getOne(tokenId);
    
    token.articleContent.comments.push(comment);

    await token.save();

    return token;
};

async function appendReply(comment, tokenId) {
    const token = await getOne(tokenId);
    
    const commentToReply = token.articleContent.comments.find(comm => comm._id.toString() === comment._id.toString());

    commentToReply.replies.push(comment);

    await token.save();

    return token;
};

module.exports = {
    getAll,
    getOne,
    getPartial,
    appendReply,
    appendComment,
};