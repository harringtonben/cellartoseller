'use strict';

app.service("ProfileService", function($http, $q, FIREBASE_CONFIG) {
    const getAllUsers = () => {
        let allUsers = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`).then((results) => {
                let users = results.data;
                if (users != null) {
                 Object.keys(users).forEach((key) => {
                     users[key].id = key;
                     allUsers.push(users[key]);   
                 });    
                 } 
                 resolve(allUsers);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getCurrentTrades = (userId) => {
        let myTrades = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/trades.json`).then((results) => {
               let trades = results.data;
               if (trades != null) {
                Object.keys(trades).forEach((key) => {
                    trades[key].id = key;
                    myTrades.push(trades[key]);     
                });    
                } 
                resolve(myTrades);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getInventoryInTrade = (inventoryId) => {
        let myInventory = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/tradesdata.json?orderBy="inventoryid"&equalTo="${inventoryId}"`).then((results) => {
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

    const getUserDetails = (userId) => {
        let myUser = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`).then((results) => {
                let users = results.data;
                if (users != null) {
                 Object.keys(users).forEach((key) => {
                     users[key].id = key;
                     myUser.push(users[key]);   
                 });    
                 } 
                 resolve(myUser[0]);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const deleteInventoryItem = (itemId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/inventory/${itemId}.json`);
    };

    const deleteTradeInventory = (tradeDataId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/tradesdata/${tradeDataId}.json`);
    };

    return {getAllUsers, deleteInventoryItem, deleteTradeInventory, getCurrentTrades, getInventoryInTrade, getMyBeers, getMyInventory, getUserDetails};
});