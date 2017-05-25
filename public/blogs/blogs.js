myApp.controller('blogsController', function ($scope, $http, $window, pagination) {
    $scope.pageList = 0
    let currentPage = 0
    let itemsPerPage = 5
    let lastPage = 0

    // Get Username
    $http.get('/users').success(user => {
        $scope.username = user.username
    })

    // Fetch Blogs
    $http.get('/blogs/' + $scope.currentPage + '/' + itemsPerPage).success(blogs => {
        $scope.blogs = blogs.blogs
        $scope.lastPage = blogs.numberOfPages
        pagination.generateFirstPagination(blogs.numberOfPages, pagination => {
            $scope.pageList = pagination
            lastPage = blogs.numberOfPages
        })
    })

    // Publish Blog
    $scope.publish = () => {
        if (!$scope.text)
            return $window.alert('Veuillez rédiger un texte')
        $http.post('/blogs', {
            text: $scope.text
        })
            .success(blog => {
                blog.author = {}
                blog.author.username = $scope.username
                $scope.blogs.push(blog)
                $scope.text = ''
            })
            .error(err => console.log(err))
    }
    // Delete A Blog
    $scope.delete = blog_id => {
        $http.delete('/blogs/' + blog_id)
            .success(() => {
                let blog_index = $scope.blogs.map(blog => { return blog._id }).indexOf(blog_id)
                if (blog_index > -1) $scope.blogs.splice(blog_index, 1)
            })
            .error(err => console.log(err))
    }

    $scope.edit = blog => {
        blog.text_updated = blog.text
        blog.isEditing = !blog.isEditing
    }
    $scope.search = isSearching => {
        if (isSearching) {
            $scope.isSearching = isSearching
        }
        // Delete Search Result
        else {
            $scope.isSearching = false
            $scope.searchText = ''
            $http.get('/blogs/' + 0 + '/' + itemsPerPage).success(blogs => {
                $scope.currentPage = 0
                $scope.blogs = blogs.blogs
            })
        }
    }
    // Update A Blog
    $scope.save = blog => {
        blog.text = blog.text_updated
        $http.put('/blogs/' + blog._id, { text: blog.text_updated })
    }

    // Get Blogs By Page
    $scope.getList = () => {
        $http.get('/blogs/' + currentPage + '/' + itemsPerPage)
            .success(blogs => {
                $scope.blogs = []
                $scope.blogs = blogs.blogs
                $scope.lastPage = blogs.numberOfPages
                pagination.generatePageList(currentPage, $scope.pageList, lastPage, pagination => {
                    $scope.pageList = pagination
                })
            })
    }
    // Index Of The Page
    $scope.updateCurrentPageIndex = Page => {
        currentPage = Page
        $window.scrollTo(0, 0);
    }
    // Search Content
    $scope.searchBlog = () => {
        $http.get('/blogs/' + $scope.searchText).success(blogs => {
            $scope.blogs = []
            $scope.blogs = blogs
        })
    }

})