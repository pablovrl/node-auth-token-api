const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
  nombre: String,
  mail: String,
  password: String,
  activo: Boolean
})

module.exports = mongoose.model('Usuario', UsuarioSchema)