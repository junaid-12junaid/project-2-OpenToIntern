const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const { stringChecking, isValidAbbrv, isValidName, isValidLogoLink } = require("../validators/validator")


const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter field to create college" })

        const { name, fullName, logoLink } = data

        if (!stringChecking(name)) return res.status(400).send({ status: false, message: "name must be present and have non empty string" })

        if (!isValidAbbrv.test(name)) return res.status(400).send({ status: false, message: "name should be acronym" })

        const duplicateName = await collegeModel.findOne({ name: name })
        if (duplicateName) return res.status(400).send({ status: false, message: "name can't be same, please enter unique name" })

        if (!stringChecking(fullName)) return res.status(400).send({ status: false, message: "fullName must be present and have non empty string" })

        if (!isValidName.test(fullName)) return res.status(400).send({ status: false, message: "fullName should not contain numeric value and symbols" })

        if (!isValidLogoLink.test(logoLink)) return res.status(400).send({ status: false, message: "logo link must be in link url format with jpg, gif, and png format only" })

        const createdata = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: createdata })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createCollege }