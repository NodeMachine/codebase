const db = require('./index')

const createUser = async obj => {
  try {
    await db.collection('users').add(obj)
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (id, obj) => {
  try {
    await db
      .collection('users')
      .doc(`${id}`)
      .set(obj)
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

const getAllUsers = async () => {
  try {
    const result = await db.collection('users').get()
    return result.docs.map(item => {
      return {id: item.id, ...item.data()}
    })
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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  addProblemToUser
}
