'use strict';

app.controller("TradeDetailCtrl", function($rootScope, $routeParams, $scope, TradeDetailService) {
    const getTradeDetails = () => {
        TradeDetailService.getTradeItems($routeParams.id).then((results) => {
            console.log(results);
        }).catch((error) => {
            console.log("error in getTradeItems", error);
        });
    };

    getTradeDetails();
});