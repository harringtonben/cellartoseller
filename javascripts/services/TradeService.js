'use strict';

app.service("TradeService", function($http, $q, $rootScope, FIREBASE_CONFIG, AuthService) {
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

    const createTradeObject = (beerData, formData, userId) => {
        return {
            "beer_id" : beerData.id,
            "for_trade" : beerData.for_trade,
            "number_for_trade" : JSON.parse(beerData.number_for_trade) - JSON.parse(formData.numberToTrade),
            "quantity" : JSON.parse(beerData.quantity) - JSON.parse(formData.numberToTrade),
            "trade_id" : $rootScope.tradeId,
            "uid" : userId
        };
    };

    const createTradeDataObject = (beerData, formData, tradeId) => {
        return {
            "tradeid": tradeId,
            "beerid": beerData.id,
            "uid": beerData.uid,
            "inventoryid": beerData.inventory_id,
            "numberintrade": formData.numberToTrade
        };
    };

    const addBeerToTrade = (tradeItem) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/tradesdata.json`, JSON.stringify(tradeItem));
    };

    const updateInventory = (beerData, inventoryId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryId}.json`, JSON.stringify(beerData));
    };

    const getBeersInTrade = (tradeId) => {
        let tradeData = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/tradesdata.json?orderBy="tradeid"&equalTo="${tradeId}"`).then((results) => {
                let tradeItems = results.data;
                if (tradeItems != null) {
                 Object.keys(tradeItems).forEach((key) => {
                    tradeItems[key].id = key;
                     tradeData.push(tradeItems[key]);   
                 });    
                 } 
                 resolve(tradeData);
            }).catch((error) => {
                console.log("error in getBeersInTrade", error);
            });
        });
    };

    const getTradeInfo = (tradeId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/trades/${tradeId}.json`);
    };

    const deleteTrade = (tradeId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/trades/${tradeId}.json`);
    };

    const deleteTradeItems = (itemId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/tradesdata/${itemId}.json`);
    };

    const getSingleInventoryItem = (inventoryId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/inventory/${inventoryId}.json`);
    };

    return {addBeerToTrade, createTradeDataObject, createTradeObject, deleteTrade, deleteTradeItems, getBeersInTrade, getSingleInventoryItem, getUserBeers, getUserInventory, getUserProfile, updateInventory, getTradeInfo};
});