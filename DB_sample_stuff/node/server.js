'use strict';

const Hapi = require('hapi');
const crypto = require('crypto');
const jwtplugin = require('hapi-auth-jwt2');
const aguid = require('aguid');
//var redisClient = require('redis-connection')();
//const hapiredis = require('hapi-redis-connection');
const JWT = require('jsonwebtoken');
const secret = 'professorfontenotissometimescoolandsometimesnot';

/*
redisClient.set('redis', 'working');
redisClient.get('redis', function(rediserror, reply) {
    if (rediserror) {
        console.log(rediserror);
    }
    console.log('redis is ' + reply.toString());
})
*/

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql = require('mysql');
var connection = mysql.createPool({
    //host will be the name of the service from the docker-compose file. 
    host: 'mysql',
    user: 'root',
    password: 'go_away!',
    database: 'DB_GUI',
    multipleStatements: true,
});

const cookie_options = {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: true,      // warm & fuzzy feelings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true   // don't allow violations of RFC 6265
}

function getToken(username, password) {
    const person = {
        Username: username,
        Password: password
    };

    const newtoken = JWT.sign(person, secret);
    return newtoken;
}

const validate = function (decoded, request, callback) {
    let query = "SELECT SessionId FROM Sessions WHERE Username = \'" + decoded.Username + "\' AND Password = \'" + decoded.Password + "\'";

    connection.query(query, function (error, results, fields) {
        if (error)
            throw error;

        console.log(results);

        if (results[0].SessionId != null) {
            console.log("returned true");
            return callback(null, true);
        }
        else {
            console.log("returned false");
            return callback(null, false);
        }
    });
};

const server = new Hapi.Server();
server.connection({
    port: 3000, host: '0.0.0.0',
    routes: {
        cors: true
    }
});

var promise = new Promise(function (resolve, reject) {
    server.register(jwtplugin);
    resolve();
}).then(getAuthStrategy)
    .then(serverStart)
    .then(getRoutes);

function getAuthStrategy() {
    return new Promise(function (resolve, reject) {
        server.auth.strategy('jwt', 'jwt', {
            key: 'professorfontenotissometimescoolandsometimesnot',
            validateFunc: validate
        });

        server.auth.default('jwt');
        resolve();
    });
}

function serverStart() {
    return new Promise(function (resolve, reject) {
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
            resolve();
        });
    });
}

function getRoutes() {
    server.route({
        method: 'POST',
        path: '/createAccount',
        config: { auth: false },
        handler: function (request, reply) {
            let fName = request.payload['fName'];
            let lName = request.payload['lName'];
            let Height = request.payload['height'];
            let Weight = request.payload['weight'];
            let Age = request.payload['age'];
            let UserName = request.payload['username'];
            let Disability = request.payload['disabilities'];
            let Password = request.payload['password'];
            let Goal = request.payload['goal'];
            let Public = request.payload['public'];

            let hashedPW = crypto.createHash('md5').update(Password).digest("hex");

            let getUserId = "SELECT UserId FROM UserInfo WHERE UserName = \'" + UserName + "\'";

            let uInfoTable = 'INSERT INTO UserInfo (UserId, fName, lName, Height, Weight, Age, UserName, Public)';
            uInfoTable += " VALUES (default, \'" + fName + "\', \'" + lName + "\', \'" + Height + "\', \'" + Weight + "\', \'" + Age + "\',\'" + UserName + "\'," + Public + ")";

            connection.getConnection(function (err, connection) {
                //run the query
                connection.query(uInfoTable, function (error, r1, fields) {
                    if (error)
                        throw error;
                    connection.query(getUserId, function (error, r2, fields) {
                        if (error)
                            throw error;
                        connection.query(getUserId, function (error, r2, fields) {
                            if (error)
                                throw error;
                            let target = 100;
                            if (Goal === "Gain Weight") {
                                Goal = 80;
                            } else {
                                if (Goal === "Gain Muscle") {
                                    Goal = 120;
                                }
                            }
                            let workoutTable = "INSERT INTO Fitness_Tracker (UserId, WorkoutPlan, Date, PercentToDo, Goal) VALUES(" + userID + ", default, default, " + Goal + ", " + Goal + ")";
                            connection.query(workoutTable, function (error, r3, fields) {
                                if (error)
                                    throw error;
                                reply(userID);
                            });
                        });
                    });

                    connection.release();
                });
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/signIn',
        config: { auth: false },
        handler: function (request, reply) {
            let Username = request.payload['username'];
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
                        if (results[i].Username === Username && results[i].Password === Password) {
                            loginMessage.id = results[i].UserId;
                            break;
                        }
                        loginMessage.id = -1;
                    }

                    if (loginMessage.id != -1) {
                        let SessionId = aguid();
                        let query1 = 'INSERT INTO Sessions (SessionId, Username, Password) VALUES("' + SessionId + '" ,"' + Username + '", "' + Password + '")';
                        connection.query(query1, function (error, results, fields) {
                            if (error)
                                throw error;
                            var token = getToken(Username, Password);
                            reply().header("Authorization", token);
                            //reply().header("Authorization", token)
                            //.state("token", token, cookie_options);
                            // reply(getToken(UserName, Password));
                        });
                    }
                    else {
                        reply("Login failed");
                    }
                });
                connection.release();
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/accounts/{id}/workoutToday',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                //run the query
                let UserId = encodeURIComponent(request.params.id);
                let randNum = [];
                randNum[0] = Math.floor(Math.random() * 4) + 1;
                for (let i = 1; i < 4; i++) {
                    randNum[i] = randNum[i - 1] + 4;
                }
                connection.query('SELECT * FROM Workouts WHERE WorkoutPlan = ' + randNum[0] + ' OR WorkoutPlan = ' + randNum[1] + ' OR WorkoutPlan = ' + randNum[2] + ' OR WorkoutPlan = ' + randNum[3], function (error, results, fields) {
                    if (error)
                        throw error;
                    let tempEx = [];
                    let tempReps = [];
                    for (let acc = 0; acc < results.length; acc++) {
                        tempEx[acc] = [];
                        tempReps[acc] = [];
                        tempEx[acc][0] = results[acc].Exercise1;
                        tempEx[acc][1] = results[acc].Exercise2;
                        tempEx[acc][2] = results[acc].Exercise3;
                        tempEx[acc][3] = results[acc].Exercise4;
                        tempReps[acc][0] = results[acc].Rep1;
                        tempReps[acc][1] = results[acc].Rep2;
                        tempReps[acc][2] = results[acc].Rep3;
                        tempReps[acc][3] = results[acc].Rep4;

                    }
                    connection.query('SELECT * FROM Fitness_Tracker WHERE UserId = ' + UserId, function (error, r1, fields) {
                        if (error)
                            throw error;


                        let workoutObject = [];
                        for (let i = 0; i < 4; i++) {
                            workoutObject[i] = {
                                wid: results[i].WorkoutPlan,
                                type: results[i].PrimaryArea,
                                exercises: tempEx[i],
                                reps: tempReps[i],
                                todo: r1[0].PercentToDo,
                                goal: r1[0].Goal,
                                date: r1[0].Date
                            };
                        }

                        reply(workoutObject);
                    });
                });
                connection.release();//release the connection
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/accounts/{id}/workoutToday',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            let workout = request.payload['workout'];
            connection.getConnection(function (err, connection) {
                //run the query
                let UserId = encodeURIComponent(request.params.id);
                let query = 'UPDATE Fitness_Tracker SET WorkoutPlan = ' + workout.wid + ' WHERE UserId = ' + UserId;
                connection.query(query, function (error, results, fields) {
                    if (error)
                        throw error;
                    reply(workout);
                });
                connection.release();//release the connection
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/accounts/{id}/workoutProgress',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            let workout = request.payload['workout'];
            let todo = request.payload['todo'];
            connection.getConnection(function (err, connection) {
                //run the query
                let UserId = encodeURIComponent(request.params.id);
                connection.query('INSERT INTO Completed_Workouts (workoutID, UserId, WorkoutPlan, Date) VALUES(default,' + UserId + ', ' + workout.wid + ', "' + workout.date + '")', function (error, results, fields) {
                    if (error)
                        throw error;
                    let query = 'UPDATE Fitness_Tracker SET PercentToDo = ' + todo + ', Date = "' + workout.date + '" WHERE UserId = ' + UserId;
                    connection.query(query, function (error, r1, fields) {
                        if (error)
                            throw error;
                        reply();
                    });
                });
                connection.release();//release the connection
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/workoutList',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query('SELECT * FROM Fitness_Tracker', function (error, results, fields) {
                    if (error)
                        throw error;
                    let accNames = '';
                    for (let acc = 0; acc < results.length; acc++) {
                        accNames += results[acc].UserId;
                        accNames += ' ';
                        accNames += results[acc].WorkoutPlan;
                        accNames += ' ';
                        accNames += results[acc].Date;
                    }
                    reply(accNames);
                });
                connection.release();//release the connection
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/pastWorkoutList',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query('SELECT * FROM Completed_Workouts', function (error, results, fields) {
                    if (error)
                        throw error;
                    reply(results);
                });
                connection.release();//release the connection
            });
        }
    });

    //Real Queries
    server.route({
        method: 'GET',
        path: '/accounts',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                console.log('got into accounts');
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
                    reply(accNames).header("Authorization", request.headers.authorization);
                });
                connection.release();//release the connection
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/accounts/{id}',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                let UserId = encodeURIComponent(request.params.id);
                //run the query
                connection.query('SELECT * FROM UserInfo WHERE UserId = ' + UserId, function (error, results, fields) {
                    if (error)
                        throw error;
                    let account = {};
                    account.id = results[0].UserId;
                    account.username = results[0].UserName;
                    account.password = null;
                    account.fName = results[0].fName;
                    account.lName = results[0].lName;
                    account.height = results[0].Height;
                    account.weight = results[0].Weight;
                    account.disabilities = 0;
                    account.age = results[0].Age;
                    account.public = results[0].Public;
                    reply(account);
                });
                connection.release();//release the connection
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/accounts/loginInfo',
        config: { auth: false },
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
        config: { auth: 'jwt' },
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
        config: { auth: 'jwt' },
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
            });

            connection.release();
        }
    });

    server.route({
        method: 'POST',
        path: '/accounts/removeUser',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            let UserId = request.payload['UserId'];
            let deleteAccount = 'DELETE FROM UserInfo WHERE UserId = ' + UserId + ';';
            let deleteDisorders = 'DELETE FROM Account_Disorders WHERE UserId = ' + UserId + ';';
            let deleteAllergies = 'DELETE FROM Account_Allergies WHERE UserId = ' + UserId + ';';
            let deleteLogin = 'DELETE FROM Login WHERE UserId = ' + UserId + ';';
            let deleteFitTrack = 'DELETE FROM Fitness_Tracker WHERE UserId = ' + UserId + ';';
            let deletePastFil = 'DELETE FROM Completed_Workouts WHERE UserId = ' + UserId;
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query(deleteAccount + deleteDisorders + deleteAllergies + deleteLogin + deleteFitTrack + deletePastFil, function (error, results, fields) {
                    if (error)
                        throw error;
                    reply('User Deleted');
                });

            });
        }
    });

    server.route({
        method: 'POST',
        path: '/accounts/findSimilarUsers',
        config: { auth: 'jwt' },
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
        config: { auth: false },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query('SELECT * FROM Account_Allergies', function (error, results, fields) {
                    if (error)
                        throw error;

                    reply(results);
                });

                connection.release();
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/accounts/eatDisorders',
        config: { auth: false },
        handler: function (request, reply) {
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query('SELECT * FROM Account_Disorders', function (error, results, fields) {
                    if (error)
                        throw error;

                    reply(results);
                });

                connection.release();
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/signOut',
        config: { auth: 'jwt' },
        handler: function (request, reply) {
            /*
            connection.getConnection(function (err, connection) {
                //run the query
                connection.query('SELECT * FROM Ideal_body', function (error, results, fields) {
                    if (error)
                        throw error;

                    reply(results);
                });
                connection.release();//release the connection
            });
            */

            reply(); // remove token
        }
    });

    //Real Queries
    server.route({
        method: 'GET',
        path: '/ideal',
        config: { auth: false },
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
}
