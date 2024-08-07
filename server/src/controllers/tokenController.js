const { Router } = require('express');
const { isUser } = require('../middlewares/guards');
const { createComment } = require('../services/commentService');
const { getAll, getPartial, getOne, appendComment, appendReply } = require('../services/tokenService');

const tokenRouter = Router();

tokenRouter.get('/tokens', async (req, res) => {
    const tokens = await getAll();

    if(!tokens) res.status(404);

    res.send(tokens);
});

tokenRouter.get('/tokens/partial', async (req, res) => {
    const tokens = await getPartial();

    if(!tokens) res.status(404);

    res.send(tokens);
});

tokenRouter.get('/tokens/:id', async(req, res) => {
    const token = await getOne(req.params.id);

    if(!token) res.status(404);

    res.send(token);
});

tokenRouter.post('/tokens/:id/comment', isUser(), async(req, res) => {
    const tokenId = req.params.id;
    const commentData = req.body.data;
    const { _id: userId, username } = req.user;

    const comment = createComment(commentData, username, userId);
    const token = await appendComment(comment, tokenId);

    if(!token) res.status(404);

    res.send(token);
});

tokenRouter.delete('/tokens/:id/comment/:commentId', isUser(), async (req, res) => {
    try {
        const tokenId = req.params.id;
        const commentId = req.params.commentId;
        const { _id: userId } = req.user;

        const token = await getOne(tokenId);

        if (!token) {
            return res.status(404).send({ error: 'Comment not found' });
        };

        const comment = token.articleContent.comments.id(commentId);

        if (comment.author.toString() !== userId) {
            return res.status(403).send({ error: 'You can only delete your own comments' });
        };
        
        token.articleContent.comments.pull(commentId);

        await token.save();

        res.send(token);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    };
});

tokenRouter.put('/tokens/:id/comment/:commentId', isUser(), async (req, res) => {
    try {
        const tokenId = req.params.id;
        const commentId = req.params.commentId;

        const { _id: userId } = req.user;

        const token = await getOne(tokenId);

        if (!token) {
            return res.status(404).send({ error: 'Token not found' });
        };

        const comment = token.articleContent.comments.id(commentId);

        if (!comment) {
            return res.status(404).send({ error: 'Comment not found' });
        };

        if (comment.author.toString() !== userId) {
            return res.status(403).send({ error: 'You can only edit your own comments' });
        };

        comment.text = req.body.data;

        await token.save();

        res.send(token);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    };
});

tokenRouter.post('/tokens/:id/comment/like', isUser(), async (req, res) => {
    try {
        const tokenId = req.params.id;
        const { _id: userId } = req.user;
        const { _id: commentId } = req.body.data;

        const token = await getOne(tokenId);

        if (!token) {
            return res.status(404).send({ error: 'Comment not found' });
        };

        const comment = token.articleContent.comments.id(commentId);

        if (comment.author.toString() === userId) {
            return res.status(400).send({ error: 'You cannot like your own comment' });
        };

        if (comment.likes.some(l => l.toString() === userId)) {
            return res.status(400).send({ error: 'You have already liked this comment' });
        };

        comment.dislikes = comment.dislikes.filter(d => d.toString() !== userId);

        comment.likes.push(userId);

        await token.save();

        res.send(comment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    };
});

tokenRouter.post('/tokens/:id/comment/dislike', isUser(), async (req, res) => {
    try {
        const tokenId = req.params.id;
        const { _id: userId } = req.user;
        const { _id: commentId } = req.body.data;

        const token = await getOne(tokenId);

        if (!token) {
            return res.status(404).send({ error: 'Comment not found' });
        };

        const comment = token.articleContent.comments.id(commentId);

        if (comment.author.toString() === userId) {
            return res.status(400).send({ error: 'You cannot dislike your own comment' });
        };

        if (comment.dislikes.some(d => d.toString() === userId)) {
            return res.status(400).send({ error: 'You have already liked this comment' });
        };

        comment.likes = comment.likes.filter(l => l.toString() !== userId);

        comment.dislikes.push(userId);

        await token.save();

        res.send(comment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    };
});

module.exports = {
    tokenRouter,
};