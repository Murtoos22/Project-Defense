const { userRouter } = require('../controllers/userController');
const { tokenRouter } = require('../controllers/tokenController');
const { commentRouter } = require('../controllers/commentController');

function configRouters(app) {
    app.use(userRouter);
    app.use(tokenRouter);
    app.use(commentRouter);
};

module.exports = {
    configRouters,
};