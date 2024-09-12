const mongoose = require('mongoose');


const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    acctBalance:{
        type: Number,
        default: 0
    },
    isVerified:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type:String,
        default:createdOn
    },
    blacklist : {
        type: Array,
        default: [],
    }
})

const userModel  = mongoose.model('user', userSchema)

module.exports = userModel