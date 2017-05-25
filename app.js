const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const database = require('./server/config/database').database
const errorHandler = require('./server/middleware/errorHandler')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

mongoose.Promise = global.Promise

mongoose.connect(database)

require('./server/config/passport')(passport)

require(__dirname + '/server/routes')(app)

app.use(errorHandler)

app.listen(port, () => {
    console.log('server running on port ' + port)
})
