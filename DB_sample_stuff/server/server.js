'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000, host: '0.0.0.0'});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		console.log('Server processing a / request');
		reply('Hello, world!');
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function( request, reply) {
		console.log('Server processing /name request');
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at: ${server.info.uri}');
});

/*const mysql = require('mysql');

let con = mysql.createConnection({
    host: "sql",
    user: "-u",
    password: "example"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

  server.route({
    method: 'POST',
    path: '/{pName}',
    handler: function (request, h) {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Result: " + result);
            });
        });
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});*/