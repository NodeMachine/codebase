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
  getSavedUsers
} = require('../db/queryFunctions/companyQueryFunctions')

//COMPANY LOGIN:
router.put('/login', async (req, res, next) => {
  console.log('company login api called! ')
  try {
    console.log('req.body in api company login: ', req.body)
    const email = req.body.email
    const password = req.body.password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user from auth module: ', user.user.uid)
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
  const allCompanies = await getAllCompanies()
  res.send(allCompanies)
})

//CREATE COMPANY:
router.post('/signup', async (req, res, next) => {
  try {
    console.log('company signup api reached, req.body: ', req.body)
    const companyName = req.body.companyName
    const companyInfo = req.body.companyInfo
    const companyIndustry = req.body.companyIndustry
    const email = req.body.email
    const password = req.body.password
    await createCompany({
      companyName: companyName,
      companyInfo: companyInfo,
      companyIndustry: companyIndustry,
      email: email,
      password: password
    })
  } catch (error) {
    next(error)
  }
})

//CREATE CUSTOM PROBLEM FOR COMPANY:
router.post('/:companyId/customproblem', async (req, res, next) => {
  await createCustomProblem(req.params.companyId, req.body.problem)
})

//GET SINGLE COMPANY BY ID:
router.get('/:id', async (req, res, next) => {
  const companyId = req.params.id
  await getCompanyById(companyId)
})

//ADD SAVED USER TO COMPANY:
router.post('/:companyId/:userId', async (req, res) => {
  console.log('addUser API reached!')
  console.log(
    'req.params in post user to company: ',
    req.params.userId,
    req.params.companyId
  )
  await addSavedUser(req.params.companyId, req.params.userId)
  console.log('user has been saved to company!')
})

//GET ALL CUSTOM PROBLEMS BY COMPANY ID:
router.get('/:companyId/customproblem', async (req, res) => {
  const customProblems = await getCustomProblems(req.params.companyId)
  res.send(customProblems)
})

//GET SAVED USERS FROM COMPANY:
router.get('/:companyId/users', async (req, res) => {
  const result = await getSavedUsers(req.params.companyId)
  res.send(result)
})

module.exports = router
