'use strict';

app.controller("InventoryCtrl", function($location, $routeParams, $scope, InventoryService) {
    const getInventoryDetail = () => {
        InventoryService.getInventoryItem($routeParams.id).then((results) => {
            $scope.inventory = results.data;
        }).catch((error) => {
            console.log("Error in getInventoryItem", error);
        });
    };

    $scope.updateInventory = (details) => {
        let updatedBeer = InventoryService.createInventoryObject(details, $scope.inventory);
        InventoryService.updateInventoryItem(updatedBeer, $routeParams.id).then((results) => {
            $location.path('/profile');
        }).catch((error) => {
            console.log("error in updateInventory", error);
        });
    };

    getInventoryDetail();
});