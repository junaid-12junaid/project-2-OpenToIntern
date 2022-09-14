const internModel=require('../models/internModel')
const collegeModel=require('../models/collegeModel')

const isvalidEmail =new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const isvalidMobile=new RegExp(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/)

//Validation========================>
const stringChecking = function (data) {
    if (typeof data !== 'string') {
        return false;
    } else if (typeof data === 'string' && data.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}



const createIntern=async function(req,res){
    try {
        let data=req.body

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please enter data to create Intern" })

        let{name,mobile,email,collegeName}=data
        const result={}

        if(name){
        if(!stringChecking(name)) return res.status(400).send({status: false, message: "name must be present and have non empty string"})
        result.name=name
        }

        if(mobile){
        if(!isvalidMobile.test(mobile)) return res.status(400).send({ status: false, msg: "please enter non empty valid Mobile Number" })
        result.mobile=mobile
        }

        if(email){
        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, msg: "please enter non empty valid email" })
        const duplicateEmail = await internModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({ status: false, msg: "email Id already register ,use another email" })
        result.email=email
        }

       
        

        if(collegeName){
        if(!stringChecking(collegeName)) return res.status(400).send({status: false, message: "collegeName must be present and have non empty string"})

        const college=await collegeModel.findOne({fullName:collegeName})
        if(!college) return res.status(404).send({status: false, message: "collegeName not found"})

        result.collegeId=college._id
        }

        const createIntern=await internModel.create(result)
        return res.status(201).send({status:true,data:createIntern})

 

    } catch (error) {
        return res.status(500).send({status:false,msg:err.message})
    }
  
}

module.exports.createIntern=createIntern