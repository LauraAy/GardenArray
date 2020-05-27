const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./plantRoutes.js'))
router.use('/api', require('./gardenRoutes.js'))

module.exports = router