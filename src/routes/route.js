const express = require('express')
const router = express.Router()
const middleware = require('../middleware/auth')
const CollegeModel = require('../models/collegeModel')
const InternModel = require('../models/internModel')

router.post('/functionup/colleges')



module.exports = router