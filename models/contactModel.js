const mongoose = require('mongoose');


const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})


const contactSchema = new mongoose.Schema({

    email: {
        type: String,
        required:true,
    },
    fullName: {
        type: String,
        required:true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required:true,
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

const contactModel  = mongoose.model('contact', contactSchema)

module.exports = contactModel