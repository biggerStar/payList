const db = require('../storage/db')
module.exports = {
    getList: getList,
    update: update,
    submit: submit,
    remove: remove
}

function getList(request, response) {
    return db.getFinanceList().then(
        (lists) => {
            response.json({"data":lists,"size":lists.length});
        }
    );
}
function update(request, response) {
    if(!request || !request.body || !request.body._id || typeof(request.body.money) != 'number' || request.body.money <= 0 ||!(request.body.userName =="dong" || request.body.userName == "jing")) {
        return response.json({"status":"error data"})
    }
    var list = {
        "comment": request.body.comment,
        "financeName": request.body.financeName,
        "userName": request.body.userName,
        "money": request.body.money,
        "type": request.body.type,
        "startTime": request.body.startTime,
        "endTime": request.body.endTime,
        "gain": request.body.gain,
        "bank": request.body.bank
    };
    db.updateFinancelist(request.body._id, list).then(
        (result) => {
            if (result) 
            {
                response.json({"status":"ok"})
            }

        }
    ) 
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
        "startTime": request.body.startTime,
        "endTime": request.body.endTime,
        "gain": request.body.gain,
        "bank": request.body.bank
    };
    db.insertFinancelist(list).then(
        response.json({"status":"ok"})
    )
}

function remove(request, response) {
    if(!request || !request.query ) {
        return response.json({"status":"error data"})
    }
    db.removeFinanceList(request.query._id).then(
        response.json({"status":"ok"})
    )
}