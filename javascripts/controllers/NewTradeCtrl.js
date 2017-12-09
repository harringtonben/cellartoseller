'use strict';

app.controller("NewTradeCtrl", function($rootScope, $scope, AuthService, TradeService) {
    const getUserDetails = (userId) => {
        let userInventory = [];
        let beerList = [];
        let inventory = [];
        TradeService.getUserProfile(userId).then((result) => {
            $scope.userInfo = result.data;
            TradeService.getUserInventory(userId).then((results) => {
                inventory = results;
                TradeService.getUserBeers().then((results) => {
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

    getUserDetails(AuthService.getCurrentUid);
    // getUserDetails($rootScope.receiverId);
});