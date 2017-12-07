'use strict';

app.service("InventoryService", function($http, FIREBASE_CONFIG) {
    const getInventoryItem = (inventoryId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryId}.json`);
    };

    return {getInventoryItem};
});