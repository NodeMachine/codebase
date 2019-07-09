const {db} = require('./index')
const {getUserById} = require('./userQueryFunctions')
const FieldValue = require('firebase-admin').firestore.FieldValue

const getAllCompanies = async () => {
  try {
    const result = await db.collection('companies').get()
    const companies = result.docs.map(company => {
      return {id: company.id, ...company.data()}
    })
    return companies
  } catch (error) {
    console.log('Error in getting all companies', error)
  }
}

const getCompanyByAuthId = async authid => {
  try {
    const results = await db
      .collection('companies')
      .where('authId', '==', `${authid}`)
      .get()
    let result
    results.forEach(doc => {
      if (doc) {
        result = {id: doc.id, ...doc.data()}
      } else {
        console.log('User does not exist')
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

const createCompany = async company => {
  try {
    await db.collection('companies').add(company)
    const companyRes = await getCompanyByAuthId(company.authId)
    return companyRes
  } catch (error) {
    console.log('Error in creating company', error)
  }
}

const createCustomProblem = async (companyId, problem) => {
  try {
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .add(problem)
    console.log('Custom problem has been added.')
  } catch (error) {
    console.log('Error in creating custom problem', error)
  }
}

const getCompanyById = async companyId => {
  try {
    const company = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()
    if (company.exists) {
      return {id: companyId, ...company.data}
    } else {
      console.log('Company does not exist.')
    }
  } catch (error) {
    console.log('Error getting company by ID', error)
  }
}

const addSavedUser = async (companyId, userId) => {
  try {
    const company = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()

    const {savedUsers} = company.data()
    savedUsers.push(userId)
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .update({savedUsers: savedUsers})
    console.log('User has been saved')
  } catch (error) {
    console.log('Error in adding saved user', error)
  }
}

const deleteSavedUser = async (companyId, userId) => {
  try {
    const company = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()

    const {savedUsers} = company.data()
    const updatedUserArr = savedUsers.filter(el => el !== userId)
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .update({savedUsers: updatedUserArr})

    return 'User has been deleted'
  } catch (error) {
    console.log('Error in adding saved user', error)
  }
}

const getCustomProblems = async companyId => {
  try {
    const result = await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .get()

    const customProblems = result.docs.map(problem => {
      return {id: problem.id, ...problem.data()}
    })
    return customProblems
  } catch (error) {
    console.log('Error in getting custom problems', error)
  }
}

const getSavedUsers = async companyId => {
  try {
    const companyInfo = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()
    const {savedUsers} = companyInfo.data()
    const res = savedUsers.map(async el => {
      const user = await getUserById(el)
      el = user
      return el
    })
    const savedUsersArr = await Promise.all(res)
    return savedUsersArr
  } catch (error) {
    console.log('Error in getting saved users', error)
  }
}

const updateCompany = async (companyId, properties) => {
  try {
    const updates = []
    for (let prop in properties) {
      updates.push(prop, properties[prop])
    }
    await db
      .collection('companies')
      .doc(`${id}`)
      .update(...updates)
  } catch (error) {
    console.log('Error in updating company:', error)
  }
}

module.exports = {
  getAllCompanies,
  createCompany,
  createCustomProblem,
  getCompanyById,
  addSavedUser,
  getCustomProblems,
  getSavedUsers,
  deleteSavedUser,
  updateCompany,
  getCompanyByAuthId
}
