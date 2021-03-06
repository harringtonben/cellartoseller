'use strict';

app.service("TradeDetailService", function ($http, $q, FIREBASE_CONFIG) {
    const createTradeDataObject = (tradeDetails) => {
        return {
            "tradeid": tradeDetails.tradeid,
            "beerid": tradeDetails.beerid,
            "uid": tradeDetails.uid,
            "inventoryid": tradeDetails.inventoryid,
            "numberintrade": tradeDetails.numberintrade
        };
    };

    const deleteTrade = (tradeId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/trades/${tradeId}.json`);
    };

    const getBeers = () => {
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

    const deleteTradeData = (dataId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/tradesdata/${dataId}.json`);
    };

    const getInventory = () => {
        let tradeInventory = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory.json`).then((results) => {
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

    const getTrade = (tradeId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/tradesdata/${tradeId}.json`);
    };

    const getTradeInventory = (inventoryid) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryid}.json`);
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

    const updateTrade = (trade ,tradeId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/trades/${tradeId}.json`, JSON.stringify(trade));
    };

    const updateTradeDetails = (tradeData, tradeId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/tradesdata/${tradeId}.json`, JSON.stringify(tradeData));
    };

    const updateTradeInventory = (inventory, inventoryId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryId}.json`, JSON.stringify(inventory));
    };

    return {createTradeDataObject, deleteTrade, deleteTradeData, getBeers, getInventory, getTrade, getTradeInventory, getTradeItems, getTradeUids, getTradeUsers, updateTrade, updateTradeDetails, updateTradeInventory};
});