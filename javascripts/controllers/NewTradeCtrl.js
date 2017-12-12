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
                                beer.uid = item.uid;
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
        }).catch((error) => {
            console.log("Error in getUserProfile", error);
        });
        
    };

    const getReceiverInventory = () => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
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
                                beer.uid = item.uid;
                                myInventory.push(beer);
                            }
                        });
                    });
                    $scope.receiverInventory = myInventory;
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

    $scope.addToTrade = (beerData, formData) => {
        let beerToTrade = TradeService.createTradeObject(beerData, formData);
        let tradeJoinItem = TradeService.createTradeDataObject(beerData, formData);
        TradeService.addBeerToTrade(tradeJoinItem).then((results) => {
            TradeService.updateInventory(beerToTrade, beerData.inventory_id).then((results) => {
                TradeService.getBeersInTrade($rootScope.tradeId).then((results) => {
                    console.log(results);
                }).catch((error) => {
                    console.log("error in getBeersInTrade", error);
                });
            }).catch((error) => {
                console.log("error in updateInventory", error);
            });
        }).catch((error) => {
            console.log("Error in addBeerToTrade", error);
        });
    };

});