var MongoClient = require("mongodb").MongoClient;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

MongoClient.connect("mongodb://localhost/bataille-navale", function(error, db) {
    if (error) return funcCallback(error);

    io.on('connection', function(socket){
        var id = socket.id;

        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user ' + id + ' disconnected');
        });

        socket.on('init', function(msg){
            for (var i = 0; i < req.length; i++) {
                var boat = msg[i];
                boat.append({'client': id});
                db.collection('boat').insert(boat);
            }
        });

        socket.on('tir', function(msg){
            var x = msg[x];
            var y = msg[y];

            if (db.collection("boat").findOne({x: x, y: y})) {
                db.collection("boat").update(
                    {x: x, y: y},
                    {x: x, y: y, hit: 1}
                );
            }

            socket.broadcast.emit({x: x, y: y, hit: 1});
        });
    });
});
