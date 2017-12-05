'use strict';

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthService) {
    $scope.authenticate = () => {
        AuthService.authenticateGoogle().then((results) => {
            $rootScope.uid = results.user.uid;
            $scope.$apply(() => {
                $location.url("/profile");
            });     
        }).catch((error) => {
            console.log("error in authenticate Google", error);
        });
    };
});