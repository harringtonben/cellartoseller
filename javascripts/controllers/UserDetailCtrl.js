'use strict';

app.controller("UserDetailCtrl", function($routeParams, $scope, UserService) {
    const getUserDetails = () => {
        let userInventory = [];
        let beerList = [];
        let inventory = [];
        UserService.getUserProfile($routeParams.id).then((result) => {
            $scope.userInfo = result.data;
            UserService.getUserInventory($scope.userInfo.uid).then((results) => {
                inventory = results;
                UserService.getUserBeers().then((results) => {
                    beerList = results;
                    beerList.forEach((beer) => {
                        inventory.forEach((item) => {
                            if (item.beer_id === beer.id) {
                                beer.for_trade = item.for_trade;
                                beer.number_for_trade = item.number_for_trade;
                                beer.quantity = item.quantity;
                                beer.inventory_id = item.id;
                                userInventory.push(beer);
                            }
                        });
                    });
                    $scope.inventory = userInventory;
                    console.log($scope.userInfo);
                    console.log($scope.inventory);
                }).catch((error) => {
                    console.log("Error in getMyBeers", error);
                });
            }).catch((error) => {
                console.log("Error in getUserInventory", error);
            });
        }).catch((error) => {
            console.log("Error in getUserDetails", error);
        });
    };

    getUserDetails();
});

