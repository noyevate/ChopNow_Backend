const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendEmail = require("../utils/smtp_fuction");



module.exports = {
    createUser: async(req, res) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(req.body.email)){
            return res.status(404).json({status: false, message: "email not valid"})
        }
        const minPasswordLength = 8;
        if(req.body.password < minPasswordLength){
            return res.status(404).json({status: false, message: "password should be at least" + minPasswordLength + "characters"})
        }

        try {
            const emailExists = await User.findOne({email: req.body.email});
            if(emailExists){
                return res.status(404).json({status: false, message: "email already exist"})
            }
            //generate otp
            const otp = generateOtp();
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                userType: req.body.userType,
                password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
                otp: otp,
            });
            // save User
            await newUser.save();

            //send email
            sendEmail(newUser.email, otp)


            return res.status(201).json({status: true, message: "User successfully created"})
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message})
        }
    },
    loginUser: async(req, res) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(req.body.email)){
            return res.status(404).json({status: false, message: "email not valid"})
        }
        const minPasswordLength = 8;
        if(req.body.password < minPasswordLength){
            return res.status(404).json({status: false, message: "password should be at least" + minPasswordLength + "characters"})
        }


        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(404).json({status: false, message: "user not found"}) 
            }
            const decryptedPassword =  CryptoJs.AES.decrypt(user.password, process.env.SECRET)
            const dePassword = decryptedPassword.toString(CryptoJs.enc.Utf8);

            if(dePassword !== req.body.password){
                return res.status(404).json({status: false, message: "Wrong Password"})
            }

            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,

            }, process.env.JWT_SECRET, {expiresIn: "100h"});
            
            const {password,otp,createdAt,updatedAt, ...others} = user._doc;
            res.status(200).json({...others, userToken})
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message})
        }
    }
}