const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  let decodedToken = {}
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  }catch {}

  if(!token || !decodedToken.id) {
    return res.status(401).send({error: "token missing or invalid"})
  }

  const userId = decodedToken.id
  req.userId = userId
  next()
}