myApp.controller('blogDetails', function ($scope, $http, $stateParams, $window) {


    $http.get('/ratings/didrate/' + $stateParams.blogId)
        .then(rating => {
            $scope.didRate = rating.data.didRate
        })
        .catch(err => console.log('error blogDetails ', err))

    // Get Username
    $http.get('/users')
        .then(user => { $scope.username = user.data.username })

    // Get Blog, Average Rating and Commentaries
    $http.get('/blogs/' + $stateParams.blogId + '/comments')
        .then(blog => {
            let average = blog.data.sumOfRatingPoint / blog.data.numberOfRatings
            $scope.average = +average.toFixed(2)
            $scope.blog = blog.data
            $scope.comments = blog.data.comments
        })

    // Add Commentary
    $scope.addComment = () => {
        if (!$scope.commentary)
            return $window.alert('Veuillez écrire un commentaire')
        $http.post('/comments', {
            blogId: $stateParams.blogId,
            text: $scope.commentary
        })
            .success(savedComment => {
                $scope.commentary = ''
                let comment = {
                    author: { username: $scope.username },
                    text: savedComment.text,
                    createdAt: savedComment.createdAt
                }
                $scope.comments.push(comment)
            })
    }

    $scope.rate = () => {
        $http.post('/ratings', {
            blogId: $stateParams.blogId,
            value: $scope.ratingValue
        }).then(() => {
            $scope.didRate = true
        }).catch(err => console.log(err))
    }

})