'use strict';

module.exports.setup = function(app, webSocket) {
    var path = require('path');
    var express = require('express')
    const request = require("request");
    const urlR = require('url');
    const host = 'http://192.168.70.236:4000/api/v1/users/';

    // Configure the view engine, views folder and the statics path
    app.use(express.static(path.join(__dirname, 'static')));
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    function homePage(req, res) {
        console.log(req.params);
        var userID = 'admin';
        var userFloor = '';
        var userFloorDesc = '';
        var lastPollDateStart = '';
        var lastPollDateEnd = '';
        var nextPollDate = '';
        var proposedValue = '';

        if (req.params.userId !== undefined) {
            userID =  req.params.userId;
        }

        request.get( host + userID + '/floor', (error, response, body) => {
            console.log(response.statusCode);
            if (error) {
                console.log(error);
            // If there's no errors
            } else if (response.statusCode === 200) {
                // console.log('---------  body -----------');
                // console.log(body);
                // console.log('--------- response -----------');
                // //console.log(response);
                // console.log('STATUS: ' + response.statusCode);

                var userData = JSON.parse(body);
                console.log('---------  userData -----------');
                console.log(userData);

                if (userData.devices) {
                    userFloor = userData.devices[0].serial_number;
                    console.log(' floor mac: ' + userFloor);
                }

                if (userData.when_start_last_poll) {
                    lastPollDateStart = userData.when_start_last_poll;
                }

                if (userData.when_end_last_poll) {
                    lastPollDateEnd = userData.when_end_last_poll;
                }

                if (userData.when_start_next_poll) {
                    nextPollDate = userData.when_start_next_poll;
                }

                if (userData.name) {
                    userFloorDesc = userData.name;
                }

                if (userData.name) {
                    proposedValue = userData.proposed_value; 
                }
            }

            res.render('hello', {
                userFloor: userFloor,
                userMSTeams: userID,
                userFloorDesc: userFloorDesc,
                lastPollDateStart: lastPollDateStart,
                lastPollDateEnd: lastPollDateEnd,
                nextPollDate: nextPollDate,
                proposedValue: proposedValue
            });
        });
    }

    // Setup home page
    app.get('/', homePage);
    app.get('/user/:userId?', homePage);

    app.get('/second', function(req, res) {
        res.render('second');
    });

    // Setup the static tab
    app.get('/hello', function(req, res) {
        console.log(req);
        res.render('hello');
    });

    // Setup the configure tab, with first and second as content tabs
    app.get('/configure', function(req, res) {
        res.render('configure');
    });

    app.get('/first', function(req, res) {
        res.render('render');
    });

    app.get('/config', function(req, res) {
        body = { num: 1 }
        res.render('config', {
            config: body
        });
    });
};