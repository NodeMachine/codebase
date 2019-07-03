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

router.post('/:companyId/user', async (req, res) => {
  await addSavedUser(req.params.companyId, req.body.user)
})

router.get('/:companyID/customproblem', async (req, res) => {
  await getCustomProblems(req.params.companyId)
})

router.get('/:companyId/users', async (req, res) => {
  await getSavedUsers(req.params.companyId)
})

module.exports = router
