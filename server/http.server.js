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
        bodyParser = require("body-parser"),
        app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require(config.routesPath + 'all.js')(app);
    require(config.routesPath + 'user.js')(app);

    var server = app.listen(3000, function () {
        console.log('HTTP-SERVER: server activated. Address: http://'+config.locate+':'+config.port);
    });
})()
