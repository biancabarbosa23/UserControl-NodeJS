const bcrypt = require('bcrypt')

module.exports = function encryptPassword(password) {
  return bcrypt.hashSync(password, 10)
}
