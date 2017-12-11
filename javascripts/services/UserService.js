'use strict';

app.service("UserService", function($http, $q, FIREBASE_CONFIG) {
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

    const getUserProfile = (userId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`);
    };

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

    const createTradeObject = (ownerId, receiverId) => {
        return {
            "is_accepted" : "",
            "owner_id" : ownerId,
            "receiver_id" : receiverId
        };
    };

    const newTrade = (trade) => {

    };

    return {createTradeObject, getAllUsers, getUserBeers, getUserInventory, getUserProfile, newTrade};
});