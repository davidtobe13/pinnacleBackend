const mongoose = require('mongoose');


const currentDate = new Date();
const createdOn = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
})


const newsSchema = new mongoose.Schema({

    email: {
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

const newsModel  = mongoose.model('news', newsSchema)

module.exports = newsModel