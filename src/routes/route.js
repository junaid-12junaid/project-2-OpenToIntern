const express = require('express')
const router = express.Router()
const middleware = require('../middleware/auth')
const CollegeModel = require('../models/collegeModel')
const InternModel = require('../models/internModel')
const collegeController = require('../controller/collegeController')
const internController = require('../controller/internController')

router.post('/functionup/colleges', collegeController.createCollege)

router.post('/functionup/interns', internController.createIntern)



module.exports = router