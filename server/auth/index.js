const router = require('express').Router()
const {
  getUserById,
  getAllUserProblems
} = require('../db/queryFunctions/userQueryFunctions')
module.exports = router

router.get('/me', (req, res) => {
  if (req.session.userId) {
    getUserById(req.session.userId).then(async user => {
      const problems = await getAllUserProblems(user.id)
      res.send({...user, problems})
    })
  } else {
    res.send({})
  }
})
