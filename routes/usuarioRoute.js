const express = require('express')
const api = express.Router()
const userExtractor = require('../middlewares/userExtractor')

const usuarioController = require('../controllers/usuarioController')

api.post('/', usuarioController.guardar)
api.get('/', userExtractor, usuarioController.listar)
api.get('/:id', userExtractor, usuarioController.listarId)
api.post('/login', usuarioController.login)
api.put('/:id', usuarioController.editar)

module.exports = api