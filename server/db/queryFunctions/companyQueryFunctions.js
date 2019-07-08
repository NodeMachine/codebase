const {db} = require('./index')
const {getUserById} = require('./userQueryFunctions')
const FieldValue = require('firebase-admin').firestore.FieldValue

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

const createCompany = async companyObject => {
  try {
    await db.collection('companies').add(companyObject)
    const company = await getCompanyByAuthId(companyObject.authId)
    console.log('Company has been added.')
    return company
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

// const addSavedUser = async (companyId, userId) => {
//   try {
//     const user = await db
//       .collection('users')
//       .doc(`${userId}`)
//       .get()

//     await db
//       .collection('companies')
//       .doc(`${companyId}`)
//       .collection('savedUsers')
//       .doc(userId)
//       .set(user.data())
//     // .set(user)
//     console.log('User has been saved')
//   } catch (error) {
//     console.log('Error in adding saved user', error)
//   }
// }
const addSavedUser = async (companyId, userId) => {
  try {
    const user = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()

    const {savedUsers} = user.data()
    savedUsers.push(userId)
    console.log('>>> ', savedUsers)
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

const deleteCustomProblem = async (companyId, problemId) => {
  try {
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .doc(`${problemId}`)
      .delete()
    return 'Custom problem was deleted'
  } catch (error) {
    console.log('Error in deleting problem', error)
  }
}

const updateCustomProblem = async (companyId, problemId, updateObject) => {
  try {
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblem')
      .doc(`${problemId}`)
      .update(updateObject)
    return 'Custom problem was updated'
  } catch (error) {
    console.log('Error in updating problem', error)
  }
}
const addUserSolutionToCustomProblem = async (
  companyId,
  problemId,
  userId,
  name,
  solution,
  isSolved
) => {
  try {
    const problem = await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblem')
      .doc(`${problemId}`)
      .get()
      .data()
    let users = problem.users
    users[userId] = {name: name, solution: solution, isSolved: isSolved}
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblem')
      .doc(`${problemId}`)
      .update(users)
    return 'Solution added'
  } catch (error) {
    console.log('Error in adding user solution', error)
  }
}

const getCompanyByAuthId = async authId => {
  try {
    const results = await db
      .collection('companies')
      .where('authId', '===', `${authId}`)
      .get()
    let result
    results.forEach(doc => {
      if (doc) {
        result = {id: doc.id, ...doc.data()}
      } else {
        console.log('Company does not exist')
      }
    })
    return result
  } catch (error) {
    console.log('Error getting company by auth ID', error)
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
  deleteCustomProblem,
  updateCustomProblem,
  addUserSolutionToCustomProblem,
  getCompanyByAuthId
}
