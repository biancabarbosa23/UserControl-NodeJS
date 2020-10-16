const jwt = require('jsonwebtoken')

const keyAuth = require('../config/auth.json')

module.exports = function generateToken(param = {}) {
  return jwt.sign(param, keyAuth.secret, {
    //1 dia
    expiresIn: 86400,
  })
}
