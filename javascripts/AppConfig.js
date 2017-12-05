'use strict';

app.config(function($routeProvider) {
    $routeProvider
    .when("/auth", {
       templateUrl: 'partials/auth.html',
       controller: 'AuthCtrl' 
    })
    .when("/addtocellar", {
        templateUrl: 'partials/cellar/addtocellar.html',
        controller: 'CellarCtrl'
    })
    .when("/users", {
        templateUrl: 'partials/users/users.html',
        controller: 'UsersCtrl'
    })
    .when("/profile", {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
    })
    .otherwise("/auth");
});