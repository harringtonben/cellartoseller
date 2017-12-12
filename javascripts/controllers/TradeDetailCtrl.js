'use strict';

app.controller("TradeDetailCtrl", function($rootScope, $routeParams, $scope, TradeDetailService) {
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
                    TradeDetailService.getInventory($routeParams.id).then((results) => {
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
        let updatedTradeData = TradeDetailService.createTradeDataObject(trade);
        console.log(updatedTradeData);
        console.log(trade);
        TradeDetailService.updateTradeDetails(updatedTradeData, trade.id).then((results) => {
            console.log(results);
        }).catch((error) => {
            console.log("error in updateTradeDetails", error);
        });
    };
});