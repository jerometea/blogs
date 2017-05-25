const blog = require('./blogController')
const router = require('express').Router()

// Post
router.post('/blogs', blog.insert)

// Delete
router.delete('/blogs/:id', blog.delete)

// Put
router.put('/blogs/:id', blog.update)

// Get
router.get('/blogs/:text', blog.searchContent)
router.get('/blogs/:id/comments', blog.getBlogById)
router.get('/blogs/:currentPage/:itemsPerPage', blog.getList)

module.exports = router
