'use strict';

app.controller("InventoryCtrl", function($routeParams, $scope, InventoryService) {
    const getInventoryDetail = () => {
        InventoryService.getInventoryItem($routeParams.id).then((results) => {
            $scope.inventory = results.data;
        }).catch((error) => {
            console.log("Error in getInventoryItem", error);
        });
    };

    $scope.updateInventory = (details) => {
        console.log($scope.updateInventoryForm.for_trade, typeof $scope.updateInventoryForm.for_trade);
    };
   

    getInventoryDetail();
});