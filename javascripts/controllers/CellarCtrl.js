'use strict';

app.controller("CellarCtrl", function($scope, UntappdService) {
    $scope.searchBeers = (event) => {
        if (event.keyCode === 13) {
            let query = event.target.value;
            UntappdService.getBeerData(query).then((results) => {
                $scope.beers = results.data.response.beers.items;
                event.target.value = '';
            }).catch((error) => {
                console.log("Error in searchBeers", error);
            });
        }
    };
});