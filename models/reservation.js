const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String
    },
    occassion: { 
        type: String, 
        required: true, 
        trim: true
    },
    partySize: { 
        type: Number, 
        required: true
    },
    tableRequired: {
        type: Number,
        required: true
    },
    date: { 
        type: Date,
        required: true
    },
    startingTime: {
        type: String,
        required: true
    },
    endingTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
