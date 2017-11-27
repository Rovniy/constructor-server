/**
 * Created by Ravy on 09.09.2017.
 */
let userAPI = function(app) {

    app.get("/user", function(req, res) {
        res.send("USER API OK");
    });
    
    app.get("/registration", function(req, res) {
        if (!req.query.username || req.query.password) {
            return res.send({"status": false, "message": "missing username or password"});
        } else {
            res.send("USER REG OK");
        }
    });
};

module.exports = userAPI;