const jwt = require('jsonwebtoken')
const auth = require('../config/auth.json')

//Validação do Token
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization

  //existência do token
  if (!authHeader) return res.json({ message: 'Token não Informado!' })

  const partsToken = authHeader.split(' ')
  //Bearer + Hash

  if (!partsToken.length === 2) return res.json({ message: 'Erro no Token!' })

  const [part, token] = partsToken

  //verificação Bearer com RegExr
  if (!/^Bearer$/i.test(part))
    return res.json({ message: 'Erro de Formação no Token' })

  //Validação do token e usuário
  jwt.verify(token, auth.secret, function (err, codeUser) {
    if (err) return res.json({ message: 'Token invalido!' })

    req.userId = codeUser.id
    req.userNivel = codeUser.nivel

    return next()
  })
}
