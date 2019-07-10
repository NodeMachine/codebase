const {db} = require('./index')

const updateUser = async (id, properties) => {
  try {
    const updates = []
    for (let prop in properties) {
      updates.push(prop, properties[prop])
    }
    await db
      .collection('users')
      .doc(`${id}`)
      .update(...updates)
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async id => {
  try {
    await db
      .collection('users')
      .doc(`${id}`)
      .delete()
  } catch (error) {
    console.log(error)
  }
}

const getUserById = async id => {
  try {
    const result = await db
      .collection('users')
      .doc(`${id}`)
      .get()
    return {id: result.id, ...result.data()}
  } catch (error) {
    console.log(error)
  }
}

const getUserByAuthId = async authid => {
  try {
    const results = await db
      .collection('users')
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

const addProblemToUser = async (userId, problemId, problemData) => {
  try {
    const searchedProblem = await db
      .collection('problems')
      .doc(`${problemId}`)
      .get()
    await db
      .collection('users')
      .doc(`${userId}`)
      .collection('userProblems')
      .doc(searchedProblem.id)
      .set({...searchedProblem.data(), ...problemData})
  } catch (error) {
    console.log(error)
  }
}

const getAllUserProblems = async userId => {
  try {
    const problems = {}
    await db
      .collection('users')
      .doc(`${userId}`)
      .collection('userProblems')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          problems[doc.id] = doc.data()
        })
      })
    return problems
  } catch (error) {
    console.log(error)
  }
}

const createUser = async obj => {
  try {
    await db.collection('users').add(obj)
    const user = await getUserByAuthId(obj.authId)
    return user
  } catch (error) {
    console.log('error crating user: ', error)
  }
}

const getAllUsers = async () => {
  try {
    const result = await db.collection('users').get()
    const users = []

    for (let i = 0; i < result.docs.length; i++) {
      let item = result.docs[i]
      let user = {id: item.id, ...item.data()}
      let problems = await getAllUserProblems(user.id)
      user.problems = Object.values(problems)
      users.push(user)
    }
    return users
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  addProblemToUser,
  getUserByAuthId,
  getAllUserProblems
}
