const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const stringChecking = function (data) {
    if (typeof data !== 'string') {
        return false;
    } else if (typeof data === 'string' && data.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}


const createCollege = async function (req, res) {
    try {
        let data = req.body
        if(Object.keys(data).length === 0) return res.status(400).send({status: false, message: "Please enter field to create college"})

        const {name, fullName, logoLink} = data

        if(!stringChecking(name)) return res.status(400).send({status: false, message: "name must be present and have non empty string"})

        if(!stringChecking(fullName)) return res.status(400).send({status: false, message: "fullName must be present and have non empty string"})

        if(!stringChecking(logoLink)) return res.status(400).send({status: false, message: "logoLink must be present and have non empty string"})

        const createdata = await collegeModel.create(data)
        return res.status(201).send({ status: true,  data: createdata })
    } catch (error) {
        return res.status(500).send({status: false, error: error.message})
    }
}



module.exports = { createCollege }