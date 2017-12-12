'use strict';

app.controller("NewTradeCtrl", function($location, $rootScope, $scope, AuthService, TradeService) {
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
        let beerToTrade = TradeService.createTradeObject(beerData, formData, AuthService.getCurrentUid());
        let tradeJoinItem = TradeService.createTradeDataObject(beerData, formData);
        TradeService.addBeerToTrade(tradeJoinItem).then((results) => {
            TradeService.updateInventory(beerToTrade, beerData.inventory_id).then((results) => {
                TradeService.getBeersInTrade($rootScope.tradeId).then((results) => {
                    let tradeItems = results;
                    getMyInventory();
                    getReceiverInventory();
                    getTradeData(tradeItems);
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

    $scope.finishTrade = () => {
        $location.path("/profile");
    };

    const getTradeData = (tradeItems) => {
        let myInventoryInTrade = [];
        let receiverInventoryInTrade = [];
        tradeItems.forEach((item) => {
            $scope.inventory.forEach((ownerItem) => {
                if (item.beerid === ownerItem.id) {
                    item.beer_name = ownerItem.beer_name;
                    item.brewery_name = ownerItem.brewery_name;
                    myInventoryInTrade.push(item);
                } 
            });
            $scope.receiverInventory.forEach((receiverItem) => {
                if (item.beerid === receiverItem.id) {
                    item.beer_name = receiverItem.beer_name;
                    item.brewery_name = receiverItem.brewery_name;
                    receiverInventoryInTrade.push(item);
                }   
            });
        });
        $scope.myTradeInventory = myInventoryInTrade;
        $scope.receiverTradeInventory = receiverInventoryInTrade;       
    };

    $scope.receiverAddToTrade = (beerData, formData) => {
        let beerToTrade = TradeService.createTradeObject(beerData, formData, $rootScope.receiverId);
        let tradeJoinItem = TradeService.createTradeDataObject(beerData, formData);
        TradeService.addBeerToTrade(tradeJoinItem).then((results) => {
            TradeService.updateInventory(beerToTrade, beerData.inventory_id).then((results) => {
                TradeService.getBeersInTrade($rootScope.tradeId).then((results) => {
                    let tradeItems = results;
                    getMyInventory();
                    getReceiverInventory();
                    getTradeData(tradeItems);
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