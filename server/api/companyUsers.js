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
  deleteSavedUser
} = require('../db/queryFunctions/companyQueryFunctions')

//ADD SAVED USER TO COMPANY:
router.post('/:companyId/:userId', async (req, res) => {
  console.log('addUser API reached!')
  console.log(
    'req.params in post user to company: ',
    req.params.userId,
    req.params.companyId
  )
  await addSavedUser(req.params.companyId, req.params.userId)
  res.json('User added')
  console.log('user has been saved to company!')
})

//REMOVE SAVED USER TO COMPANY:
router.delete('/:companyId/:userId', async (req, res) => {
  console.log('addUser API reached!')
  console.log(
    'req.params in post user to company: ',
    req.params.userId,
    req.params.companyId
  )
  await deleteSavedUser(req.params.companyId, req.params.userId)
  res.json('User deleted')
  console.log('user has been saved to company!')
})

//GET ALL SAVED USERS FROM COMPANY:
router.get('/:companyId', async (req, res) => {
  const result = await getSavedUsers(req.params.companyId)
  res.json(result)
})

module.exports = router
