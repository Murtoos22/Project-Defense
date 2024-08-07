const { Router } = require('express');
const { isUser } = require('../middlewares/guards');
const { createComment, getOne } = require('../services/commentService');
const { Token } = require('../models/Token');

const commentRouter = Router();

commentRouter.post('/comment/create', isUser(), async(req, res) => {
    const { _id: userId, username } = req.user;

    const comment = await createComment(req.body.data, username, userId);

    res.send(comment);
});

commentRouter.post('/comment/like', async (req, res) => {
    try {
        const { _id: commentId } = req.body.data;
        const { _id: userId } = req.user;

        const token = await Token.findOne({ 'articleContent.comments._id': commentId });

        if (!token) {
            return res.status(404).send({ error: 'Comment not found' });
        }

        const comment = token.articleContent.comments.id(commentId);

        if (comment.author.toString() === userId) {
            return res.status(400).send({ error: 'You cannot like your own comment' });
        }

        if (comment.likes.some(l => l.toString() === userId)) {
            return res.status(400).send({ error: 'You have already liked this comment' });
        }

        comment.likes.push(userId);

        await token.save();

        res.send(comment);
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

commentRouter.post('/comment/dislike', isUser(), async(req, res) => {
    const { _id: commentId } = req.body.data;
    const { _id: userId } = req.user;

    const comment = await getOne(commentId);

    if(!comment) {
        throw new ReferenceError('No comment record found');
    };

    if(comment.author.toString() == userId) {
        throw new Error('Access denied');
    };

    if(comment.dislikes.find(d => d.toString() == userId)) {
        return;
    };

    comment.dislikes.push(userId);

    await comment.save();

    res.send(comment);
});

module.exports = {
    commentRouter,
};