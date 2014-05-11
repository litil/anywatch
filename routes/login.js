
/*
 * GET home page.
 */

exports.login = function(req, res){
    res.render('signin', { title: 'Sign in'});
};

exports.displaySignup = function(req, res){
    res.render('signup', { title: 'Sign up'});
};

exports.signin = function(req, res){
    var login = req.body.login;
    var password = req.body.password;

    // TODO use Parse to get the correct User

    var currentUser = {};
    currentUser['login'] = login;

    res.render('dashboard', { title: 'Dashboard', user: currentUser});
};

exports.signup = function(req, res){
    var login = req.body.login;
    var password = req.body.password;
    var confirmPassword = req.body.confirm_password;

    // TODO use Parse to create a User


    // construct the user
    var currentUser = {};
    currentUser['login'] = login;

    res.render('dashboard', { title: 'Dashboard', user: currentUser});
};