myApp.controller('navController', function ($scope, $window, $rootScope) {

    $scope.isConnected = $window.localStorage.token ? true : false

    // Change button "Accueil" to "Deconnexion" when the user login
    $rootScope.$on('onConnect', () => {
        $scope.isConnected = true
    })

    // Disconnect
    $scope.disconnect = () => {
        $window.localStorage.clear()
        $scope.isConnected = false
    }
})