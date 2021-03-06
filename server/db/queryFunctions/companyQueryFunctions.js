const {db} = require('./index')
const {getUserById} = require('./userQueryFunctions')
const FieldValue = require('firebase-admin').firestore.FieldValue

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

const getCompanyById = async companyId => {
  try {
    const data = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()
    if (data.exists) {
      const problems = await getCustomProblems(companyId)
      const company = {id: data.id, ...data.data()}
      company.customProblems = problems
      return company
    } else {
      console.log('Company does not exist.')
    }
  } catch (error) {
    console.log('Error getting company by ID', error)
  }
}

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

    const updatedCompany = await getCompanyById(companyId)
    return updatedCompany
  } catch (error) {
    console.log('Error in creating custom problem', error)
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

    const updatedCompany = await getCompanyById(companyId)
    return updatedCompany
  } catch (error) {
    console.log('Error in adding saved user', error)
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
      .doc(`${companyId}`)
      .update(...updates)
    const updatedCompany = await getCompanyById(companyId)
    return updatedCompany
  } catch (error) {
    console.log('Error in updating company:', error)
  }
}

const getCustomProblem = async (companyId, problemId) => {
  try {
    const problemData = await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .doc(`${problemId}`)
      .get()

    const problem = {id: problemData.id, ...problemData.data()}
    delete problem.users
    return problem
  } catch (error) {
    console.log('Error in getting single problem', error)
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
    const problemData = await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .doc(`${problemId}`)
      .get()
    const problem = problemData.data()
    let users = problem.users
    users[userId] = {name: name, solution: solution, isSolved: isSolved}
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .doc(`${problemId}`)
      .update({users})
    return 'Solution added'
  } catch (error) {
    console.log('Error in adding user solution', error)
  }
}

const updateCustomProblem = async (companyId, problemId, updateObject) => {
  try {
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .collection('customProblems')
      .doc(`${problemId}`)
      .update(updateObject)
    const updatedCompany = await getCompanyById(companyId)
    return updatedCompany
  } catch (error) {
    console.log('Error in updating problem', error)
  }
}

const addSavedUser = async (companyId, userId) => {
  try {
    const company = await db
      .collection('companies')
      .doc(`${companyId}`)
      .get()

    const {savedUsers} = company.data()
    if (!savedUsers.includes(userId)) {
      savedUsers.push(userId)
    }
    await db
      .collection('companies')
      .doc(`${companyId}`)
      .update({savedUsers: savedUsers})

    const updatedCompany = await getCompanyById(companyId)
    return updatedCompany
  } catch (error) {
    console.log('Error in adding saved user', error)
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
    const problems = await getCustomProblems(result.id)
    result.customProblems = problems
    return result
  } catch (error) {
    console.log(error)
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
  getCompanyByAuthId,
  getCustomProblem,
  addUserSolutionToCustomProblem,
  updateCustomProblem
}
