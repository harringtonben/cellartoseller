'use strict';

app.service("TradeDetailService", function ($http, $q, FIREBASE_CONFIG) {
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
                console.log("error in getTradeItems");
            });
        });
    };

    return {getTradeItems};
});