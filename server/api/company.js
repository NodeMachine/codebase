//import { CollectionReference } from "@google-cloud/firestore";
const router = require('express').Router()

const {getAllCompanies} = require('../db/queryFunctions/companyQueryFunctions')

//GET ALL COMPANIES FROM A FIREBASE DB:
router.get('/', async (req, res, next) => {
  const allCompanies = await getAllCompanies()
  res.send(allCompanies)
})

router.post('/', async (req, res, next) => {
  const companyName = req.body.companyName
  const companyInfo = req.body.companyInfo
  const industry = req.body.industry
  await createCompany(req.body)
})

module.exports = router
