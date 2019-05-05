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
        var userID = '';
        var userFloor = '';
        var lastPollDate = '';
        var nextPollDate = '';

        if (req.params.userId !== undefined) {
            userID = req.params.userId;

            request.get(host + userID + '/floor', (error, response, body) => {
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

                    if (userData.devices) {
                        userFloor = userData.devices[0].serial_number;
                        console.log(userData.devices[0].serial_number);
                    }

                    if (userData.lastPollDate) {
                        lastPollDate = userData.lastPollDate;
                    }

                    if (userData.nextPollDate) {
                        nextPollDate = userData.nextPollDate;
                    }
                }
            });
        } else {
            userID = 'edwuin.gutierrez@endava.com';
        }

        console.log(userID);

        res.render('hello', {
            userMSTeams: userID,
            userFloor: userFloor,
            lastPollDate: lastPollDate,
            nextPollDate: nextPollDate
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

    app.post('/sendPoll', function(req, res) {
        console.log("body del req, ", req.body);
        console.log("user, ", req.body.userMSTeams);

        // Request.post({
        //     "headers": { "content-type": "application/json" },
        //     "url": host,
        //     "body": JSON.stringify({ "username": req.body.userMSTeams })
        // }, (error, response, body) => {
        //     if (error) { return console.dir(error); }
        //     console.dir(JSON.parse(body));
        // });
        res.json({ sended: 'ok' })
    });
};