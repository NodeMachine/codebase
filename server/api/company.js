//import { CollectionReference } from "@google-cloud/firestore";
const router = require('express').Router()

const {
  getAllCompanies,
  createCompany,
  createCustomProblem,
  getCompanyById,
  addSavedUser,
  getCustomProblems,
  getSavedUsers
} = require('../db/queryFunctions/companyQueryFunctions')

//GET ALL COMPANIES FROM A FIREBASE DB:
router.get('/', async (req, res, next) => {
  const allCompanies = await getAllCompanies()
  res.send(allCompanies)
})

router.post('/', async (req, res, next) => {
  const companyName = req.body.companyName
  const companyInfo = req.body.companyInfo
  const industry = req.body.industry
  await createCompany({
    name: companyName,
    companyInfo: companyInfo,
    industry: industry
  })
})

router.post('/:companyId/customproblem', async (req, res, next) => {
  await createCustomProblem(req.params.companyId, req.body.problem)
})

router.get('/:id', async (req, res, next) => {
  const companyId = req.params.id
  await getCompanyById(companyId)
})

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

router.get('/:companyId/customproblem', async (req, res) => {
  const customProblems = await getCustomProblems(req.params.companyId)
  res.send(customProblems)
})

router.get('/:companyId/users', async (req, res) => {
  const result = await getSavedUsers(req.params.companyId)
  res.send(result)
})

module.exports = router
