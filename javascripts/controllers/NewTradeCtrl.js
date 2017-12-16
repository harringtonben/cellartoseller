'use strict';

app.controller("NewTradeCtrl", function($location, $rootScope, $routeParams, $scope, AuthService, NgToastService, TradeService) {
    const getTradeDetails = () => {
        TradeService.getTradeInfo($routeParams.id).then((results) => {
            let ownerId = results.data.owner_id;
            let receiverId = results.data.receiver_id;
            $scope.tradeInfo = results.data;
            getMyInventory(ownerId);
            getReceiverInventory(receiverId);
        }).catch((error) => {
            console.log("error in getTradeInfo", error);
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
                });
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
                });
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
                    NgToastService.toast(`${beerData.beer_name} has been added to the trade!`);
                });
            });
        }).catch((error) => {
            console.log("Error in addBeerToTrade", error);
        });
    };

    $scope.cancelTrade = () => {
        TradeService.deleteTrade($routeParams.id).then((results) => {
            TradeService.getBeersInTrade($routeParams.id).then((tradeItems) => {  
                if (tradeItems.length === 0) {
                    $location.path("/profile");
                }else {
                    tradeItems.forEach((item) => {
                        TradeService.getSingleInventoryItem(item.inventoryid).then((results) => {
                            let inventory = results.data;
                            inventory.quantity = inventory.quantity + JSON.parse(item.numberintrade);
                            inventory.number_for_trade = inventory.number_for_trade + JSON.parse(item.numberintrade);
                            TradeService.updateInventory(inventory, item.inventoryid).then((result) => {
                                TradeService.deleteTradeItems(item.id).then((result) => {
                                    NgToastService.toast('Trade has been cancelled');
                                    $location.path("/profile");
                                });
                            });
                        });
                    });
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    $scope.finishTrade = () => {
        NgToastService.toast('Trade has been submitted');
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
                    NgToastService.toast(`${beerData.beer_name} has been added to the trade!`);
                });
            });
        }).catch((error) => {
            console.log("Error in addBeerToTrade", error);
        });
    };

    

});