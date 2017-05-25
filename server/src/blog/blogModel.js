const mongoose = require('mongoose')
const User = require('../user/userModel')
const Comment = require('../comment/commentModel')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment',
        required: false
    }],
    sumOfRatingPoint: {
        type: Number
    },
    numberOfRatings: {
        type: Number
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('Blog', BlogSchema)