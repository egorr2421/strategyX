'use strict';

const ResponseStatus = require('./response/ResponseStatus');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var onlineUsers = require('./data/onlineUsersData');

setInterval(()=>{
    for(var key in onlineUsers.getAllUsers){
        if(onlineUsers.getUser(key).date - new Date().getTime() < - 1000*10){
            onlineUsers.deleteUser(key);
        }
    }
},5000);

router.get('/',function (req,resp) {
    onlineUsers.upDate(req.cookies.session_id);

    resp.send(onlineUsers.getAllUsers);
});

module.exports = router;