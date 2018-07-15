const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Bar = require('../models/bar');
const router = express.Router();
const yelpSearch = require('../yelp.js')
const addBarToDb = require('../controllers/Bars.js')

function loggedIn(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(401).send('Unauthorized') 
    }
}

router.post('/api/getBars', function (req, res) {
    yelpSearch(req.body.location, successCallback.bind(null, res), failureCallback.bind(null, res))

    function successCallback(req, bars) {
        addBarToDb(bars, success.bind(null, res))
        function success(req, bars){
            res.send(bars)
        }
    }

    function failureCallback(req, err) {
        res.status(500).send({
            error: 'Internal Server Error: ' + err
        })
    }
})

router.post('/api/goingBar', loggedIn, function (req, res){
    const barId = req.body.barId
    Account.findById(req.user._id, function (err, user){
        if (err) {
            res.status(500).send(err)
        }

        const findBarId = user.places.indexOf(barId)
        if (findBarId === -1){
            user.places.push(barId)
            Bar.findOneAndUpdate({ id: barId }, { $inc: { going: 1 }}, function(err, bar){
                res.send({id: bar.id, going: ++bar.going})
            })
        } else {
            user.places.splice(findBarId, 1)
            Bar.findOneAndUpdate({ id: barId }, { $inc: { going: -1 }}, function(err, bar){
                res.send({id: bar.id, going: --bar.going})
            })
        }
        user.save()
    })
})

router.post('/api/register', function (req, res) {
    Account.register(new Account({
        username: req.body.username
    }), req.body.password, function (err, account) {
        if (err) {
            return res.status(500).send({
                error: err.message
            });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send({
                    user: {
                        username: req.user.username
                    }
                });
            });
        });
    });
});

router.get('/api/login', function (req, res) {
    res.send({
        user: {
            username: req.user.username
        }
    });
});

router.post('/api/login', function (req, res) {
    const {
        username,
        password
    } = req.body

    if (username === undefined || username.length === 0 || password === undefined || password.length === 0) {
        res.status(401).send({
            error: "Login or password field is empty"
        })
        return;
    }
    
    var authenticate = Account.authenticate();
    authenticate(username, password, function (err, user, message) {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        }
        if (!message) {
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.send({
                    user: {
                        username: req.user.username
                    }
                });          
            });
        } else {
            res.status(403).send({
                error: message.message
            })
        }
    });
});

router.get('/api/logout', function (req, res) {
    req.logout();
    res.send({
        status: "Logout success"
    })
});

module.exports = router;