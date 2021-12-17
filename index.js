const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const usuarioRoute = require('./routes/usuarioRoute')

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use('/api/usuario', usuarioRoute)

app.get('/', (req, res) => {
  res.send({'message': 'API FUNCIONADO :D'})
})

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://admin:djaskldjas@cluster0.1eazd.mongodb.net/hola?retryWrites=true&w=majority', options)
.then(() => console.log("Conectado a la BD"))

const PORT = 3001
app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT)
})