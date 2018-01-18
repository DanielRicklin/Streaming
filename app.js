var fs = require('fs');
var express = require("express");
var app = new express();
var port = process.env.PORT || 8888;

var server = require('http').createServer(app);
console.log("Start HTTP");

var io = require("socket.io")(server);


var Log = require("log"),
	log = new Log("debug");


app.use(express.static( __dirname + "/public" ));

app.get("/", function(req, res) {
	res.redirect("index.html");
});

server.listen(port, function() {
	log.info("Listening port %s", port);
});

io.on("connection", function(socket) {
	log.info("New client");
	socket.on("stream", function(img) {
        socket.emit("streamRetour", img); //broadcast
	});
});