const knex = require('../database')
const bcrypt = require('bcrypt')

const generateToken = require('../utils/generateToken')
const encryptPassword = require('../utils/encryptPassword')

module.exports = {
  async register(req, res) {
    try {
      const { name, cpf, email, password } = req.body

      //verificar existência do cpf
      let user = await knex('users').select('id').where('cpf', cpf)
      if (user.length > 0) return res.json({ message: 'Cpf já existe!' })

      //verificar existência do email
      user = await knex('users').select('id').where('email', email)
      if (user.length > 0) return res.json({ message: 'E-mail já existe!' })

      const dataUserToCreate = {
        name,
        cpf,
        email,
        password: encryptPassword(password),
        nivel: 1,
        image:
          'https://avatars1.githubusercontent.com/u/57002127?s=460&u=b74bf38cad22fe4dfb6a643aafcf9038343c6a26&v=4',
      }

      const userId = await knex('users').insert(dataUserToCreate)

      dataUserToCreate.password = undefined

      return res.json({
        dataUserToCreate,
        token: generateToken({ id: userId[0], nivel: 1 }),
      })
    } catch (err) {
      return res.json({ message: 'erro ao cadastrar usuário!' })
    }
  },

  async login(req, res) {
    try {
      const { usuario, password } = req.body

      const user = await knex('users')
        .select()
        .where('email', usuario)
        .orWhere('cpf', usuario)

      if (!(await bcrypt.compare(password, user[0].password)))
        return res.json({ message: 'Senha Inválida' })

      if (user[0].nivel === 0)
        return res.json({ message: 'Usuário desativado' })

      user[0].password = undefined

      return res.json({
        user,
        token: generateToken({ id: user[0].id, nivel: user[0].nivel }),
      })
    } catch (err) {
      return res.json({ message: 'Usuário não encontrado' })
    }
  },
}
