var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./Routes/routes')

var port = process.env.port || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/apis')
var db = mongoose.connection

app.use('/', routes)
app.listen(port, () => {
  console.log('Running RestHub on port ' + port)
})
