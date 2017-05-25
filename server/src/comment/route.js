const comment = require('./commentController')
const router = require('express').Router()

router.post('/comments', comment.add)

module.exports = router