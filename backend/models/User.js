var mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
    }, age: {
        type: String,
        required: true,
    }, password: {
        type: String,
        required: true,
    }, role: {
        type: String,
        enum: ['user','admin'], // Allowed roles
        default: 'user', // Default role
    },  profileImagePath: { // Add this field 
        type: String,
        required: false
    },
} );

const User = mongoose.model('User',userSchema) 

module.exports= User;