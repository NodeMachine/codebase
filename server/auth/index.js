const router = require('express').Router()
const {
  getUserById,
  getAllUserProblems
} = require('../db/queryFunctions/userQueryFunctions')
const {getCompanyById} = require('../db/queryFunctions/companyQueryFunctions')

module.exports = router

router.get('/me', (req, res, next) => {
  try {
    if (req.session.userId) {
      getUserById(req.session.userId).then(async user => {
        const problems = await getAllUserProblems(user.id)
        res.send({...user, problems})
      })
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})

router.get('/company', (req, res, next) => {
  try {
    if (req.session.companyId) {
      getCompanyById(req.session.companyId).then(company => {
        res.send({...company})
      })
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})
