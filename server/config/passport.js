const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../src/user/userModel')
const secret = require('./jwt').secret

module.exports = function (passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
    opts.secretOrKey = secret
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ username: jwt_payload.username })
            .then(user => done(null, user))
            .catch(err => done(err, false))
    }))
}