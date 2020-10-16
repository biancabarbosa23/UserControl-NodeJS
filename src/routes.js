const express = require('express')

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const AuthToken = require('./middleware/token')

const routes = express.Router()

routes.post('/login', AuthController.login)
routes.post('/register', AuthController.register)

routes.use(AuthToken)

routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.show)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.destroy)

module.exports = routes
