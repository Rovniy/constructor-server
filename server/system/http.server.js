/**
 * Created by Ravy on 17.03.2017.
 */
'use strict';
var http = require('http');
var Static = require('node-static');

/**
 * обычный сервер (статика) на порту 8080
 * @type {*|Server}
 */
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(8080);

console.log("HTTP.SERVER: server started on 8080, 8081 port");

