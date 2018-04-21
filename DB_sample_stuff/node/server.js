'use strict';
// var routes = require('./routes');

const Hapi = require('hapi');
const crypto = require('crypto');
const hapiAuthJWT = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');  // used to sign our content
const port = process.env.PORT || 8000; // allow port to be set
const Joi = require('joi');
const mysql = require('mysql');
const secret = 'professorfontenotissometimescoolandsometimesnot';

var connection = mysql.createPool({
    //host will be the name of the service from the docker-compose file. 
    host: 'mysql',
    user: 'root',
    password: 'go_away!',
    database: 'DB_GUI',
    multipleStatements: true,
});

await connection.connect();



function getToken(username, password) {
    const person = {
        Username: username,
        Password: password
    };

    const newtoken = JWT.sign(person, secret);
    const url = "/path?token=" + newtoken;
    console.log('token:' + newtoken);
    return newtoken;
}

const validate = async function getValidatedUser(decoded, request, h) {
    var sql = 'SELECT ua.Password FROM UserAuth ua where ua.Username = "' + decoded.Username + '"';
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;

            console.log(results);
            console.log(results[0]);
            console.log(results[0].Password);

            if (results[0].Password != decoded.Password) {
                resolve({ isValid: false });
            }
            else {
                resolve({ isValid: true });
            }
        });
    });
};

const init = async () => {
    var usertoken = "";

    const server = new Hapi.Server({ port: 3000, host: '0.0.0.0', routes: { cors: true } });
    await server.register(hapiAuthJWT);

    server.auth.strategy('jwt', 'jwt',
        {
            key: secret,
            validate: validate,
            verifyOptions: { ignoreExpiration: true }
        }
    );

    server.auth.default('jwt');

    server.state('data', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: false, // remove invalid cookies
        strictHeader: true // don't allow violations of RFC 6265
    });

    server.route([
        {
            method: "GET", path: "/", config: { auth: false },
            handler: function (request, reply) {
                reply('Token not required');
            }
        },
        {
            method: 'POST', path: '/accounts/addUser', config: { auth: 'jwt' },
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

                    connection.release();//release the connection
                });

            }
        },
        {
            method: 'POST', path: '/signIn', config: { auth: 'jwt' },
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

                        // sends JWT to client side
                        var token = getToken(UserName, Password);
                        reply(token);
                    });

                    connection.release();//release the connection
                });

            }
        },
        {
            method: 'GET', path: '/accounts', config: { auth: 'jwt' },
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
        },
        {
            method: 'GET', path: '/accounts/profile', config: { auth: 'jwt' },
            handler: function (request, reply) {
                let UserId = request.payload['UserId'];
                connection.getConnection(function (err, connection) {
                    //run the query
                    connection.query('SELECT * FROM UserInfo WHERE UserId = ' + UserId, function (error, results, fields) {
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
                            accNames += results[acc].Height;
                            accNames += ' ';
                            accNames += results[acc].Weight;
                            accNames += ' ';
                            accNames += results[acc].Age;
                            accNames += '   ';
                        }
                        reply(accNames);

                    });

                    connection.release();//release the connection
                });

            }
        },
        {
            method: 'GET', path: '/accounts/loginInfo', config: { auth: 'jwt' },
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

                    connection.release();//release the connection
                });
            }
        },
        {
            method: 'POST', path: '/accounts/addAllergy', config: { auth: 'jwt' },
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
        },
        {
            method: 'POST', path: '/accounts/addDisorder', config: { auth: 'jwt' },
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
        },
        {
            method: 'POST', path: '/accounts/removeUser', config: { auth: 'jwt' },
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
        },
        {
            method: 'POST', path: '/accounts/findSimilarUsers', config: { auth: 'jwt' },
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
        },
        {
            method: 'GET', path: '/accounts/allergies', config: { auth: 'jwt' },
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
        },
        {
            method: 'GET', path: '/accounts/eatDisorders', config: { auth: 'jwt' },
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
        },
        {
            method: 'GET', path: '/ideal', config: { auth: 'jwt' },
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
        }
    ]);

    await server.start();
    return server;
};

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});
