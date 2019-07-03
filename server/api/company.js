//import { CollectionReference } from "@google-cloud/firestore";
const router = require('express').Router()

const {getAllCompanies} = require('../db/queryFunctions/problemQueryFunctions')

//GET ALL COMPANIES FROM A FIREBASE DB:
router.get('/', (req, res, next) => {
  const allCompanies = getAllCompanies()
  console.log('allCompanies: ', allCompanies)
})

module.exports = router
