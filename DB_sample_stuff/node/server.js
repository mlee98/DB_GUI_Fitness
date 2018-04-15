'use strict';

const Hapi = require('hapi');
const async = require('async');


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
    database: 'DB_GUI',
    multipleStatements: true
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
    path: '/accounts/addUser',
    handler: function (request, reply) {
        let fName = request.payload['fName'];
        let lName = request.payload['lName'];
        let Height = request.payload['Height'];
        let Weight = request.payload['Weight'];
        let Age = request.payload['Age'];
        let UserName = request.payload['UserName'];

        let query = 'INSERT INTO UserInfo (UserId, fName, lName, Height, Weight, Age, UserName)';
        query += " VALUES (default, \'" + fName + "\', \'" + lName + "\', \'" + Height + "\', \'" + Weight + "\', \'" + Age + "\',\'" + UserName + "\')";
        connection.query(query, function (error, results, fields) {
            if (error)
                throw error;
            reply("User info added: " + query);
        });
    }
});

//Real Queries
server.route({
    method: 'GET',
    path: '/accounts',
    handler: function (request, reply) {
        connection.query('SELECT * FROM UserInfo', function (error, results, fields) {
            if (error)
                throw error;
            let accNames = '';
            for (let acc = 0; acc < results.length; acc++) {
                accNames += results[acc].UserId;
                accNames += ' ';
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

server.route({
    method: 'POST',
    path: '/accounts/addAllergy',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Name = request.payload['Name'];
        let Share = request.payload['Share'];
        let query = 'INSERT INTO Account_Allergies (AllergyID, UserId, Name, Share)';
        query += " VALUES (default ,\'" + UserId + "\', \'" + Name + "\', \'" + Share + "\')";
        connection.query(query, function (error, results, fields) {
            if (error)
                throw error;
            reply("Allergy added: " + query);
        });
    }
});

server.route({
    method: 'POST',
    path: '/accounts/addSleepDisorder',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Name = request.payload['Name'];
        let Share = request.payload['Share'];
        let query = 'INSERT INTO Account_Sleep (SleepID, UserId, Name, Share)';
        query += " VALUES (default ,\'" + UserId + "\', \'" + Name + "\', \'" + Share + "\')";
        connection.query(query, function (error, results, fields) {
            if (error)
                throw error;
            reply("Sleep Disorder added: " + query);
        });
    }
});

server.route({
    method: 'POST',
    path: '/accounts/addEatDisorder',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Name = request.payload['Name'];
        let Share = request.payload['Share'];
        let query = 'INSERT INTO Account_Disorders (DisorderID, UserId, Name, Share)';
        query += " VALUES (default ,\'" + UserId + "\', \'" + Name + "\', \'" + Share + "\')";
        connection.query(query, function (error, results, fields) {
            if (error)
                throw error;
            reply("Eating Disorder added: " + query);
        });
    }
});

server.route({
    method: 'POST',
    path: '/accounts/removeUser',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let deleteAccount = 'DELETE FROM UserInfo WHERE UserId = ' + UserId + ';';
        let deleteDisorders = 'DELETE FROM Account_Disorders WHERE UserId = ' + UserId + ';';
        let deleteAllergies = 'DELETE FROM Account_Allergies WHERE UserId = ' + UserId + ';';
        let deleteSleep = 'DELETE FROM Account_Sleep WHERE UserId = ' + UserId + ';';
        connection.query(deleteAccount + deleteDisorders + deleteAllergies + deleteSleep, function (error, results, fields) {
            if (error)
                throw error;
            reply('User Deleted');
        });
    }
});

server.route({
    method: 'POST',
    path: '/accounts/findSimilarUsers',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let commonCategory = request.payload['commonCategory'];
        let condition = request.payload['condition'];
        let table = '';
        if (commonCategory == 'Allergy') {
            table = 'Account_Allergies';
        }
        else {
            if (commonCategory == 'sDisorder') {
                table = 'Account_Sleep';
            } else {
                if (commonCategory == 'eDisorder') {
                    table = 'Account_Disorders';
                }
            }
        }
        let query = 'SELECT UserName FROM ' + table + ' NATURAL JOIN UserInfo WHERE Name = "' + condition + '" AND UserId != ' + UserId + ' AND Share = 1';
        connection.query(query, function (error, users, fields) {
            if (error)
                throw error;
            let usernames = '';
            for (let i = 0; i < users.length; i++) {
                usernames += (' ' + users[i].UserName);
            }
            reply(usernames);
        });
        
    }
});

server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
        
        let query2 = 'SELECT * FROM Account_Allergies NATURAL JOIN UserInfo WHERE Name = "Citrus" AND UserId != 15';
        connection.query(query2, function (error, users, fields) {
            if (error)
                throw error;
            reply(users);
        });
    }
});


server.route({
    method: 'GET',
    path: '/accounts/allergies',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Account_Allergies', function (error, results, fields) {
            if (error)
                throw error;

            reply(results);
        });
        //close the connection to MySQL
    }
});

server.route({
    method: 'GET',
    path: '/accounts/eatDisorders',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Account_Disorders', function (error, results, fields) {
            if (error)
                throw error;

            reply(results);
        });
        //close the connection to MySQL
    }
});

server.route({
    method: 'GET',
    path: '/accounts/sleepDisorders',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Account_Sleep', function (error, results, fields) {
            if (error)
                throw error;

            reply(results);
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
