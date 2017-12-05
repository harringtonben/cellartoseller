'use strict';

app.controller("CellarCtrl", function($scope, UntappdService) {
    $scope.searchBeers = (event) => {
        if (event.keyCode === 13) {
            let query = event.target.value;
            UntappdService.getBeerData(query).then((results) => {
                let searchReturn = results.data.response.beers.items;
                console.log("Results for searchBeers", searchReturn);
            }).catch((error) => {
                console.log("Error in searchBeers", error);
            });
        }
    };
});