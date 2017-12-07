'use strict';

app.service("ProfileService", function($http, $q, FIREBASE_CONFIG) {
    const getMyInventory = (userId) => {
        let myInventory = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory.json?orderBy="uid"&equalTo="${userId}"`).then((results) => {
               let inventory = results.data;
               if (inventory != null) {
                Object.keys(inventory).forEach((key) => {
                    inventory[key].id = key;
                    myInventory.push(inventory[key]);   
                });    
                } 
                resolve(myInventory);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getMyBeers = (userId) => {
        let myBeers = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/beers.json`).then((results) => {
               let beers = results.data;
               if (beers != null) {
                Object.keys(beers).forEach((key) => {
                    beers[key].id = key;
                    myBeers.push(beers[key]);   
                });    
                } 
                resolve(myBeers);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const deleteInventoryItem = (itemId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/inventory/${itemId}.json`);
    };

    return {deleteInventoryItem, getMyBeers, getMyInventory};
});