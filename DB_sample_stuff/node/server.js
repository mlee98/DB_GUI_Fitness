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
    path: '/createAccount',
    handler: function (request, reply) {
        let fName = request.payload['fName'];
        let lName = request.payload['lName'];
        let Height = request.payload['height'];
        let Weight = request.payload['weight'];
        let Age = request.payload['age'];
        let UserName = request.payload['username'];
        let Allergies = request.payload['allergies'];
        let Password = request.payload['password'];
        let Goal = request.payload['goal'];
        let Public = request.payload['public'];
        let Gender = request.payload['gender'];

        let hashedPW = crypto.createHash('md5').update(Password).digest("hex");
        
        let getUserId = "SELECT UserId FROM UserInfo WHERE UserName = \'" + UserName + "\'";

        let uInfoTable = 'INSERT INTO UserInfo (UserId, fName, lName, Height, Weight, Age, UserName, Gender, Public)';
        uInfoTable += " VALUES (default, \'" + fName + "\', \'" + lName + "\', \'" + Height + "\', \'" + Weight + "\', \'" + Age + "\',\'" + UserName + "\',\'" + Gender + "\'," + Public + ")";

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
                        let target = 100;
                        if(Goal === "Gain Weight") {
                            Goal = 80;
                        } else {
                            if (Goal === "Gain Muscle") {
                                Goal = 120;
                            }
                        }
                        let workoutTable = "INSERT INTO Fitness_Tracker (UserId, WorkoutPlan, Date, PercentToDo, Goal) VALUES(" + userID + ", default, default, "+ Goal +", " + Goal+ ")";
                        connection.query(workoutTable, function (error, r3, fields) {
                            if (error)
                                throw error;
                            if (Allergies.length === 0) {
                                reply(userID);
                            }
                            let insertAllergies = '';
                            for (let i = 0; i < Allergies.length; i++) {
                                let allergy = Allergies[i];
                                switch(Allergies[i]) {
                                    case 'Nut Free':
                                        allergy = 'Nut-free';
                                        break;
                                    case 'Gluten Free':
                                        allergy = 'Gluten-free';
                                        break;
                                    case 'No Carbs/Keto':
                                        allergy = 'Low-Carb';
                                        break;
                                    case 'Low Fat':
                                        allergy = 'Low-Fat';
                                        break;
                                    case 'Citrus Free':
                                        allergy = 'Citrus-free';
                                        break;
                                    case 'Egg Free':
                                        allergy = 'Egg-free';
                                        break;
                                    case 'Fish Free':
                                        allergy = 'Fish-free';
                                        break;
                                    case 'High Protein':
                                        allergy = 'High-Protein';
                                        break;
                                    case 'Lactose Intolerant':
                                        allergy = 'Lactose';
                                        break;
                                    default:
                                        allergy = Allergies[i];
                                } 
                                insertAllergies += ' INSERT INTO Account_Allergies (AllergyId, UserId, Name) VALUES(default, '+ userID + ', "' + allergy + '");';
                            }
                            connection.query(insertAllergies, function (error, r4, fields) {
                                if (error)
                                    throw error;
                                let createMeal = 'INSERT INTO Meal_Tracker (UserId, Date, Breakfast, Lunch, Dinner, Snack) VALUES(' + userID + ',default,default,default,default,default)';
                                connection.query(createMeal, function (error, r5, fields) {
                                    if (error)
                                        throw error;

                                    reply(userID);
                                });
                            });
                        });
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
                        loginMessage.id = results[i].UserId;
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

server.route({
    method: 'GET',
    path: '/accounts/{id}/workoutToday',
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
                    for(let i = 0; i < 4; i++){
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
    handler: function (request, reply) {
        let workout = request.payload['workout'];
        connection.getConnection(function (err, connection) {
            //run the query
            let UserId = encodeURIComponent(request.params.id);
            let query = 'UPDATE Fitness_Tracker SET WorkoutPlan = '+workout.wid+' WHERE UserId = '+ UserId;
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
    handler: function (request, reply) {
        let workout = request.payload['workout'];
        let todo = request.payload['todo'];
        connection.getConnection(function (err, connection) {
            //run the query
            let UserId = encodeURIComponent(request.params.id);
            connection.query('INSERT INTO Completed_Workouts (workoutID, UserId, WorkoutPlan, Date) VALUES(default,' + UserId + ', ' + workout.wid + ', "' + workout.date +'")', function (error, results, fields) {
                if (error)
                    throw error;
                let query = 'UPDATE Fitness_Tracker SET PercentToDo = ' + todo + ', Date = "'+ workout.date+'" WHERE UserId = ' + UserId;
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
    path: '/accounts/{id}/pastWorkoutList',
    handler: function (request, reply) {
        connection.getConnection(function (err, connection) {
            //run the query
            let UserId = encodeURIComponent(request.params.id);
            connection.query('SELECT * FROM Completed_Workouts NATURAL JOIN Workouts WHERE UserId = ' + UserId, function (error, results, fields) {
                if (error)
                    throw error;
                let tempEx = [];
                for (let acc = 0; acc < results.length; acc++) {
                    tempEx[acc] = [];
                    tempEx[acc][0] = results[acc].Exercise1;
                    tempEx[acc][1] = results[acc].Exercise2;
                    tempEx[acc][2] = results[acc].Exercise3;
                    tempEx[acc][3] = results[acc].Exercise4;
                }
                let workoutObject = [];
                for (let i = 0; i < results.length; i++) {
                    workoutObject[i] = {
                        wid: results[i].WorkoutPlan,
                        type: results[i].PrimaryArea,
                        exercises: tempEx[i],
                        date: results[i].Date
                    };
                }
                reply(workoutObject);
            });
            connection.release();//release the connection
        });
    }
});

server.route({
    method: 'POST',
    path: '/accounts/{id}/mealToday',
    handler: function (request, reply) {
        let Date = request.payload['date'];
        connection.getConnection(function (err, connection) {
            //run the query
            let UserId = encodeURIComponent(request.params.id);
            let query = 'SELECT * FROM Account_Allergies WHERE UserId = ' + UserId;
            let mealPlans = {
                0: 'Normal',
                1: 'Lactose',
                2: 'Gluten-free',
                3: 'Low-Carb',
                4: 'Vegan',
                5: 'Fish-free',
                6: 'Low-Fat',
                7: 'Citrus-free',
                8: 'High-Protein',
                9: 'Egg-free',
                10: 'Nut-free'
            };

            let mealObject = {
                id: UserId
            }

            let checkDay = 'SELECT * FROM Meal_Tracker WHERE UserId = ' + UserId + ' AND Date = "' + Date + '"';
            connection.query(checkDay, function (error, r1, fields) {
                if (error)
                    throw error;
                if (r1.length !== 0) {
                    mealObject.breakfast = r1[0].Breakfast;
                    mealObject.lunch = r1[0].Lunch;
                    mealObject.dinner = r1[0].Dinner;
                    mealObject.snack = r1[0].Snack;
                    mealObject.date = Date;
                    reply(mealObject);
                } else {
                    connection.query(query, function (error, results, fields) {
                        if (error)
                            throw error;
                        let meals = [];
                        let mealIndex = [];
                        while (meals.length < 4) {
                            let isAllergic = false;
                            let temp = mealPlans[Math.floor(Math.random() * 10)];
                            if (meals.length === 3) {
                                temp = mealPlans[Math.floor(Math.random() * 4)];
                            }
                            for (let i = 0; i < results.length; i++) {
                                if (temp === results[i]) {
                                    isAllergic = true;
                                }
                            }
                            if (isAllergic === false) {
                                meals.push(temp);
                                mealIndex.push(Math.floor(Math.random() * 5) + 1);
                            }
                        }
                        connection.query('SELECT `' + meals[0] + '` FROM Breakfast WHERE idBreakfast = ' + mealIndex[0], function (error, breakfast, fields) {
                            if (error)
                                throw error;
                            connection.query('SELECT `' + meals[1] + '` FROM Lunch WHERE idLunch = ' + mealIndex[1], function (error, lunch, fields) {
                                if (error)
                                    throw error;
                                connection.query('SELECT `' + meals[2] + '` FROM Dinner WHERE idDinner = ' + mealIndex[2], function (error, dinner, fields) {
                                    if (error)
                                        throw error;
                                    connection.query('SELECT `' + meals[3] + '` FROM Snack WHERE idSnack = ' + mealIndex[3], function (error, snack, fields) {
                                        if (error)
                                            throw error;
                                        mealObject.breakfast = breakfast[0][meals[0]];
                                        mealObject.lunch = lunch[0][meals[1]];
                                        mealObject.dinner = dinner[0][meals[2]];
                                        mealObject.snack = snack[0][meals[3]];
                                        mealObject.date = Date;
                                        connection.query('INSERT INTO Completed_Meals (mealID, UserId, Date, Breakfast, Lunch, Dinner, Snack) VALUES(default, ' + UserId + ',"' + Date + '", "' + mealObject.breakfast + '", "' + mealObject.lunch + '", "' + mealObject.dinner + '", "' + mealObject.snack + '")', function (error, r5, fields) {
                                            if (error)
                                                throw error;
                                            connection.query('UPDATE Meal_Tracker SET Date = "' + Date + '", Breakfast =  "' + mealObject.breakfast + '", Lunch = "' + mealObject.lunch + '", Dinner = "' + mealObject.dinner + '", Snack = "' + mealObject.snack + '" WHERE UserId = ' + UserId, function (error, r5, fields) {
                                                if (error)
                                                    throw error;
                                                reply(mealObject);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
            
            connection.release();//release the connection
        });
    }
});

server.route({
    method: 'GET',
    path: '/accounts/{id}/mealPast',
    handler: function (request, reply) {
        let UserId = encodeURIComponent(request.params.id);
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Completed_Meals WHERE UserId = ' + UserId, function (error, results, fields) {
                if (error)
                    throw error;
                let mealList = [];
                for (let i = 0; i < results.length; i++) {
                    mealList[i] = {
                        breakfast: results[i].Breakfast,
                        lunch: results[i].Lunch,
                        dinner: results[i].Dinner,
                        snack: results[i].Snack,
                        date: results[i].Date
                    }
                }
                reply(mealList);
            });

            connection.release();//release the connection
        });

    }
});

server.route({
    method: 'GET',
    path: '/accounts/{id}/mealsCurr',
    handler: function (request, reply) {
        let UserId = encodeURIComponent(request.params.id);
        connection.getConnection(function (err, connection) {
            //run the query
            connection.query('SELECT * FROM Meal_Tracker', function (error, results, fields) {
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
    path: '/accounts/{id}',
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
                account.age = results[0].Age;
                account.public = results[0].Public;
                account.gender = results[0].Gender;
                connection.query('SELECT * FROM Account_Allergies WHERE UserId = ' + UserId, function (error, r1, fields) {
                    if (error)
                        throw error;
                    let userAllergies = [];
                    for (let i = 0; i < r1.length; i++) {
                        userAllergies[i] = r1[i].Name;
                    }
                    account.allergies = userAllergies;
                    reply(account);
                });
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
    path: '/accounts/removeUser',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let deleteAccount = 'DELETE FROM UserInfo WHERE UserId = ' + UserId + ';';
        let deleteAllergies = 'DELETE FROM Account_Allergies WHERE UserId = ' + UserId + ';';
        let deleteLogin = 'DELETE FROM Login WHERE UserId = ' + UserId + ';';
        let deleteFitTrack = 'DELETE FROM Fitness_Tracker WHERE UserId = ' + UserId + ';';
        let deletePastFil = 'DELETE FROM Completed_Workouts WHERE UserId = ' + UserId + ';';
        let deleteMealTrack = 'DELETE FROM Meal_Tracker WHERE UserId = ' + UserId + ';';
        let deletePastMeal = 'DELETE FROM Completed_Meals WHERE UserId = ' + UserId;

        connection.getConnection(function (err, connection) {
            //run the query
            connection.query(deleteAccount + deleteAllergies + deleteLogin + deleteFitTrack + deletePastFil + deleteMealTrack + deletePastMeal, function (error, results, fields) {
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
    path: '/accounts/{id}/search',
    handler: function (request, reply) {
        let UserId = request.payload['UserId'];
        let Gender = request.payload['gender'];
        let Weight = request.payload['weight'];
        let Goal = request.payload['goal'];
        let Age = request.payload['age'];
        let Allergies = request.payload['allergies'];

        if (Gender === undefined && Weight === undefined && Goal === undefined && Age === undefined && Allergies === undefined) {
            reply();
        }
        connection.getConnection(function (err, connection) {
            let query = 'SELECT * FROM UserInfo ';
            let alLength = 0;
            if (Allergies !== undefined) {
                query += 'NATURAL JOIN Account_Allergies ';
                alLength = Allergies.length;
            }
            query += 'WHERE';
            if (Gender !== undefined) {
                query += ' Gender = "' + Gender + '" AND';
            }
            if (Weight !== undefined) {
                query += ' Weight = "' + Weight + '" AND';
            }
            if (Goal !== undefined) {
                query += ' Goal = "' + Goal + '" AND';
            }
            if (Age !== undefined) {
                query += ' Age = "' + Age + '" AND';
            }
            for (let i = 0; i < alLength; i++) {
                let allergy = '';
                switch (Allergies[i]) {
                    case 'Nut Free':
                        allergy = 'Nut-free';
                        break;
                    case 'Gluten Free':
                        allergy = 'Gluten-free';
                        break;
                    case 'No Carbs/Keto':
                        allergy = 'Low-Carb';
                        break;
                    case 'Low Fat':
                        allergy = 'Low-Fat';
                        break;
                    case 'Citrus Free':
                        allergy = 'Citrus-free';
                        break;
                    case 'Egg Free':
                        allergy = 'Egg-free';
                        break;
                    case 'Fish Free':
                        allergy = 'Fish-free';
                        break;
                    case 'High Protein':
                        allergy = 'High-Protein';
                        break;
                    case 'Lactose Intolerant':
                        allergy = 'Lactose';
                        break;
                    default:
                        allergy = Allergies[i];
                }
                query += ' Name = "' + allergy + '" AND';
            }
            query = query.slice(0, -3);
            query += ' AND Public = 1';
            
            connection.query(query, function (error, results, fields) {
                let matchingUsers = [];
                let allQuery = 'SELECT * FROM Account_Allergies WHERE ';
                if (results === undefined) {
                    reply();
                }
                for (let i = 0; i < results.length; i++) {
                    let account = {};
                    account.id = results[i].UserId;
                    account.username = results[i].UserName;
                    account.password = null;
                    account.fName = results[i].fName;
                    account.lName = results[i].lName;
                    account.height = results[i].Height;
                    account.weight = results[i].Weight;
                    account.age = results[i].Age;
                    account.public = results[i].Public;
                    account.gender = results[i].Gender;
                    matchingUsers[i] = account;
                    allQuery += ('UserId = ' + results[i].UserId + ' OR ');
                }
                allQuery = allQuery.slice(0, -3);

                connection.query(allQuery, function (error, r1, fields) {
                    if (error)
                        throw error;
                    for (let i = 0; i < results.length; i++) {
                        let all = [];
                        for (let j = 0; j < r1.length; j++) {
                            if (r1[j].UserId === results[i].UserId) {
                                all.push(r1[j].Name);
                            }
                        }
                        matchingUsers[i].allergies = all;
                        all = [];
                    }
                    let matching = [];
                    matching[0] = matchingUsers[0];
                    for (let i = 0; i < matchingUsers.length; i++) {
                        for (let j = 0; j < matching.length; j++) {
                            if (matchingUsers[i].UserId === matching[j].UserId) {
                                break;
                            } else {
                                if (j === matching.length - 1) {
                                    matching.push(matchingUsers[i]);
                                }
                            }
                        }
                    }
                    reply(matching);
                });
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


