'use strict';

app.service("TradeService", function($http, $q, FIREBASE_CONFIG) {
    const getUserInventory = (userId) => {
        let userInventory = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory.json?orderBy="uid"&equalTo="${userId}"`).then((results) => {
               let inventory = results.data;
               if (inventory != null) {
                Object.keys(inventory).forEach((key) => {
                    inventory[key].id = key;
                    userInventory.push(inventory[key]);   
                });    
                } 
                resolve(userInventory);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getUserBeers = (userId) => {
        let userBeers = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/beers.json`).then((results) => {
               let beers = results.data;
               if (beers != null) {
                Object.keys(beers).forEach((key) => {
                    beers[key].id = key;
                    userBeers.push(beers[key]);   
                });    
                } 
                resolve(userBeers);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getUserProfile = (userId) => {
        let userProfile = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`).then((results) => {
               let profile = results.data;
                Object.keys(profile).forEach((key) => {
                    profile[key].id = key;
                    userProfile.push(profile[key]);   
                });
                resolve(userProfile[0]);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    return {getUserBeers, getUserInventory, getUserProfile};
});