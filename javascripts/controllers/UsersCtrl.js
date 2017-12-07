'use strict';

app.controller("UsersCtrl", function($scope, UserService) {
    const getUsers = () => {
        UserService.getAllUsers().then((results) => {
            console.log(results);
        }).catch((error) => {
            console.log("error in getUsers", error);
        });
    };

    getUsers();
});