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
                    tradeItems.forEach((item) => {
                        if (item.uid === tradeUsers.owner_id) {
                            ownerTrades.push(item);
                        } else if (item.uid === tradeUsers.receiver_id) {
                            receiverTrades.push(item);
                        }
                    });
                    console.log(ownerTrades);
                    console.log(receiverTrades);
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
});