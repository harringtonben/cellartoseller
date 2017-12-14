'use strict';

app.controller("NewTradeCtrl", function($location, $rootScope, $routeParams, $scope, AuthService, TradeService) {
    const getTradeDetails = () => {
        TradeService.getTradeInfo($routeParams.id).then((results) => {
            $scope.tradeInfo = results.data;
            getMyInventory($scope.tradeInfo.owner_id);
            getReceiverInventory($scope.tradeInfo.receiver_id);
        }).catch((error) => {

        });
    };

    getTradeDetails();

    const getMyInventory = (ownerId) => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        let profile = [];
        TradeService.getUserProfile(ownerId).then((results) => {
            $scope.myProfile = results;
            TradeService.getUserInventory(ownerId).then((results) => {
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

    const getReceiverInventory = (receiverId) => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        TradeService.getUserProfile(receiverId).then((results) => {
            $scope.receiverProfile = results;
            TradeService.getUserInventory(receiverId).then((results) => {
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

    $scope.addToTrade = (beerData, formData) => {
        let beerToTrade = TradeService.createTradeObject(beerData, formData, $scope.tradeInfo.owner_id);
        let tradeJoinItem = TradeService.createTradeDataObject(beerData, formData, $routeParams.id);
        TradeService.addBeerToTrade(tradeJoinItem).then((results) => {
            TradeService.updateInventory(beerToTrade, beerData.inventory_id).then((results) => {
                TradeService.getBeersInTrade($routeParams.id).then((results) => {
                    let tradeItems = results;
                    getMyInventory($scope.tradeInfo.owner_id);
                    getReceiverInventory($scope.tradeInfo.receiver_id);
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

    $scope.cancelTrade = () => {
        TradeService.deleteTrade($routeParams.id).then((results) => {
            console.log(results);
        }).catch((error) => {
            console.log(error);
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
        let beerToTrade = TradeService.createTradeObject(beerData, formData, $scope.tradeInfo.receiver_id);
        let tradeJoinItem = TradeService.createTradeDataObject(beerData, formData, $routeParams.id);
        TradeService.addBeerToTrade(tradeJoinItem).then((results) => {
            TradeService.updateInventory(beerToTrade, beerData.inventory_id).then((results) => {
                TradeService.getBeersInTrade($routeParams.id).then((results) => {
                    let tradeItems = results;
                    getMyInventory($scope.tradeInfo.owner_id);
                    getReceiverInventory($scope.tradeInfo.receiver_id);
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