const router = require('express').Router()
module.exports = router

router.use('/users', require('./userRoutes'))
router.use('/solution', require('./solution'))
router.use('/problems', require('./problems'))
router.use('/company', require('./company'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
