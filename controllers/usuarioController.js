require('dotenv').config()
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function guardar(req, res) {
  const {nombre, mail, password, activo} = req.body

  const passwordHash = await bcrypt.hash(password, 10)

  const nuevoUsuario = new Usuario({
    nombre: nombre,
    mail: mail,
    password: passwordHash,
    activo: activo
  })

  nuevoUsuario.save((err, usuario) => {
    if(err) return res.status(400).send({err})
    res.status(201).send(usuario)
  })
}

function listar(req, res) {
  Usuario.find({}, (err, usuarios) => {
    res.status(200).send(usuarios)
  })
}

function listarId(req, res) {
  const id = req.params.id

  Usuario.findById(id, (err, usuario) => {
    res.send(usuario)
  })
}

async function login(req, res) {
  const {mail, password} = req.body
  const user = await Usuario.findOne({mail})

  const passwordCorrect = user === null ?
    false
    : await bcrypt.compare(password, user.password)

  if(!( user && passwordCorrect)) {
    return res.status(401).json({error: 'invalid user or password'})
  }

  const userForToken = {
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60 * 60 * 24 * 7})

  res.send({
    _id: user._id,
    nombre: user.nombre,
    mail: user.mail,
    token: token
  })
}

function editar(req, res) {
  const id = req.params.id
  Usuario.findByIdAndUpdate(id, req.body, {new: true, useFindAndModify: false}, (err, usuario) => {
    res.status(200).send(usuario)
  })
}

module.exports = {
  guardar,
  listar,
  listarId,
  login,
  editar
}