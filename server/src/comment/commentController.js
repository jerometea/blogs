const Comment = require('../comment/commentModel')
const Blog = require('../blog/blogModel')
const User = require('../user/userModel')

module.exports = {
    // Add Comment
    add: (req, res, next) => {

        let comment = new Comment({
            blog: req.body.blogId,
            author: req.user._id,
            text: req.body.text
        })

        comment.save((err, comment) => {
            if (err) next({ status: 400, message: err.message })
            else {
                // Promise Add Comment To Blog
                var blogPromise = Blog.findOne({ _id: req.body.blogId })
                    .then(blog => {
                        blog.comments.push(comment)
                        return blog.save()
                    })
                    .catch(err => next({ status: 400, message: err.message }))

                // Promise Add Comment To User
                var userPromise = User.findOne({ _id: req.user._id })
                    .select('+comments')
                    .then(user => {
                        user.comments.push(comment)
                        return user.save()
                    })
                    .catch(err => next({ status: 400, message: err.message }))

                // Promise.All
                Promise.all([blogPromise, userPromise])
                    .then(() => res.status(200).json(comment))
                    .catch(err => next({ status: 400, message: err.message }))
            }
        })
    }

}