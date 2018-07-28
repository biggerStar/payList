const db = require('../storage/db')
var balance = {};

module.exports = {
    getList: getList,
}

function getList(request, response) {
   return db.getPaylist().then(
        (paylists) => balance.paylists = paylists
    ).then(function(){
        db.getIncomelist().then(
            incomelists => {
                balance.incomelists = incomelists;
                response.json(balance)
            }
        )
    }
    );
}

