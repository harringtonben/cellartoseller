'use strict';

app.controller("UsersCtrl", function($location, $rootScope, $scope, UserService) {
    const getUsers = () => {
        UserService.getAllUsers().then((results) => {
            $scope.users = results;
        }).catch((error) => {
            console.log("error in getUsers", error);
        });
    };

    getUsers();

    $scope.seeUserProfile = (userId) => {
        $location.path(`users/${userId}`);
    };

    $scope.startTrade = (receiverId) => {
        $rootScope.receiverId = receiverId;
        $location.path('/newtrade');
    };

});