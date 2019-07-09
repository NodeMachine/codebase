//import { CollectionReference } from "@google-cloud/firestore";
const router = require('express').Router()
const {auth} = require('../db/queryFunctions/index')

const {
  getAllCompanies,
  createCompany,
  createCustomProblem,
  getCompanyById,
  addSavedUser,
  getCustomProblems,
  getSavedUsers,
  updateCustomProblem,
  addUserSolutionToCustomProblem,
  deleteCustomProblem,
  getCompanyByAuthId,
  deleteSavedUser,
  updateCompany,
  getCustomProblem
} = require('../db/queryFunctions/companyQueryFunctions')

//COMPANY LOGIN:
router.put('/login', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        getCompanyByAuthId(user.user.uid).then(company => {
          req.session.companyId = company.id
          res.send(company)
        })
      })
      .catch(error => {
        const errorMessage = error.message
        res.status(401).send(errorMessage)
      })
  } catch (error) {
    const errorMessage = error.message
    res.status(400).send(errorMessage)
  }
})

//GET ALL COMPANIES FROM A FIREBASE DB:
router.get('/', async (req, res, next) => {
  try {
    const allCompanies = await getAllCompanies()
    res.send(allCompanies)
  } catch (error) {
    next(error)
  }
})

//COMPANY SIGNUP ROUTE:
router.post('/signup', async (req, res, next) => {
  try {
    const companyName = req.body.companyName
    const companyInfo = req.body.companyInfo
    const companyIndustry = req.body.companyIndustry
    const email = req.body.email
    const password = req.body.password

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        const company = await createCompany({
          companyName: companyName,
          companyInfo: companyInfo,
          companyIndustry: companyIndustry,
          email: email,
          authId: user.user.uid,
          savedUsers: []
        })
        company.customProblems = []
        res.send(company)
      })
      .catch(error => {
        const errorMessage = error.message
        res.status(400).send(errorMessage)
      })
  } catch (error) {
    next(error)
  }
})

//CREATE CUSTOM PROBLEM FOR COMPANY:
router.post('/customproblem/:companyId/', async (req, res, next) => {
  try {
    const problem = req.body
    const updatedCompany = await createCustomProblem(
      req.params.companyId,
      problem
    )
    res.send(updatedCompany)
  } catch (error) {
    next(error)
  }
})

//GET SINGLE COMPANY BY ID:
router.get('/:id', async (req, res, next) => {
  try {
    const companyId = req.params.id
    const company = await getCompanyById(companyId)
    res.send(company)
  } catch (error) {
    next(error)
  }
})

//ADD SAVED USER TO COMPANY:
router.post('/:companyId/:userId', async (req, res, next) => {
  try {
    const data = await addSavedUser(req.params.companyId, req.params.userId)
    res.send(data)
  } catch (error) {
    next(error)
  }
})

//REMOVE SAVED USER TO COMPANY:
router.delete('/:companyId/:userId', async (req, res, next) => {
  try {
    await deleteSavedUser(req.params.companyId, req.params.userId)
    res.json('User deleted')
    console.log('user has been saved to company!')
  } catch (error) {
    next(error)
  }
})

//GET ALL CUSTOM PROBLEMS BY COMPANY ID:
router.get('/:companyId/customproblem', async (req, res, next) => {
  try {
    const customProblems = await getCustomProblems(req.params.companyId)
    res.send(customProblems)
  } catch (error) {
    next(error)
  }
})

//GET SAVED USERS FROM COMPANY:
router.get('/:companyId/users', async (req, res, next) => {
  try {
    const result = await getSavedUsers(req.params.companyId)
    res.send(result)
  } catch (error) {
    next(error)
  }
})

// GET CUSTOM PROBLEM
router.get(`/:companyId/:problemId`, async (req, res, next) => {
  try {
    const problem = await getCustomProblem(
      req.params.companyId,
      req.params.problemId
    )
    res.send(problem)
  } catch (error) {
    next(error)
  }
})

// SAVE USER SOLUTION FOR CUSTOM PROBLEM
router.post('/addSolution/:companyId/:problemId', async (req, res, next) => {
  try {
    const name = req.body.name
    const solution = req.body.solution
    const isSolved = req.body.isSolved
    const userId = req.body.userId
    await addUserSolutionToCustomProblem(
      req.params.companyId,
      req.params.problemId,
      userId,
      name,
      solution,
      isSolved
    )
    res.send('Solution was saved')
  } catch (error) {
    next(error)
  }
})

// UPDATE CUSTOM PROBLEM
router.put('/:companyId/:problemId', async (req, res, next) => {
  try {
    await updateCustomProblem(
      req.params.companyId,
      req.params.problemId,
      req.body.update
    )
    res.send('Problem updated!')
  } catch (error) {
    next(error)
  }
})

// REMOVE CUSTOM PROBLEM
router.delete('/:companyId/:problemId', async (req, res, next) => {
  try {
    await deleteCustomProblem(req.params.companyId, req.params.problemId)
    res.send('Custom problem was removed')
  } catch (error) {
    next(error)
  }
})

// UPDATE COMPANY
router.put('/:companyId', async (req, res, next) => {
  try {
    await updateCompany(req.params.companyId, req.body.update)
    const company = await getCompanyById(req.params.companyId)
    res.send(company)
  } catch (error) {
    next(error)
  }
})

// COMPANY SIGNOUT

router.post('/logout', async (req, res, next) => {
  try {
    auth.signOut().then(result => {
      console.log('Sign out was successful', result)
    })
    req.session.destroy()
    res.send({})
  } catch (error) {
    next(error)
  }
})

module.exports = router
