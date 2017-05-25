const mongoose = require('mongoose')
const User = require('../user/userModel')
const Blog = require('../blog/blogModel')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    blog: { type: Schema.ObjectId, ref: 'Blog' },
    value: { type: Number, default: 1, required: true }
})

module.exports = mongoose.model('Rating', RatingSchema)