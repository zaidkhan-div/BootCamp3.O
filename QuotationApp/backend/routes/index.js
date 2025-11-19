const express = require('express')
const router = express.Router();
const authRoutes = require('./auth')
const quotationRoutes = require('./quatation')


router.use('/auth', authRoutes)
router.use('/quotation', quotationRoutes)


module.exports = router;