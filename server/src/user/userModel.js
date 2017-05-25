const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const Comment = require('../comment/commentModel')

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    comments: { type: [{ type: Schema.ObjectId, ref: 'Comment' }], select: false }
})

UserSchema.pre('save', function (next) {
    let user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) next(err)
                    user.password = hash
                    next()
                })
            })
            .catch(err => next(err))
    } else next()
})

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)
