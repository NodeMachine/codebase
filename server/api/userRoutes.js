const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserByAuthId,
  getAllUserProblems,
  addProblemToUser
} = require('../db/queryFunctions/userQueryFunctions')
const router = require('express').Router()
const {auth} = require('../db/queryFunctions/index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id)
    const problems = await getAllUserProblems(req.params.id)
    res.send({...user, problems})
  } catch (error) {
    next(error)
  }
})

router.delete('/logout', (req, res, next) => {
  req.session.destroy()
  res.status(204).end()
})

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.send('Delete successful!')
  } catch (error) {
    next(error)
  }
})

router.post('/save/:userId', async (req, res, next) => {
  try {
    console.log('here', req.body)
    const problem = req.body.problem
    const problemId = problem.id
    const isSolved = req.body.isSolved
    const solution = req.body.solution
    const userId = req.params.userId
    await addProblemToUser(userId, problemId, {
      ...problem,
      isSolved: isSolved,
      solution: solution
    })
    const user = await getUserById(userId)
    const problems = await getAllUserProblems(userId)
    user.problems = problems
    res.send(user)
  } catch (error) {
    next(error)
  }
})

//USER SIGNUP ROUTE:
router.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body in signup: ', req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const isCompany = req.body.isCompany
    console.log('email in signup: ', email)
    const password = req.body.password
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        const newUser = await createUser({
          firstName: firstName,
          lastName: lastName,
          email: user.user.email,
          authId: user.user.uid,
          isCompany: isCompany,
          score: 0
        })
        newUser.problems = []
        req.session.userId = newUser.id
        res.status(201).send(newUser)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        res.status(400).send(errorCode, errorMessage)
      })
  } catch (error) {
    next(error)
  }
})

//USER LOGIN ROUTE:
router.put('/login', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        getUserByAuthId(user.user.uid).then(async singleUser => {
          req.session.userId = singleUser.id
          console.log('req.session.userId: ', req.session.userId)
          const problems = await getAllUserProblems(singleUser.id)
          res.send({...singleUser, problems})
        })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        res.send(errorCode, errorMessage)
      })
  } catch (error) {
    next(error)
  }
})

router.post('/update/:id', async (req, res, next) => {
  try {
    const update = req.body.update
    await updateUser(req.params.id, update)
    res.send('Update successful!')
  } catch (error) {
    next(error)
  }
})
