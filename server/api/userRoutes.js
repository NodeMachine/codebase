const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserByAuthId
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
    res.send(user)
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

router.put('/login', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        getUserByAuthId(user.user.uid).then(singleUser => {
          req.session.userId = singleUser.id
          res.send(singleUser)
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
