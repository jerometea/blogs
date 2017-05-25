const blog = require('./src/blog/route')
const comment = require('./src/comment/route')
const rating = require('./src/rating/route')
const user = require('./src/user/route')
const isLoggedIn = require('./middleware/auth')

module.exports = function (app) {

    // Don't protect register and connect routes
    app.use(user.unProtected)

    // Protect routes
    app.use(isLoggedIn)
    app.use(blog)
    app.use(comment)
    app.use(rating)
    app.use(user.protected)

    // Default route
    app.get('*', (req, res) => {
        res.redirect('/');
    })
    
}