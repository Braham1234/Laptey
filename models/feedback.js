const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({

    fullName: { 
        type: String, 
        required: true, 
        trim: true
    },
    email: { 
        type: String, 
        required: true
    },
    stars: {
        type: String
    },
    response: { 
        type: String,
        required: true,
        maxLength: 1000
    }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
