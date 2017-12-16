'use strict';

app.controller("CellarCtrl", function($location, $scope, AuthService, CellarService, NgToastService, UntappdService) {
    const saveToInventory = (beerId, beerName) => {
        let beerObject = CellarService.createInventoryObject(beerId);
        CellarService.addToInventory(beerObject).then((results) => {
            NgToastService.toast(`${beerName} has been added to your inventory!`);
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
        let beerName = beer.beer.beer_name;
        CellarService.searchForBeer(beer.beer.bid).then((results) => {
            if (isEmpty(results.data) === true) {
                let newBeer = CellarService.createBeerObject(beer);
                CellarService.addToCellar(newBeer).then((results) => {
                    let newBeerId = results.data.name;
                    saveToInventory(newBeerId, beerName);
                }).catch((error) => {
                    console.log("Error in addToCellar");
                });
            } else {
                let beerFromInventory = Object.keys(results.data)[0];
                CellarService.getInventory(AuthService.getCurrentUid(), beerFromInventory).then((inventories) => {
                    if (isEmpty(inventories[0]) === true) {
                        saveToInventory(beerFromInventory, beerName);
                    } else {
                        NgToastService.toast('This beer is already in your inventory!');
                        $location.path("/profile");
                    }
                });
                
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