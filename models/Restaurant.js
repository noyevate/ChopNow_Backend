const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    title: {type: String, required:true},
    time: {type: String, required:true},
    imageUrl: {type: String, required:true},
    foods: {type: Array, default:[]},
    pickup: {type: Boolean, default:true},
    delivery: {type: Boolean, default:true},
    isAvailabe: {type: Boolean, default:true},
    owner: {type: String, default:true},
    code: {type: String, required:true},
    logoUrl: {type: String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'Vendor', required:true},
    rating: {type: Number, min:1, max:5, default:3},
    ratingCount: {type: String, default: 267},
    verification: {type: String, default:"Pending", enum: ["Pending", "Verified", "Rejected"]},
    verificationMessage: {type: String, default:"Your restaurant is under review, we will notify you once it is verified"},
    coords: {
        id: {type: String},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, default: 0.0122},
        longitudeDelta: {type: Number, default: 0.0122},
        address: {type: String, required:true},
        title: {type: String, required:true},
    },
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema)



//  makorstaurant@gmail.com

//samuelnoye35@gmail.com
//password123456789


// shoprite ilorin

// University of ilorin

// Stay at the door