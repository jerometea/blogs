const Rating = require('../rating/ratingModel')
const Blog = require('../blog/blogModel')

module.exports = {

    // Add New Rating
    add: (req, res, next) => {
        let rating = new Rating({
            user: req.user._id,
            blog: req.body.blogId,
            value: req.body.value
        })
        rating.save()
            .then(savedRating => {
                Blog.findOneAndUpdate(
                    { _id: req.body.blogId },
                    { $inc: { sumOfRatingPoint: savedRating.value, numberOfRatings: 1 } },
                    { $set: true }
                )
                    .then(() => res.status(200).json(savedRating))
            })
            .catch(err => next({ status: 400, message: err.message }))
    },

    // Did User Has Already Rated A Blog
    didRate: (req, res, next) => {
        Rating.findOne({ user: req.user._id, blog: req.params.blogId })
            .then(foundRating => {
                if (foundRating)
                    res.status(200).json({ didRate: true })
                else
                    res.status(200).json({ didRate: false })
            })
            .catch(err => next({ status: 400, message: err.message }))
    }
}