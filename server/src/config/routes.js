const { userRouter } = require('../controllers/userController');
const { tokenRouter } = require('../controllers/tokenController');

function configRouters(app) {
    app.use(userRouter);
    app.use(tokenRouter);
};

module.exports = {
    configRouters,
};