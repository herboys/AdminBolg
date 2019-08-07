var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection=mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bolg'
})

module.exports = connection;
