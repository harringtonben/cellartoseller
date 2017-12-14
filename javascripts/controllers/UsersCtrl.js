'use strict';

app.controller("UsersCtrl", function($location, $rootScope, $scope, AuthService, UserService) {
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
        let trade = UserService.createTradeObject(AuthService.getCurrentUid(), receiverId);
        UserService.newTrade(trade).then((results) => {
            $location.path(`/newtrade/${results.data.name}`);
        }).catch((error) => {
            console.log("Error in newTrade", error);
        }); 
    };

});