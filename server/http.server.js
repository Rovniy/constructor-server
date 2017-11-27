/**
 * Created by Ravy on 09.09.2017.
 */
let config = require("./config.json");
let express = require("express");
let subDomain = require('express-subdomain');
let bodyParser = require("body-parser");
let app = express();
let router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(subDomain('api', router));


require(config.routesPath + 'all.js')(app);
require(config.routesPath + 'user.js')(app);

app.listen(3000, function () {
    console.log('HTTP-SERVER: Server activated. API address: http://api.'+config.locate+':'+config.port);
});
