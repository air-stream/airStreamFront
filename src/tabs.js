'use strict';

module.exports.setup = function(app, webSocket) {
    var path = require('path');
    var express = require('express')
    const request = require("request");
    const urlR = require('url');

    // Configure the view engine, views folder and the statics path
    app.use(express.static(path.join(__dirname, 'static')));
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Setup home page
    app.get('/', function(req, res) {
        res.render('hello');
    });

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