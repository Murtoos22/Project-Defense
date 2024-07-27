const express = require('express');
const CookieParser = require('cookie-parser');
const { session } = require('../middlewares/session');

const secret = 'cookie secret';

function configExpress(app) {
    app.use(CookieParser(secret));
    app.use(session());

    app.use(express.urlencoded({ extended: true }));
};

module.exports = {
    configExpress,
};
