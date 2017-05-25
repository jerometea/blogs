const Blog = require('./blogModel')

module.exports = {

    // Save A New Blog
    insert: (req, res, next) => {
        let blog = new Blog({
            author: req.user._id,
            text: req.body.text
        })
        blog.save((err, success) => {
            if (err) next({ status: 400, message: err.message })
            else res.status(200).json(blog)
        })
    },

    // Delete Blog
    delete: (req, res, next) => {
        let id = req.params.id
        Blog.remove({ _id: id }).exec((err, success) => {
            if (err) next({ status: 400, message: err.message })
            else res.status(200).json('Blog : ' + id + ' has been deleted')
        })
    },

    // Update
    update: (req, res, next) => {
        let id = req.params.id
        let text = req.body.text
        let updatedAt = new Date()
        Blog.findByIdAndUpdate({ _id: id }, { $set: { text, updatedAt } }, (err, success) => {
            console.log(success)
            if (err) next({ status: 400, message: err.message })
            else res.status(200).json(success)
        })
    },

    // Fetch Blogs By Page
    getList: (req, res, next) => {
        let currentPage = req.params.currentPage
        let itemsPerPage = Number(req.params.itemsPerPage)
        Blog.count({})
            .then(count => {
                Blog.find({})
                    .limit(itemsPerPage)
                    .populate('author')
                    .skip(itemsPerPage * currentPage)
                    .sort({ createdAt: -1 })
                    .exec((err, blogs) => {
                        if (err) next({ status: 400, message: err.message })
                        else {
                            let numberOfPages = Math.ceil(count / itemsPerPage)
                            res.status(200).json({ blogs, numberOfPages })
                        }
                    })
            })
            .catch(err => next({ status: 400, message: err.message }))
    },

    // Search Content
    searchContent: (req, res, next) => {
        let contentToSearch = req.params.text
        Blog.find({ 'text': new RegExp(contentToSearch, "i") }, (err, doc) => {
            if (err) next({ status: 400, message: err.message })
            else res.status(200).json(doc)
        });
    },

    /* 
    Get One Blog
    Populate With The Author
    Populate With The Comments 
    Populate Comments With The Reviewers Username */
    getBlogById: (req, res) => {
        Blog.findOne({ _id: req.params.id })
            .populate('author')
            .populate({ path: 'comments', populate: { path: 'author' } })
            .exec((err, success) => {
                if (err) next({ status: 400, message: err.message })
                else res.status(200).json(success)
            })
    }

}