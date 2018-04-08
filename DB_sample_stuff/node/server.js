'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql      = require('mysql');
var connection = mysql.createConnection({

    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'go_away!',
    database : 'DB_GUI'
});

connection.connect();


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world!');
    }
});

//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getData',
    handler: function (request, reply) {
        console.log('Server processing a /getData request');

        //Creates the connection
        connection.connect();

        //Does a simple select, not from a table, but essentially just uses MySQL
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply ('The solution is ' + results[0].solution);

            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            var solution = results[0].solution;
            console.log('The solution is: ', solution);
        });
        //close the connection to MySQL
        connection.end();
    }
});

server.route({
    method: 'POST',
    path: '/user',
    handler: function (request, reply) {
        reply('User Added: ' + request.payload['lName'] + ', '
            + request.payload['fName']);
    }
});


server.route({
    method: 'POST',
    path: '/addUser',
    handler: function (request, reply) {
        let userid = request.payload[userid];
        let fName = request.payload[fName];
        let lName = request.payload[lName];
        let Height = request.payload[Height];
        let Weight = request.payload[Weight];
        let age = request.payload[age];

        let query = 'INSERT INTO `DB_GUI`.`User_info` (`userid`, `fName`, `lName`, `Height`, `Weight`, `Age`)';
        query += (' VALUES (' + userid + ',"' + fName + '","' + lName + '",' + Height + ',' + Weight + ',' + age + ');');
        connection.query(query, function (error, results, fields) {
            if (error)
                throw error;
            reply(query);
        });
    }
});

//Real Queries
server.route({
    method: 'GET',
    path: '/accounts',
    handler: function (request, reply) {
        connection.query('SELECT * FROM User_info', function (error, results, fields) {
            if (error)
                throw error;
            let accNames = '';
            for (let acc = 0; acc < results.length; acc++) {
                accNames += results[acc].fName;
                accNames += ' ';
                accNames += results[acc].lName;
                accNames += ' ';
                accNames += results[acc].Age;
                accNames += '   ';   
            }
            reply(accNames);

        });
        //close the connection to MySQL
    }
});

//Real Queries
server.route({
    method: 'GET',
    path: '/ideal',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Ideal_body', function (error, results, fields) {
            if (error)
                throw error;
            
            reply(results);
        });
        //close the connection to MySQL
    }
});

server.route({
    method: 'GET',
    path: '/sleep/insomnia',
    handler: function (request, reply) {
        connection.query('SELECT description FROM Sleep WHERE name = "insomnia"', function (error, results, fields) {
            if (error)
                throw error;

            reply(results);
        });
        //close the connection to MySQL
    }
});

server.route({
    method: 'GET',
    path: '/sleep',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Sleep', function (error, results, fields) {
            if (error)
                throw error;

            reply(results);
        });
        //close the connection to MySQL
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
