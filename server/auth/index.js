const router = require('express').Router()
const {getUserById} = require('../db/queryFunctions/userQueryFunctions')
module.exports = router

router.get('/me', (req, res) => {
  if (req.session.userId) {
    getUserById(req.session.userId).then(user => {
      res.send(user)
    })
  } else {
    res.send({})
  }
})
