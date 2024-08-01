const { Router } = require('express');
const { getAll, getPartial, getOne } = require('../services/cryptoDataService');

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

module.exports = {
    tokenRouter,
};