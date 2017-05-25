myApp.controller('homeController', function ($scope, $http, $window, $location, $rootScope) {

    if (localStorage.token)
        $location.path('/blogs')

    // Register
    $scope.register = () => {
        if (!$scope.newUsername || !$scope.newPassword || !$scope.newRetypePassword) {
            return $window.alert('Veuillez entrer un nom d\'utilisateur et un mot de passe supérieurs à 5 caractères.')
        }
        if ($scope.newPassword !== $scope.newRetypePassword) {
            return $window.alert('Les mots de passe ne sont pas identiques')
        }
        $http.post('/users', { username: $scope.newUsername, password: $scope.newPassword })
            .success(() => $window.alert('Inscription réussie vous pouvez maintenant vous connecter'))
            .error(() => $window.alert('L\'utilisateur ' + $scope.newUsername + ' existe déjà. Veuillez en choisir un autre.'))
    }

    // Authenticate
    $scope.authenticate = () => {
        if (!$scope.username || !$scope.username) {
            return $window.alert('Veuillez remplir tous les champs')
        }
        $http.post('/users/authentication', {
            username: $scope.username,
            password: $scope.password
        }).success(res => {
            $window.localStorage.token = res.token
            $location.path('/blogs')
            $rootScope.$emit('onConnect')
        }).error(err => {
            if (err.status === 401) $window.alert('Mot de passe incorrect')
            else if (err.status === 404) $window.alert('L\'utilisateur ' + $scope.username + ' n\'existe pas')
        })
    }

})