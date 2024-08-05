const { verifyToken } = require("../services/jwtService");

function session() {
    return function(req, res, next) {
        const token = req.cookies?.token;

        if(token) {
            try {
                const sessionData = verifyToken(token);
                req.user = {
                    _id: sessionData._id,
                    email: sessionData.email,
                    username: sessionData.username,
                };
                res.locals.hasUser = true;
            } catch (err) {
                res.clearCookie('token');
            };
        };
        next();
    };
};

module.exports = {
    session,
};