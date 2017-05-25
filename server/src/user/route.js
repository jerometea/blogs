const user = require('./userController')
const userProtected = require('express').Router(),
    userUnprotected = require('express').Router()


userUnprotected.post('/users', user.register)

userUnprotected.post('/users/authentication', user.authenticate)

userProtected.get('/users', user.getUsername)

module.exports = {
    unProtected : userUnprotected,
    protected : userProtected
}