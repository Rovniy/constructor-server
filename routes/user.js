/**
 * Created by Ravy on 09.09.2017.
 */
var userAPI = function(app) {

    app.get("/user", function(req, res) {
        res.send("USER API OK");
    });
    
    app.get("/registration", function(req, res) {
        if (!req.query.username || req.query.password) {
            return res.send({"status": false, "message": "missing username or username"});
        } else {
            res.send("USER API OK");
        }

        
        
    });
    
};

module.exports = userAPI;