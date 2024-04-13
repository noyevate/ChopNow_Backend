const User = require('../models/User');
const jwt = require('jsonwebtoken')
module.exports = {
    getUser: async(req, res) => {
        try {
            const user = await User.findById(req.user.id)
            const {password, __v, createdAt, ...userData} = user._doc
            res.status(200).json(userData)
        } catch (error) {
            return res.status(500).json({status: false, message: error.message})
        }
    },

    verifyAccount: async( req, res) => {
        const userOtp = req.params.otp;

        try {
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(500).json({status: false, message: "user not found"})
            }
            if(userOtp === user.otp) {
                user.verification = true;
                user.otp = "none";
                await user.save();
                const userToken = jwt.sign({
                    id: user._id,
                    userType: user.userType,
                    email: user.email
                }, process.env.JWT_SECRET, {expiresIn: "50d"})
                const {password, __v, otp, createdAt, ...others} = user._doc

                res.status(200).json({...others})
            } else {
                return res.status(400).json({status: false, message: "Otp verification failed"})
            }
        } catch (error) {
            return res.status(500).json({status: false, mssage: error.message})
        }
    },
    verifyPhone: async(req, res) =>{
        const phone = req.params.phone;
        try {
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(500).json({status: false, message: "user not found"})
            }
            
                user.phoneVerification = true;
                user.otp = phone;
                await user.save();
                const {password, __v, otp, createdAt, ...others} = user._doc

                res.status(200).json({...others})
            
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message})
        }
    },
    deleteUser: async(req, res) => {
        try {
             await User.findByIdAndDelete(req.user.id)
           
            res.status(200).json({status: true, message: "User successfully deleted"})
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message})
        }
    },
}