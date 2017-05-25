var myApp = angular.module('myApp', ['ui.router'])
    .config(function ($locationProvider, $httpProvider, $stateProvider) {
        $stateProvider
            .state('/', {
                url : '/',
                templateUrl: 'home/home.html',
                controller: 'homeController'
            })
            .state('blogs', {
                url : '/blogs',                
                templateUrl: 'blogs/blogs.html',
                controller: 'blogsController'
            })
            .state('blogDetails',{
                url:'blogs/:blogId/comments',
                templateUrl: 'blogDetails/blogDetails.html',
                controller: 'blogDetails'
            })
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

    })
    .factory('authInterceptor', function ($window, $location) {
        return {
            request: function (config) {
                if ($window.localStorage.token) {
                    config.headers.Authorization = $window.localStorage.token
                }
                return config
            }
        }
    })