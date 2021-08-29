var routes = require('express').Router()
var logInController = require('../Controller/controller')
var auth = require('../Middleware/middleware')

routes.route('/Details').get(auth, logInController.getAllContacts)
routes.route('/add_new_user').post(logInController.addUser)
routes.route('/findUser/:id').post(logInController.findUser)
routes.route('/Signup').post(logInController.Signup)
routes.route('/Login').post(logInController.SignIn)

module.exports = routes
