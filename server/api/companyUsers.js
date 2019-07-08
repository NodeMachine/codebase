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
  deleteSavedUser,
  getSavedUsersTest
} = require('../db/queryFunctions/companyQueryFunctions')

//GET SINGLE COMPANY BY ID:
// router.get('/:id', async (req, res, next) => {
//   const companyId = req.params.id
//   await getCompanyById(companyId)
// })

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
  console.log('user has been saved to company!')
})

//GET SAVED USERS FROM COMPANY:
// router.get('/:companyId/users', async (req, res) => {
//   const result = await getSavedUsers(req.params.companyId)
//   res.send(result)
// })

//GET SAVED USERS FROM COMPANY:
router.get('/:companyId', async (req, res) => {
  const result = await getSavedUsersTest(req.params.companyId)
  res.send(result)
})

module.exports = router
