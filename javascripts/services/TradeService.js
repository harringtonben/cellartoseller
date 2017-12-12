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

    const createTradeObject = (beerData, formData) => {
        return {
            "beer_id" : beerData.id,
            "for_trade" : beerData.for_trade,
            "number_for_trade" : JSON.parse(beerData.number_for_trade) - JSON.parse(formData.numberToTrade),
            "quantity" : JSON.parse(beerData.quantity) - JSON.parse(formData.numberToTrade),
            "trade_id" : $rootScope.tradeId,
            "uid" : AuthService.getCurrentUid()
        };
    };

    const createTradeDataObject = (beerData, formData) => {
        return {
            "tradeid": $rootScope.tradeId,
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

    return {addBeerToTrade, createTradeDataObject, createTradeObject, getBeersInTrade, getUserBeers, getUserInventory, getUserProfile, updateInventory};
});