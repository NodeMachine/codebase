const router = require('express').Router()
const {
  getUserById,
  getAllUserProblems
} = require('../db/queryFunctions/userQueryFunctions')
const {getCompanyById} = require('../db/queryFunctions/companyQueryFunctions')

module.exports = router

router.get('/me', (req, res, next) => {
  console.log('auth/me reached! req.session.userId: ', req.session.userId)

  if (req.session.userId) {
    getUserById(req.session.userId).then(async user => {
      const problems = await getAllUserProblems(user.id)
      res.send({...user, problems})
    })
  } else if (req.session.companyId) {
    getCompanyById(req.session.companyId).then(company => {
      res.send({...company})
    })
  } else {
    res.send({})
    next()
  }
})
