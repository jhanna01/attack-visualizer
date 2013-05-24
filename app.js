// Set up express and create a server.
var express = require('express');
var http = require('http');
var neo4j = require('neo4j');
var path = require('path');

var app = express();
var server = http.createServer(app);
var port = 3000;

var d3 = require("d3");

// Connect to the Neo4j DB
var db = new neo4j.GraphDatabase('http://localhost:7474');

// Log use to console
app.use(express.logger());

app.get('/', function(req, res) {
    res.send("Hello World!");
}); 


app.use(express.static(path.join(__dirname, 'public')));




server.listen(port);
console.log('Express server started on port %s', server.address().port);
