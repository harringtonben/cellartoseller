'use strict';

app.service("TradeDetailService", function ($http, $q, FIREBASE_CONFIG) {
    const getInventory = () => {
        let tradeInventory = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/beers.json`).then((results) => {
                let inventory = results.data;
                if (inventory != null) {
                 Object.keys(inventory).forEach((key) => {
                     inventory[key].id = key;
                     tradeInventory.push(inventory[key]);   
                 });    
                 } 
                 resolve(tradeInventory);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getTradeItems = (tradeId) => {
        let tradeItems = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/tradesdata.json?orderBy="tradeid"&equalTo="${tradeId}"`).then((results) => {
                let inventory = results.data;
                if (inventory != null) {
                 Object.keys(inventory).forEach((key) => {
                     inventory[key].id = key;
                     tradeItems.push(inventory[key]);   
                 });    
                 } 
                 resolve(tradeItems);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const getTradeUsers = () => {
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

    const getTradeUids = (tradeId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/trades/${tradeId}.json`);
    };

    return {getInventory, getTradeItems, getTradeUids, getTradeUsers};
});