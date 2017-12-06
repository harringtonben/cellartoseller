'use strict';

app.controller("CellarCtrl", function($scope, CellarService, UntappdService) {
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

    $scope.saveToCellar = (beer) => {
        CellarService.searchForBeer(beer.beer.bid).then((results) => {
            if (isEmpty(results.data) === true) {
                let newBeer = CellarService.createBeerObject(beer);
                CellarService.addToCellar(newBeer).then((results) => {
                    console.log(results);
                }).catch((error) => {
                    console.log("Error in addToCellar");
                });
            } else {
                console.log("This beer is already saved!!!");
            }
        }).catch((error) => {
            console.log("Error in searchForBeer", error);
        });
    };

    const isEmpty = (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    };
    
});