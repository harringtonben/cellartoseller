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
            let beerToCheck = results[0];
            console.log(beer.beer.bid);
            console.log(beerToCheck.untappd_bid); 
            if (beer.beer.bid === JSON.parse(beerToCheck.untappd_bid)) {
                console.log("this beer is already saved!!");
            } 
        }).catch((error) => {
            console.log("Error in searchForBeer", error);
        });

        // let beerToSave = CellarService.createBeerObject(beer);
        // CellarService.addToCellar(beerToSave).then((results) => {
        //     console.log(results);
        // }).catch((error) => {
        //     console.log("Error in saveToCellar", error);
        // });
    };
});