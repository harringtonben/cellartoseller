'use strict';

app.service("InventoryService", function($http, FIREBASE_CONFIG, AuthService) {
    const createInventoryObject = (trade, inventory) => {
        return {
            "for_trade": trade.for_trade,
            "number_for_trade": inventory.number_for_trade,
            "quantity": inventory.quantity,
            "uid": AuthService.getCurrentUid(),
            "beer_id": inventory.beer_id,
            "trade_id": ""
        };
    };

    const getInventoryItem = (inventoryId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryId}.json`);
    };

    const updateInventoryItem = (beerObject, itemId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/inventory/${itemId}.json`, JSON.stringify(beerObject));
    };
    

    return {createInventoryObject, getInventoryItem, updateInventoryItem};
});