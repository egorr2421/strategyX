'use strict';

const UserRepository = require('../repository/UsersRepository');
const ResponseStatus = require('./response/ResponseStatus');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var onlineUsers = require('./data/onlineUsersData');


router.get('/', function (req, res, next) {
    UserRepository.findBySessionId(req.cookies.session_id)
        .then(value => {
            if (value === null) {
                res.redirect('/login');
                return null;
            }
            if (req.cookies.session_id === value.dataValues.sessionId) {
                onlineUsers.addUserToOnline(value.dataValues);
                // console.log(onlineUsers.getAllUsers);
                // console.log(onlineUsers.getUser(value.dataValues.sessionId));
                res.render('main/index.ejs', {title: "Main"});
            } else {
                res.redirect('/login');
            }
        });
});

router.get('/login', function (req, res, next) {
    res.clearCookie('session_id');
    res.render('login/index.ejs', {title: "login"});

});

router.post('/login', function (req, res, next) {
    const user = UserRepository.findByEmailOrLogin(req.body.login)
        .then((user) => {
            if (user === null) {
                res.redirect('/login');
            } else {
                if (user.dataValues.password !== req.body.pass) {
                    res.status(ResponseStatus.UNATHORIZED);
                    //TODO: res.render(error)
                } else {
                    createCookie(res, user.dataValues.sessionId);
                    res.redirect('/');
                    // redirect
                }
                //res.render('login/index.ejs', {title: "login"});
            }
        });
});

router.get('/register', function (req, res, next) {
    res.clearCookie('session_id');
    res.render('register/index.ejs', {title: "register"});
});

router.post('/register', function (req, res, next) {
    console.log(req.body);
    if (req.body.logic === '' || req.body.pass === '' || req.body.email === '') {
        res.redirect('/register');
        return null;
    }
    UserRepository.findByEmailAndLogin(req.body.email
        , req.body.login).then(value => {
        if (value == null) {
            const sessionId = UserRepository.insert(req.body.login.toLowerCase(),
                req.body.pass, req.body.file || "", req.body.email.toLowerCase())
                .then((user) => {
                    createCookie(res, user.sessionId);
                    res.redirect('/');
                }).catch((error) => {
                        console.error(error);
                    }
                );
            //res.status(ResponseStatus.CREATED);
        } else {
            res.render('register/index.ejs', {title: "register"});
            res.status(ResponseStatus.ERROR);
        }
        //redirect

    }).catch(error => console.error(error));
});


router.post('/fight', function (req, res, next) {
    console.log(JSON.parse(req.body.battle));
    createCookie(res,req.body.battle,'battle');
    UserRepository.findBySessionId(req.cookies.session_id)
        .then(value => {
            if (value === null) {
                res.redirect('/login');
                return null;
            }
            if (req.cookies.session_id === value.dataValues.sessionId) {
                res.render('fight/index.ejs', {title: "Fight"});
            } else {
                res.redirect('/login');
            }
        });
});



const createCookie = (res, sessionId,name = 'session_id') => {
    res.cookie(name, sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: false,
        // signed: true
    });
};

module.exports = router;
