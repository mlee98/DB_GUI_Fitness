'use strict';

const Hapi = require('hapi');
const crypto = require('crypto');


const server = new Hapi.Server();
server.connection({
    port: 3000, host: '0.0.0.0',
    routes: {
        cors: true
    }
});

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql      = require('mysql');
var connection = mysql.createPool({
    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'go_away!',
    database: 'DB_GUI',
    multipleStatements: true,
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
        let Disability = request.payload['Disability'];
        let Password = request.payload['Password'];

        let hashedPW = crypto.createHash('md5').update(Password).digest("hex");
        
        let getUserId = "SELECT UserId FROM UserInfo WHERE UserName = \'" + UserName + "\'";

        let uInfoTable = 'INSERT INTO UserInfo (UserId, fName, lName, Height, Weight, Age, UserName, Disability)';
        uInfoTable += " VALUES (default, \'" + fName + "\', \'" + lName + "\', \'" + Height + "\', \'" + Weight + "\', \'" + Age + "\',\'" + UserName + "\'," + Disability + ")";

        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(uInfoTable, function (error, r1, fields) {
                if (error)
                    throw error;
                connection.query(getUserId, function (error, r2, fields) {
                    if (error)
                        throw error;
                    let userID = r2[0].UserId;
                    let loginTable = "INSERT INTO Login (UserId, UserName, Password) VALUES(" + userID + ", \'" + UserName + "\', \'" + hashedPW + "\')";
                    connection.query(loginTable, function (error, r3, fields) {
                        if (error)
                            throw error;
                        
                        reply(userID);
                    });
                });
            });

            connection.release();
        });
        
        
    }
});

server.route({
    method: 'POST',
    path: '/signIn',
    handler: function (request, reply) {
        let UserName = request.payload['username'];
        let Password = request.payload['password'];
        let hashedPW = crypto.createHash('md5').update(Password).digest("hex");

        let query = "SELECT * FROM Login";
        let loginMessage = {};
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(query, function (error, results, fields) {
                if (error)
                    throw error;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].UserName === UserName && results[i].Password === hashedPW) {
                        loginMessage.id = 5;
                        break;
                    }
                    loginMessage.id = -1;
                }

                reply(loginMessage);
            });

            connection.release();//release the connection
        });
        
    }
});

//Real Queries
server.route({
    method: 'GET',
    path: '/accounts',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
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
            connection.release();//release the connection
        });
    }
});

server.route({
    method: 'GET',
    path: '/accounts/loginInfo',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Login', function (error, results, fields) {
                if (error)
                    throw error;
                let accNames = '';
                for (let acc = 0; acc < results.length; acc++) {
                    accNames += results[acc].UserId;
                    accNames += ' ';
                    accNames += results[acc].UserName;
                    accNames += ' ';
                    accNames += results[acc].Password;
                    accNames += '   ';
                }
                reply(accNames);

            });

            connection.release();
        });
        
       
    }
});

server.route({
    method: 'POST',
    path: '/accounts/addAllergy',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Name = request.payload['Name'];
        let Share = request.payload['Share'];
        let query = 'INSERT INTO Account_Allergies (AllergyId, UserId, Name, Share)';
        query += " VALUES (default ,\'" + UserId + "\', \'" + Name + "\', \'" + Share + "\')";
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(query, function (error, results, fields) {
                if (error)
                    throw error;
                reply("Allergy added: " + query);
            });

            connection.release();//release the connection
        });
        
    }
});



server.route({
    method: 'POST',
    path: '/accounts/addDisorder',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Name = request.payload['Name'];
        let Share = request.payload['Share'];
        let query = 'INSERT INTO Account_Disorders (DisorderId, UserId, Name, Share)';
        query += " VALUES (default ,\'" + UserId + "\', \'" + Name + "\', \'" + Share + "\')";
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(query, function (error, results, fields) {
                if (error)
                    throw error;
                reply("Eating Disorder added: " + query);
            });

            connection.release();//release the connection
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
        let deleteLogin = 'DELETE FROM Login WHERE UserId = ' + UserId;
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(deleteAccount + deleteDisorders + deleteAllergies + deleteLogin, function (error, results, fields) {
                if (error)
                    throw error;
                reply('User Deleted');
            });

            connection.release();//release the connection
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
            if (commonCategory == 'eDisorder') {
                table = 'Account_Disorders';
            } 
        }
        let query = 'SELECT UserName FROM ' + table + ' NATURAL JOIN UserInfo WHERE Name = "' + condition + '" AND UserId != ' + UserId + ' AND Share = 1';
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(query, function (error, users, fields) {
                if (error)
                    throw error;
                let usernames = '';
                for (let i = 0; i < users.length; i++) {
                    usernames += (' ' + users[i].UserName);
                }
                reply(usernames);
            });

            connection.release();//release the connection
        });
        
        
    }
});



server.route({
    method: 'GET',
    path: '/accounts/allergies',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Account_Allergies', function (error, results, fields) {
                if (error)
                    throw error;

                reply(results);
            });

            connection.release();//release the connection
        });
        
    }
});

server.route({
    method: 'GET',
    path: '/accounts/eatDisorders',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Account_Disorders', function (error, results, fields) {
                if (error)
                    throw error;

                reply(results);
            });

            connection.release();//release the connection
        });
        
        //close the connection to MySQL
    }
});



//Real Queries
server.route({
    method: 'GET',
    path: '/ideal',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Ideal_body', function (error, results, fields) {
                if (error)
                    throw error;

                reply(results);
            });
            connection.release();//release the connection
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});


