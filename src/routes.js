const express = require('express')

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const multer = require('multer')

const AuthToken = require('./middleware/token')
const MulterConfig = require('./middleware/multer')

const routes = express.Router()

routes.post('/login', AuthController.login)
routes.post('/register', AuthController.register)

routes.use(AuthToken)

routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.show)
routes.put(
  '/user/:id',
  multer(MulterConfig).single('avatar'),
  UserController.update
)
routes.delete('/user/:id', UserController.destroy)

module.exports = routes
