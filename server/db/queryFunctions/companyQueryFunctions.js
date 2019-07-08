const {db} = require('./index')

const companyLogin = async (companyId, password) => {}

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

const createCompany = async company => {
  try {
    await db.collection('companies').add(company)
    console.log('Company has been added.')
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
      return company
    } else {
      console.log('Company does not exist.')
    }
  } catch (error) {
    console.log('Error getting company by ID', error)
  }
}

const addSavedUser = async (companyId, userId) => {
  try {
    const user = await db
      .collection('users')
      .doc(`${userId}`)
      .get()

    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('savedUsers')
      .doc(userId)
      .set(user.data())
    // .set(user)
    console.log('User has been saved')
  } catch (error) {
    console.log('Error in adding saved user', error)
  }
}

const deleteSavedUser = async (companyId, userId) => {
  try {
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('savedUsers')
      .doc(userId)
      .delete()

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
    const result = await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('savedUsers')
      .get()
    const savedUsers = result.docs.map(user => {
      return {id: user.id, ...user.data()}
    })
    return savedUsers
  } catch (error) {
    console.log('Error in getting saved users', error)
  }
}

const getSavedUsersTest = async companyId => {
  try {
    const result = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()
    result.forEach(user => {
      console.log('USER TEST ', user.id)
    })
    // return savedUsers
  } catch (error) {
    console.log('Error in getting saved users', error)
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
  getSavedUsersTest
}
