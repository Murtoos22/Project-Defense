const { Comment } = require('../models/Comment');

async function getOne(id) {
    return Comment.findById(id);
};

function createComment(commentData, username, authorId) {
    const comment = new Comment({
        author: authorId,
        text: commentData,
        authorUsername: username,
    });

    return comment;
};

async function updateComment(commentId, commentData, authorId) {
    const comment = Comment.findById(commentId);
    
    if(!comment) {
        throw new ReferenceError('Comment record not found!');
    };

    if(!comment.author.toString() !== authorId) {
        throw new Error('Access denied!');
    };

    comment.text = commentData;

    await comment.save();

    return comment;
};

async function deleteComment(commentId, authorId) {
    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ReferenceError('Record not found ' + commentId);
    };

    if(comment.author.toString() != authorId) {
        throw new Error('Access denied');
    };

    await Comment.findByIdAndDelete(authorId);
};

async function likeOrDislikeComment(commentId, authorId, likeOrDislike) {
    const comment = await Comment.findById(commentId);
    if(!comment) {
        throw new ReferenceError('Record not found: ' + commentId);
    };

    if(comment.author.toString() == authorId) {
        throw new Error('Access denied');
    };

    if(
        comment.likes.find(l => l.toString() == authorId) ||
        comment.dislikes.find(d => d.toString() == authorId)
    ) return;

    if(likeOrDislike === 'like') {
        comment.likes.push(authorId);
    } else if(likeOrDislike === 'dislike') {
        comment.dislikes.push(authorId);
    };

    await comment.save();

    return comment;
};

async function replyToComment(commentData, commentId, authorId) {
    const commentForReply = Comment.findById(commentId);
    if (!commentForReply) {
        throw new ReferenceError('Record not found: ' + commentId);
    };

    const replyComment = await createComment(commentData, authorId);

    commentForReply.replies.push(replyComment);
    
    await commentForReply.save();

    return [commentForReply, replyComment];
};

module.exports = {
    getOne,
    createComment,
    updateComment,
    deleteComment,
    replyToComment,
    likeOrDislikeComment,
};