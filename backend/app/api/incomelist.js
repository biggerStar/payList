const db = require('../storage/db')
module.exports = {
    getList: getList,
    submit: submit
}

function getList(request, response) {
    return db.getIncomelist().then(
        (lists) => {
            response.json({"data":lists,"size":lists.length});
        }
    );
}

function submit(request, response) {
    if(!request || !request.body || typeof(request.body.money) != 'number' || request.body.money <= 0 ||!(request.body.userName =="dong" || request.body.userName == "jing")) {
        return response.json({"status":"error data"})
    }
    var list = {
        "comment": request.body.comment,
        "userName": request.body.userName,
        "money": request.body.money,
        "type": request.body.type,
        "time": request.body.time
    };
    db.insertIncomelist(list).then(
        response.json({"status":"ok"})
    )
}