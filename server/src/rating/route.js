const rating = require('./ratingController')
const router = require('express').Router()

router.post('/ratings', rating.add)
router.get('/ratings/didrate/:blogId', rating.didRate)

module.exports = router