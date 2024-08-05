const { Router } = require('express');
const { isUser } = require('../middlewares/guards');
const { createComment } = require('../services/commentService');

const commentRouter = Router();

commentRouter.post('/createComment', isUser(), (req, res) => {
    const userId = req.user._id;
    console.log(req.user);

    return;
    const comment = createComment(req.body.data, userId);

    res.status(200);

});

module.exports = {
    commentRouter,
};