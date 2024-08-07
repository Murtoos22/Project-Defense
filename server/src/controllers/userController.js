const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { register, login } = require('../services/userService');
const { createToken } = require('../services/jwtService');
const { isGuest, isUser } = require('../middlewares/guards');

const userRouter = Router();

userRouter.post('/register', isGuest(),
    body('username').trim().isLength({ min: 2, max: 40 }).withMessage('Username must be between 2 and 40 characters long.'),
    body('email').trim().isEmail().isLength({ min: 5 }).withMessage('Email must be at least 5 characters long.'),
    body('password').trim().isLength({ min: 12 }).withMessage('Password must be at least 12 characters long.'),
    body('confirmPassword').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords do not match'),
    async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
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
            res.status(500).json({
                message: err.message,
            });
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
                throw validation.errors;
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
            res.status(500).json({
                message: err.message,
            });
        };
    }
);

userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged out successfully' });
});

userRouter.get('/getUser', (req, res) => {
    res.send(req.user);
});

module.exports = {
    userRouter,
};