var addUserToOnline = function (user) {
    user.date = new Date().getTime();
    onlineUsersData[user.sessionId] = user;
};
var getUser = function (sessionId) {
    return onlineUsersData[sessionId];
};

var deleteUser = function (sessionId) {
    delete onlineUsersData[sessionId];
};

var upDate = function (sessionId) {
    if(sessionId in onlineUsersData)
    onlineUsersData[sessionId].date = new Date().getTime();
};

var onlineUsersData = {};

module.exports.getUser = getUser;
module.exports.upDate = upDate;
module.exports.deleteUser = deleteUser;
module.exports.getAllUsers = onlineUsersData;
module.exports.addUserToOnline = addUserToOnline;