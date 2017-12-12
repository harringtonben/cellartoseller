'use strict';

app.controller("TradeDetailCtrl", function($location, $rootScope, $routeParams, $scope, TradeDetailService) {
    $scope.finishTrade = () => {
        $location.path("/profile");
    };

    const getTradeDetails = () => {
        let ownerTrades = [];
        let receiverTrades = [];
        TradeDetailService.getTradeItems($routeParams.id).then((results) => {
            let tradeItems = results;
            TradeDetailService.getTradeUids($routeParams.id).then((results) => {
                let tradeUsers = results.data;
                TradeDetailService.getTradeUsers().then((results) => {
                    results.forEach((result) => {
                        if (result.uid === tradeUsers.owner_id) {
                            tradeUsers.owner_name = result.name;
                        } else if (result.uid === tradeUsers.receiver_id) {
                            tradeUsers.receiver_name = result.name;
                        }
                    });
                    $scope.usersInTrade = tradeUsers;
                    tradeItems.forEach((item) => {
                        if (item.uid === tradeUsers.owner_id) {
                            ownerTrades.push(item);
                        } else if (item.uid === tradeUsers.receiver_id) {
                            receiverTrades.push(item);
                        }
                    });
                    $scope.ownerTradeItems = ownerTrades;
                    $scope.receiverTradeItems = receiverTrades;
                    TradeDetailService.getBeers($routeParams.id).then((results) => {
                        results.forEach((result) => {
                            $scope.ownerTradeItems.forEach((item) => {
                                if (item.beerid === result.id) {
                                    item.beer_name = result.beer_name;
                                    item.brewery_name = result.brewery_name;
                                }
                            });
                        });
                        results.forEach((result) => {
                            $scope.receiverTradeItems.forEach((item) => {
                                if (item.beerid === result.id) {
                                    item.beer_name = result.beer_name;
                                    item.brewery_name = result.brewery_name;
                                }
                            });
                        });
                        TradeDetailService.getInventory().then((results) => {
                            results.forEach((result) => {
                                $scope.ownerTradeItems.forEach((item) => {
                                    if (item.beerid === result.beer_id) {
                                        item.number_for_trade = result.number_for_trade;
                                    }
                                });
                            });
                            results.forEach((result) => {
                                $scope.receiverTradeItems.forEach((item) => {
                                    if (item.beerid === result.beer_id) {
                                        item.number_for_trade = result.number_for_trade;
                                    }
                                });
                            });
                        }).catch((error) => {
                            console.log("error in getInventory", error);
                        });
                    }).catch((error) => {
                        console.log("error in getInventory", error);
                    });
                }).catch((error) => {
                    console.log("error in getTradeUsers", error);
                });
            }).catch((error) => {
                console.log("error in getTradeUids", error);
            });
        }).catch((error) => {
            console.log("error in getTradeItems", error);
        });
    };

    getTradeDetails();

    $scope.updateTrade = (trade) => {
        let oldTradeNumber;
        let updatedNumber;
        let updatedTradeData = TradeDetailService.createTradeDataObject(trade);
        let newTradeNumber = JSON.parse(updatedTradeData.numberintrade);
        TradeDetailService.getTrade(trade.id).then((results) => {
            oldTradeNumber = JSON.parse(results.data.numberintrade);
            TradeDetailService.updateTradeDetails(updatedTradeData, trade.id).then((results) => {
                if (oldTradeNumber > newTradeNumber) {
                    updatedNumber = oldTradeNumber - newTradeNumber;
                    TradeDetailService.getTradeInventory(trade.inventoryid).then((results) => {
                        let inventoryObject = results.data;
                        inventoryObject.quantity = JSON.parse(inventoryObject.quantity) + updatedNumber;
                        inventoryObject.number_for_trade = JSON.parse(inventoryObject.number_for_trade) + updatedNumber;
                        TradeDetailService.updateTradeInventory(inventoryObject, trade.inventoryid).then((results) => {
                            getTradeDetails();
                        }).catch((error) => {
                            console.log("error in updateTradeInventory", error);
                        });
                    }).catch((error) => {
                        console.log("error in getTradeInventory", error);
                    });
                } else if (newTradeNumber > oldTradeNumber) {
                    updatedNumber = newTradeNumber - oldTradeNumber;
                    TradeDetailService.getTradeInventory(trade.inventoryid).then((results) => {
                        let inventoryObject = results.data;
                        inventoryObject.quantity = JSON.parse(inventoryObject.quantity) - updatedNumber;
                        inventoryObject.number_for_trade = JSON.parse(inventoryObject.number_for_trade) - updatedNumber;
                        TradeDetailService.updateTradeInventory(inventoryObject, trade.inventoryid).then((results) => {
                            getTradeDetails();
                        }).catch((error) => {
                            console.log("error in updateTradeInventory", error);
                        });
                    }).catch((error) => {
                        console.log("error in getTradeInventory", error);
                    });
                }
            }).catch((error) => {
                console.log("error in updateTradeDetails", error);
            });
        }).catch((error) => {
            console.log("error in getTrade", error);
        });
           
    };
});