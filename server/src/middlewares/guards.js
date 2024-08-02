// TODO refactor guards to work properly

function isUser() {
    return function(req, res, next) {
        if(!req.user) {
            console.log('access denied');
            res.redirect('/login');
        } else {
            next();
        }
    };
};

function isGuest() {
    return function(req, res, next) {
        if(req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};

module.exports = {
    isUser,
    isGuest,
};