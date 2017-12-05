'use strict';

app.controller("CellarCtrl", function($scope, UntappdService) {
    $scope.searchBeers = (event) => {
        if (event.keyCode === 13) {
            let query = event.target.value;
            // console.log(event.target.value);
            UntappdService.getBeerData(query).then((results) => {
                console.log("Results for searchBeers", results);
            }).catch((error) => {
                console.log("Error in searchBeers", error);
            });
        }
    };
});