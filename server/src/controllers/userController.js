const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { parseError } = require('../util');
const { register, login } = require('../services/userService');
const { createToken } = require('../services/jwtService');
const { isGuest, isUser } = require('../middlewares/guards');

const userRouter = Router();

userRouter.post('/register', isGuest(),
    body('username').trim().isLength({ min: 2, max: 20 }).withMessage('Username must be between 2 and 20 characters long.'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Email must be between at least 10 characters long.'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 12 characters long.'),
    body('confirmPassword').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords do not match'),
    async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                return res.status(400).json(validation.errors);
            };
            const result = await register(username, email, password);
            const token = createToken(result);

            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });

            res.send({
                email: result.email,
                username: result.username,
                userId: result._id,
            });
        } catch (err) {
            res.status(500).json({ errors: parseError(err).errors });
        };
    },
);

userRouter.post('/login', isGuest(),
    body('email').trim().isEmail(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                return res.status(400).json(validation.errors);
            };
            const result = await login(email, password);
            const token = createToken(result);

            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });

            res.send({
                email: result.email,
                username: result.username,
                userId: result._id,
            });
        } catch (err) {
            res.status(500).json({ errors: parseError(err).errors });
        };
    }
);

userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
});

module.exports = {
    userRouter,
};