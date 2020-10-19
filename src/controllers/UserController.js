const knex = require('../database')
const fs = require('fs')
const path = require('path')

const encryptPassword = require('../utils/encryptPassword')

module.exports = {
  async index(req, res) {
    try {
      const loggedUserNivel = req.userNivel
      const loggedUserId = req.userId

      if (loggedUserNivel != 999)
        return res.json({ message: 'Usuário não autorizado' })

      const users = await knex
        .select('id', 'name', 'cpf', 'email', 'nivel', 'image')
        .table('users')
        .where('id', '<>', loggedUserId)
        .orderBy('name', 'asc')

      return res.json({ users })
    } catch (err) {
      res.json({ message: 'Não foi possível realizar a listagem ' })
    }
  },

  async show(req, res) {
    try {
      const loggedUserId = req.userId
      const loggedUserNivel = req.userNivel
      const { id } = req.params

      if (loggedUserId != id && loggedUserNivel != 999)
        return res.json({ message: 'Usuario não autorizado' })

      const user = await knex.select().table('users').where('id', id)

      return res.json(user)
    } catch (err) {
      res.json({ message: 'Não foi possível listar o usuário' })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      const loggedUserId = req.userId
      const loggedUserNivel = req.userNivel

      if (loggedUserId != id && loggedUserNivel != 999)
        return res.json({ message: 'Usuário não autorizado' })

      if (data.password) data.password = encryptPassword(data.password)

      const oldUser = await knex('users').where('id', id).select('image')

      if (oldUser[0].image !== '')
        fs.unlinkSync(path.resolve(__dirname, '..', '..', oldUser[0].image))

      await knex('users')
        .where('id', id)
        .update(data)
        .update('image', req.file.path)

      const updatedUser = await knex('users').where('id', id).select('*')

      updatedUser[0].password = undefined

      return res.json({ updatedUser })
    } catch (err) {
      return res.json({ message: 'Não foi possível realizar a alteração' })
    }
  },

  async destroy(req, res) {
    try {
      const loggedUserId = req.userId
      const loggedUserNivel = req.userNivel
      const { id } = req.params

      if (loggedUserId != id && loggedUserNivel != 999)
        return res.json({ message: 'Usuário não autorizado' })

      await knex('users').where('id', id).del()

      return res.json({ message: 'excluído com sucesso' })
    } catch (err) {
      return res.json({ message: 'Não foi possível excluir' })
    }
  },
}
