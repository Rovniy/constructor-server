/**
 * Created by Ravy on 09.09.2017.
 */
let appRouter = function(app) {

    app.get("/", function(req, res) {
        res.send("XPLOIT REST API v1");
    });

    /*app.get("/account", function(req, res) {
        var accountMock = {
            "username": "nraboy",
            "password": "1234",
            "twitter": "@nraboy"
        }
        if(!req.query.user) {
            return res.send({"status": "error", "message": "missing username"});
        } else if(req.query.user != accountMock.username) {
            return res.send({"status": "error", "message": "wrong username"});
        } else {
            return res.send(accountMock);
        }
    });

    app.post("/account", function(req, res) {
        if(!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({"status": "error", "message": "missing a parameter"});
        } else {
            return res.send(req.body);
        }
    });*/

};

module.exports = appRouter;