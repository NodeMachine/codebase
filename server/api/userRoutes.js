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
  //auth.onAuthStateChanged(async user => {
  if (req.session.isAdmin) {
    try {
      const users = await getAllUsers()
      res.send(users)
    } catch (error) {
      next(error)
    }
  } else {
    res.send('User is not admin!')
  }
  //  else {
  //   res.send('Not logged in!')
  // }
})

router.get('/:id', async (req, res, next) => {
  //auth.onAuthStateChanged(async user => {
  // const singleUser = await getUserByAuthId(user.uid)
  if (req.session.userId === req.params.id) {
    try {
      const user = await getUserById(req.params.id)
      const problems = await getAllUserProblems(req.params.id)
      res.send({...user, problems})
    } catch (error) {
      next(error)
    }
  } else {
    res.send('You are not authorized to view this page!')
  }
})

//USER LOGOUT
router.post('/logout', async (req, res, next) => {
  try {
    auth.signOut().then(result => {
      console.log('Sign out was extremely successul!', result)
    })
    req.session.destroy()
    //res.status(204).end()
    res.send({})
  } catch (error) {
    console.error('There was an error signing out: ', error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.status(204).send('Delete successful!')
  } catch (error) {
    next(error)
  }
})

router.post('/save/:userId', async (req, res, next) => {
  try {
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
    const problems = await getAllUserProblems(userId)
    let score = 0
    for (let prob in problems) {
      if (problems[prob].isSolved) {
        score += problems[prob].points
      }
    }
    await updateUser(userId, {score})
    const updatedUser = await getUserById(userId)
    updatedUser.problems = problems
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})

//USER SIGNUP ROUTE:
router.post('/signup', async (req, res, next) => {
  try {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        const newUser = await createUser({
          firstName: firstName,
          lastName: lastName,
          email: user.user.email,
          authId: user.user.uid,
          score: 0
        })
        newUser.problems = []
        req.session.userId = newUser.id
        res.status(201).send(newUser)
      })
      .catch(error => {
        const errorMessage = error.message
        res.status(400).send(errorMessage)
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
          req.session.isAdmin = singleUser.isAdmin
          console.log('req.session.userId: ', req.session.userId)
          const problems = await getAllUserProblems(singleUser.id)
          res.send({...singleUser, problems})
        })
      })
      .catch(error => {
        const errorMessage = error.message
        res.status(400).send(errorMessage)
      })
  } catch (error) {
    next(error)
  }
})

router.post('/update/:id', (req, res, next) => {
  auth.onAuthStateChanged(async user => {
    if (user) {
      const singleUser = await getUserByAuthId(user.uid)
      if (singleUser.id === req.params.id) {
        try {
          const update = req.body.update
          await updateUser(req.params.id, update)
          res.send('Update successful!')
        } catch (error) {
          next(error)
        }
      } else {
        res.send('Not allowed to update for this user.')
      }
    } else {
      res.send('Not logged in!')
    }
  })
})
