const router = require('express').Router()
const {
  getAllProblems,
  getProblemById
} = require('../db/queryFunctions/problemQueryFunctions')

router.get('/', async (req, res, next) => {
  try {
    const problems = await getAllProblems()
    res.status(200).json(problems)
  } catch (error) {
    console.error('Error getting all problems: ', error)
  }
})

router.get('/:id', async (req, res, next) => {
  const problemId = req.params.id
  try {
    const problem = await getProblemById(problemId)
    console.log('Problem: ', problem)
    res.status(200).json(problem)
  } catch (error) {
    console.error('Error getting single problem: ', error)
  }
})

module.exports = router
