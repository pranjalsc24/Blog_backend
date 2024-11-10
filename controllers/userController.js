const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv")

exports.register = async (req, res) => {
    try{
        const {name, email, age, password} = req.body

        if (!name || !email || !age || !password)  {
            return res.status(400).send({
                success : false,
                message : "provide all fields"
            })
        }

        const existingUser = await userModel.findOne({email}) 
        if(existingUser){
            return res.status(400).send({
                success : false,
                message : "email already present"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({name, email, age, password : hashPassword})

        await newUser.save()
    
        res.status(201).send({
            success : true,
            message : "new user created",
            user : newUser
        })
    }
    catch(e) {
        console.log(`error while regsitering user: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while regsitering user"
        })
    }

}

exports.getAllUsers = async (req,res) => {
    try{
        // console.log(req);
        
        const users = await userModel.find()
        res.status(200).send({
            success : true,
            message : "all users fetch successfully",
            userCount : users.length,
            user : users
        })
    }
    catch(e) {
        console.log(`error while getting all users: ${e}`)
        res.status(500).send({
            success : false,
            message : "error while getting all users"
        })
    }
    
}


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email}) 
        if(!user){
            return res.status(400).send({
                success : false,
                message : "email not present"
            })
        }
        // console.log(user);
        const isMatched = await bcrypt.compare(password, user.password)
        
        if (!isMatched){
            res.status(400).send({
                success : true,
                message : "password is wrong"
            })
        }
        const payload = {
            id : user._id, 
            name : user.name,
            email : user.email
        }

        const token = jwt.sign(payload, process.env.secret_key, {expiresIn : '5h'})
        res.status(200).send({
            success : true,
            message : " token generated ",
            token : `Bearer ${token}`
        })

        
    }
    catch(e) {
        console.log(`error while logging user: ${e}`)
        res.status(500).send({
            suceess : false,
            message : "error while logging user"
        })
        
    }
}