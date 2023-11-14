const express = require('express')
const mysql = require('mysql');
const App = express()
App.disable("x-powered-by");
const path = require('path')
require('dotenv').config();

// Import Middleware
const logger = require('./middleware/logger')
App.use(logger)
const connection = require('./middleware/db_connect');

// Dashboard
App.use('/', express.static(path.join(__dirname, 'public')));

App.get('/app1', (req, res) => {
  res.send('Hello this Apps 1!')
});

App.get('/app2', (req, res) => {
  res.send('Hello this App 2!')
});

App.get('/users', (req, res, next) => {
  const sql = "SELECT * FROM tb_data ORDER BY id desc"
  connection.query(sql,(error, fields) => {
    if (error) {
      console.log('error', error)
    } else {
      res.send(fields)
    }
  })
});

App.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})

module.exports = App