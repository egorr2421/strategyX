'use strict';

const User = require('../model/User');
const Op = require('sequelize').Op;

const findAll = User.findAll;
const findById = User.findById;
const findByEmailOrLogin = (value) => User.findOne({
    where: {
        [Op.or]: [{email: value.toLowerCase()}, {login: value.toLowerCase()}]
    }
});
const findByEmailAndLogin = (email,login) => User.findOne({
    where: {
        [Op.or]: [{email: email.toLowerCase()}, {login: login.toLowerCase()}]
    }
});
const findBySessionId = (value) => User.findOne({
    where: {
        sessionId:value
    }
});
const insert = (login, password, avatar, email) =>
    User.build({login: login, password: password, avatar: avatar, email: email})
        .save();



module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByEmailOrLogin = findByEmailOrLogin;
module.exports.insert = insert;
module.exports.findBySessionId = findBySessionId;
module.exports.findByEmailAndLogin = findByEmailAndLogin;