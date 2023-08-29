const mongoose = require('mongoose');

//Defining a Model. Models are defined through the Schema interface.
const addressSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true
    },
    customerAddress : 
    [
        {
            name:{
                type: String,
                required: true,
                trim: true,
                min: 3,
                max: 100,
            },
            mobileNumber: {
                type: String,
                required: true,
                trim: true,
            },
            pinCode: {
                type: String,
                required: true,
                trim: true,
            },
            locality: {
                type: String,
                required: true,
                trim: true,
                min: 5,
                max: 100,
            },
            Uaddress:{
                type: String,
                required: true,
                trim: true,
                min: 5,
                max: 100,
            },
            cityDistrictTown: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                min: 5, 
                max: 100,
            },
            alternatePhone: {
                type: String
            },
            addressType: {
                type: String,
                required: true,
                enum: ['home', 'Work'],
                required: true,
            }
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Address', addressSchema);
