'use strict';

app.controller("CellarCtrl", function($location, $scope, CellarService, UntappdService) {
    const saveToInventory = (beerId) => {
        let beerObject = CellarService.createInventoryObject(beerId);
        CellarService.addToInventory(beerObject).then((results) => {
            $location.path('/profile');
        }).catch((error) => {
            console.log("Error in addToCellar", error);
        });
    };

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
                    let newBeerId = results.data.name;
                    saveToInventory(newBeerId);
                }).catch((error) => {
                    console.log("Error in addToCellar");
                });
            } else {
                let beerFromInventory = Object.keys(results.data);
                saveToInventory(beerFromInventory[0]);
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