const { Router } = require('express');
const { getAll, getPartial, getOne } = require('../services/tokenService');
const { isUser } = require('../middlewares/guards');
const { createComment } = require('../services/commentService');

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
    const userId = req.user._id;

    // const comment = createComment(req.body, userId);

    res.send(comment);
});

module.exports = {
    tokenRouter,
};