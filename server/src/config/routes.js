const { userRouter } = require('../controllers/userController');

function configRouters(app) {
    app.use(userRouter);
};

module.exports = {
    configRouters,
};