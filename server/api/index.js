const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/solution', require('./solution'))
router.use('/problems', require('./problems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
