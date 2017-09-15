/**
 * Created by Ravy on 09.09.2017.
 */
(function(){
    var config = {
            locate: 'localhost',
            port: 3000,
            routesPath: './../routes/'
        },
        express = require("express"),
        subdomain = require('express-subdomain'),
        bodyParser = require("body-parser"),
        app = express(),
        router = express.Router();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(subdomain('api', router));


    require(config.routesPath + 'all.js')(app);
    require(config.routesPath + 'user.js')(app);

    var server = app.listen(3000, function () {
        console.log('HTTP-SERVER: Server activated. API address: http://api.'+config.locate+':'+config.port);
    });
})();
