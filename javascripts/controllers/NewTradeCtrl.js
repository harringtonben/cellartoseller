'use strict';

app.controller("NewTradeCtrl", function($rootScope, $scope, AuthService, TradeService) {
    const getMyInventory = () => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        let profile = [];
        TradeService.getUserProfile(AuthService.getCurrentUid()).then((results) => {
            $scope.myProfile = results;
            TradeService.getUserInventory(AuthService.getCurrentUid()).then((results) => {
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
                                myInventory.push(beer);
                            }
                        });
                    });
                    $scope.inventory = myInventory;
                    console.log($scope.inventory);
                    console.log($scope.myProfile);
                }).catch((error) => {
                    console.log("Error in getMyBeers", error);
                });
            }).catch((error) => {
                console.log("error in getInventory", error);
            });
        }).catch((error) => {
            console.log("Error in getUserProfile", error);
        });
        
    };

    const getReceiverInventory = () => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        console.log($rootScope.receiverId);
        TradeService.getUserProfile($rootScope.receiverId).then((results) => {
            $scope.receiverProfile = results;
            TradeService.getUserInventory($rootScope.receiverId).then((results) => {
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
                                myInventory.push(beer);
                            }
                        });
                    });
                    $scope.receiverInventory = myInventory;
                    console.log($scope.receiverInventory);
                    console.log($scope.receiverProfile);
                }).catch((error) => {
                    console.log("Error in getMyBeers", error);
                });
            }).catch((error) => {
                console.log("error in getInventory", error);
            });
        }).catch((error) => {
            console.log("Error in getUserProfile", error);
        });
        
    };

    getMyInventory();
    getReceiverInventory();

});