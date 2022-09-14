const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const isvalidEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const isvalidMobile = new RegExp(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/)

const stringChecking = function (data) {
    if (typeof data !== 'string') {
        return false;
    } else if (typeof data === 'string' && data.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}



const createIntern = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter data to create Intern" })

        let { name, mobile, email, collegeName } = data
        const entries = {}

        if (!stringChecking(name)) return res.status(400).send({ status: false, message: "name must be present and have non empty string" })
        if (name) {
            entries.name = name
        }

        if(!stringChecking(email)) return res.status(400).send({ status: false, message: "email must be present and have non empty string" })
        if (email) {
            if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "please enter non empty valid email" })
            const duplicateEmail = await internModel.findOne({ email: email })
            if (duplicateEmail) return res.status(400).send({ status: false, message: "email Id already register ,use another email" })
            entries.email = email
        }

        if(!stringChecking(mobile)) return res.status(400).send({ status: false, message: "mobile must be present and have non empty string" })
        if (mobile) {
            if (!isvalidMobile.test(mobile)) return res.status(400).send({ status: false, message: "please enter non empty valid Mobile Number" })
            entries.mobile = mobile
        }

        if (!stringChecking(collegeName)) return res.status(400).send({ status: false, message: "collegeName must be present and have non empty string" })
        if (collegeName) {
        const college = await collegeModel.findOne({ fullName: collegeName })
            if (!college) return res.status(404).send({ status: false, message: "collegeName not found" })

            entries.collegeId = college._id
        }

        const createIntern = await internModel.create(entries)
        return res.status(201).send({ status: true, data: createIntern })



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

const getIntern = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        const checkCollege = await collegeModel.findOne({ name: collegeName }).select({ createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0 })
        if (!checkCollege) return res.status(404).send({ status: false, message: "collegeName not found" })
 
        const { name, fullName, logoLink } = checkCollege

        const intern = await internModel.find({ collegeId: checkCollege._id }).select({ collegeId: 0, createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0 })
        if (intern.length === 0) {
            return res.status(404).send({ status: false, message: "no intern are there" })
        }
        const data = { name, fullName, logoLink, intern }
        return res.status(200).send({ status: true, count: intern.length, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createIntern, getIntern }