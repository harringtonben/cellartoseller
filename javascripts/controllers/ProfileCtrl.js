'use strict';

app.controller("ProfileCtrl", function($location, $scope, AuthService, ProfileService) {
    const getInventory = () => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        ProfileService.getMyInventory(AuthService.getCurrentUid()).then((results) => {
            inventory = results;
            ProfileService.getMyBeers().then((results) => {
                beerList = results;
                beerList.forEach((beer) => {
                    inventory.forEach((item) => {
                        if (item.beer_id === beer.id) {
                            beer.for_trade = item.for_trade;
                            beer.number_for_trade = item.number_for_trade;
                            beer.quantity = item.quantity;
                            beer.inventory_id = item.id;
                            myInventory.push(beer);
                        }
                    });
                });
                $scope.inventory = myInventory;
            }).catch((error) => {
                console.log("Error in getMyBeers", error);
            });
        }).catch((error) => {
            console.log("error in getInventory", error);
        });
    };

    getInventory();

    $scope.updateInventory = (itemId) => {
        $location.path(`/inventory/${itemId}`);
    };
});