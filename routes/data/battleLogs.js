var addBattle = function (id, userFirst, userSecond) {
    userFirst.ready = false;
    userSecond.ready = false;
    battle = {
        userFirst: userFirst,
        userSecond: userSecond,
        id:id,
        battleField:null
    };
    battleLogs[id] = battle;
};

var addBattleField = function (id,mas) {
    console.log(getBattle(id).battleField);
    if(getBattle(id).battleField ===null){
        getBattle(id).battleField = mas;
    console.log(getBattle(id).battleField);
    }else{
        for (let i = 0; i < getBattle(id).battleField.length; i++) {
            for (let y = 0; y < getBattle(id).battleField[i].length; y++) {
                if (getBattle(id).battleField[i][y] === 0) {
                    getBattle(id).battleField[i][y] = mas[i][y];
                }
            }
        }
    }
};

var nextBattleField = function (id,mas) {
    getBattle(id).battleField = mas;
};

var getBattle = function (id) {
    return battleLogs[id];
};

var battleLogs = {};

module.exports.addBattle = addBattle;
module.exports.getBattle = getBattle;
module.exports.battleLogs = battleLogs;
module.exports.addBattleField = addBattleField;
module.exports.nextBattleField = nextBattleField;