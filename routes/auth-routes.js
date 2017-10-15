//load passport strategies
var db = require("../models");
var bCrypt = require("bcrypt-nodejs");
// var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require("body-parser");
var passport = require("passport");
module.exports = function(app) {
    
    // post Login route
    app.post('/api/login',
        passport.authenticate('local'),
        function(req, res) {
            console.log('test3');
            res.json('/admin');
        });

    //Post Signup route
    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        var generateHash = function(password) {
            return bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);
        };
        var pass = generateHash();
        db.User.create({
            user_name: req.body.user_name,
            password: pass,
            role: req.body.role,
            access_level: req.body.access_level
        }).then(function() {
            res.redirect(301, "/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    // logout route
    app.get("api/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });
};