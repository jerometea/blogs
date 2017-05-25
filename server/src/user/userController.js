const User = require('./userModel')
const jwt = require('jsonwebtoken')
const secret = require('../../config/jwt').secret

module.exports = {

    // Register New User
    register: (req, res, next) => {

        if (!req.body.username || !req.body.password || req.body.password.length < 5 || req.body.username.length < 5)
            res.status(400).send('Please enter an username and a password of min. 5 char. ')
        else {
            let newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            newUser.save()
                .then(() => res.status(200).json('Successfully created'))
                .catch(() => next({ status: 409, message: 'Username already exists' }))
        }
    },

    // Authenticate An User
    authenticate: (req, res, next) => {
        User.findOne({ username: req.body.username })
            .select('+password')
            .then(user => {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch) {
                        let token = jwt.sign({ username: user.username }, secret)
                        res.status(200).json({ token: 'JWT ' + token })
                    }
                    else next({ status: 401, message: { status: 401, message: 'Password did not match' } })
                })
            })
            .catch(() => next({ status: 404, message: { status: 404, message: 'Username does not exist' } }))
    },

    // Get Username
    getUsername: (req, res, next) => {
        if (req.user) {
            res.status(200).json({ username: req.user.username })
        }
        else
            next({ status: 404, message: 'Username not found in token ' })
    }
}