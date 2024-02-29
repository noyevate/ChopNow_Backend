const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
    addAddress: async (req, res) => {
        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default,
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        try {
            if(req.body.default === "true") {
                await Address.updateMany({userId: req.user.id}, {default:false});
            }
            await newAddress.save();
            return res.status(201).json({status: true, message: "Address successfully created"})
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message})
        }
    },

    getAddress: async (req, res) => {
        try {
            const addresses = await Address.find({userId: req.user.id});
            return res.status(200).json(addresses);
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message});
        }
    },

    deleteAddress: async (req, res) => {
        try {
            await Address.findByIdAndDelete(req.params.id);
            return res.status(201).json({status: true, message: "Address successfully deleted"})
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message});
        }
    },

    setAddressDefault: async (req, res) => {
        const addressId = req.params.id;
        const userId = req.user.id;

        try {
            await Address.updateMany({userId: req.user.id}, {default:false});
            const updatedAddress =  await Address.findByIdAndUpdate(addressId, {default: true});
            if(updatedAddress){
                await Address.findByIdAndUpdate(userId, {address: addressId});
                return res.status(200).json({status: true, message: "Address successfully set at default"})
            } else {
                return res.status(400).json({status: false, mssage: "Address not found"});
            }
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message});
        }
    },
    
    getDefaultAddress: async (req, res) => {
        const userId = req.user.id

        try {
            const address = await Address.findOne({userId: userId, default:true})
            //console.log(address.addressLine1)
            res.status(200).json(address)
        } catch (error) {
            return res.status(500).json({status: false, mssage:error.message}); 
        }
    }
}