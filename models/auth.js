const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Defining a Model
//Models are defined through the Schema interface.
//const Schema = mongoose.Schema;
const authSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, { timestamps: true });

//virtual setter method
// it takes parameter
authSchema.virtual('password')
    .set(function(password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

//methods 
authSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compare(password, this.hash_password);
    }
}

//accessing a model
module.exports = mongoose.model('auth', authSchema);