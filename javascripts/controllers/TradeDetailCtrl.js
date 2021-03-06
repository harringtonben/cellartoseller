'use strict';

app.controller("TradeDetailCtrl", function($location, $rootScope, $routeParams, $scope, NgToastService, AuthService, TradeDetailService) {
    $scope.acceptTrade = (trade) => {
        TradeDetailService.getTradeUids(trade[0].tradeid).then((results) => {
            let acceptedTrade = results.data;
            acceptedTrade.is_accepted = "true";
            TradeDetailService.updateTrade(acceptedTrade, trade[0].tradeid).then((results) => {
                NgToastService.toast('Trade accepted!');
                $location.path("/profile");
            });
        }).catch((error) => {
            console.log("error in getTradeUids", error);
        });
    };

    const currentUser = () => {
        $scope.tradeUser = AuthService.getCurrentUid();
    };

    currentUser();

    const deleteReceiverTrades = (receiverItems) => {
        receiverItems.forEach((item) => {
            TradeDetailService.getTradeInventory(item.inventoryid).then((results) => {
                let inventoryItem = results.data; 
                inventoryItem.quantity = JSON.parse(inventoryItem.quantity) + JSON.parse(item.numberintrade);
                inventoryItem.number_for_trade = JSON.parse(inventoryItem.number_for_trade) + JSON.parse(item.numberintrade);
                TradeDetailService.updateTradeInventory(inventoryItem, item.inventoryid).then((results) => {
                    TradeDetailService.deleteTradeData(item.id).then(() => {
                        TradeDetailService.deleteTrade(item.tradeid).then(() => {
                            NgToastService.toast('This trade has been denied.');
                            $location.path("/profile");
                        });
                    });
                });
            }).catch((error) => {
                console.log("error in getTradeInventory", error);
            });
        });
    };

    $scope.denyTrade = (ownerItems, receiverItems) => {
        if (ownerItems.length === 0 && receiverItems.length === 0) {
            TradeDetailService.deleteTrade($routeParams.id).then(() => {
                NgToastService.toast('This trade has been denied.');
                $location.path("/profile");
            });
        } else if (ownerItems.length === 0 && receiverItems.length !== 0) {
            deleteReceiverTrades(receiverItems);
        } else if (ownerItems.length !== 0 && receiverItems.length === 0) {
            ownerItems.forEach((item) => {
                TradeDetailService.getTradeInventory(item.inventoryid).then((results) => {
                    let inventoryItem = results.data; 
                    inventoryItem.quantity = JSON.parse(inventoryItem.quantity) + JSON.parse(item.numberintrade);
                    inventoryItem.number_for_trade = JSON.parse(inventoryItem.number_for_trade) + JSON.parse(item.numberintrade);
                    TradeDetailService.updateTradeInventory(inventoryItem, item.inventoryid).then((results) => {
                        TradeDetailService.deleteTradeData(item.id).then(() => {
                            
                        });
                    });
                }).catch((error) => {
                    console.log("error in getTradeInventory", error);
                });
            });
            TradeDetailService.deleteTrade($routeParams.id).then(() => {
                NgToastService.toast('This trade has been denied.');
                $location.path("/profile"); 
            }); 
        } else {
            ownerItems.forEach((item) => {
                TradeDetailService.getTradeInventory(item.inventoryid).then((results) => {
                    let inventoryItem = results.data; 
                    inventoryItem.quantity = JSON.parse(inventoryItem.quantity) + JSON.parse(item.numberintrade);
                    inventoryItem.number_for_trade = JSON.parse(inventoryItem.number_for_trade) + JSON.parse(item.numberintrade);
                    TradeDetailService.updateTradeInventory(inventoryItem, item.inventoryid).then((results) => {
                        TradeDetailService.deleteTradeData(item.id).then(() => {
                            deleteReceiverTrades(receiverItems);
                        });
                    });
                }).catch((error) => {
                    console.log("error in getTradeInventory", error);
                });
            });
        }   
    };

    $scope.deleteItem = (item) => {
        TradeDetailService.getTradeInventory(item.inventoryid).then((results) => {
            let inventoryToUpdate = results.data;
            inventoryToUpdate.quantity = inventoryToUpdate.quantity + JSON.parse(item.numberintrade);
            inventoryToUpdate.number_for_trade = inventoryToUpdate.number_for_trade + JSON.parse(item.numberintrade); 
            TradeDetailService.updateTradeInventory(inventoryToUpdate, item.inventoryid).then((results) => {
                TradeDetailService.deleteTradeData(item.id).then((results) => {
                    getTradeDetails();
                    NgToastService.toast('Item has been deleted.');
                });
            });
        }).catch((error) => {
            console.log("error in getTradeInventory", error);
        });
    };

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
                    console.log($scope.usersInTrade);
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
                        });
                    });
                });
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
                            NgToastService.toast('This trade has been updated.');
                        });
                    });
                } else if (newTradeNumber > oldTradeNumber) {
                    updatedNumber = newTradeNumber - oldTradeNumber;
                    TradeDetailService.getTradeInventory(trade.inventoryid).then((results) => {
                        let inventoryObject = results.data;
                        inventoryObject.quantity = JSON.parse(inventoryObject.quantity) - updatedNumber;
                        inventoryObject.number_for_trade = JSON.parse(inventoryObject.number_for_trade) - updatedNumber;
                        TradeDetailService.updateTradeInventory(inventoryObject, trade.inventoryid).then((results) => {
                            getTradeDetails();
                            NgToastService.toast('This trade has been updated.');
                        });
                    });
                }
            });
        }).catch((error) => {
            console.log("error in getTrade", error);
        });
           
    };
});