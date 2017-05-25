const mongoose = require('mongoose')
const User = require('../user/userModel')
const Blog = require('../blog/blogModel')
const Schema = mongoose.Schema

const CommentSchema =  new Schema({
    blog : {
        type: Schema.ObjectId,
        ref:'Blog',
        required: true
    },
    author : { 
        type:  Schema.ObjectId,
        ref:'User',
        required: true
    },
    text : {
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', CommentSchema)