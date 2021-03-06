/**
  * Module Dependecies
  */

var express = require('express');
var http = require('http');
var neo4j = require('neo4j');
var path = require('path');
var d3 = require("d3");

// Config

var app = express();
var server = http.createServer(app);
var port = 3010;
// Log use to console
app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'controller')));
app.use(express.static(path.join(__dirname, 'model')));


// Connect to the Neo4j DB
//var db = new neo4j.GraphDatabase('http://localhost:7474');




app.get('/', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"})
    res.send("Hello World!");
}); 







server.listen(port);
console.log('Express server started on port %s', server.address().port);
