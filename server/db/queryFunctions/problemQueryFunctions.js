const {db} = require('./index')

const createProblem = async obj => {
  try {
    await db.collection('problems').add(obj)
  } catch (error) {
    console.log(error)
  }
}

const updateProblem = async (id, obj) => {
  try {
    await db
      .collection('problems')
      .doc(`${id}`)
      .set(obj)
  } catch (error) {
    console.log(error)
  }
}

const deleteProblem = async id => {
  try {
    await db
      .collection('problems')
      .doc(`${id}`)
      .delete()
  } catch (error) {
    console.log(error)
  }
}

const getProblemById = async id => {
  try {
    const result = await db
      .collection('problems')
      .doc(`${id}`)
      .get()
    const problem = {id: result.id, ...result.data()}
    console.log('in this', problem)
    return problem
  } catch (error) {
    console.log(error)
  }
}

const getAllProblems = async () => {
  try {
    const result = await db.collection('problems').get()
    return result.docs.map(item => {
      return {id: item.id, ...item.data()}
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblems
}
