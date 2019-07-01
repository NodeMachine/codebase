const router = require('express').Router()
const {getAllProblems} = require('../db/queryFunctions/problemQueryFunctions')

router.get('/', async (req, res, next) => {
  try {
    const problems = await getAllProblems()
    console.log('getAllProblems: ', problems)
    res.status(200).json(problems)
  } catch (error) {
    console.error('Error getting all problems: ', error)
  }
})

module.exports = router
