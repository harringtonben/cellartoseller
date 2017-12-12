'use strict';

app.controller("ProfileCtrl", function($location, $scope, AuthService, ProfileService) {
    const getInventory = () => {
        let inventory = [];
        let beerList = [];
        let myInventory = [];
        ProfileService.getMyInventory(AuthService.getCurrentUid()).then((results) => {
            inventory = results;
            ProfileService.getMyBeers().then((results) => {
                beerList = results;
                beerList.forEach((beer) => {
                    inventory.forEach((item) => {
                        if (item.beer_id === beer.id) {
                            beer.for_trade = item.for_trade;
                            beer.number_for_trade = item.number_for_trade;
                            beer.quantity = item.quantity;
                            beer.inventory_id = item.id;
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
    };

    const getUserDetails = (tradeData) => {
        ProfileService.getAllUsers().then((results) => {
            tradeData.forEach((trade) => {
                results.forEach((result) => {
                    if (trade.owner_id === result.uid) {
                        trade.owner_name = result.name;
                    } else if (trade.receiver_id === result.uid) {
                        trade.receiver_name = result.name;
                    }
                });
            });
            $scope.trades = tradeData;
        }).catch((error) => {
            console.log("error in getUserDetails", error);
        });
    };

    const getTrades = () => {
        ProfileService.getCurrentTrades().then((results) => {
            let userId = AuthService.getCurrentUid();
            let activeTrades = [];
            results.forEach((result) => {
                if (result.owner_id === userId || result.receiver_id === userId) {
                    activeTrades.push(result);
                }
            });
            let userDetails = getUserDetails(activeTrades);
        }).catch((error) => {
            console.log("error in getCurrentTrades");
        });
    };

    getInventory();
    getTrades();
    
    $scope.updateInventory = (itemId) => {
        $location.path(`/inventory/${itemId}`);
    };

    $scope.deleteInventory = (inventoryId) => {
        ProfileService.deleteInventoryItem(inventoryId).then((results) => {
            getInventory();
        }).catch((error) => {
            console.log("error in deleteInventory", error);
        });
    };
});