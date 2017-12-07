'use strict';

app.service("CellarService", function($http, $q, FIREBASE_CONFIG, AuthService) {
    const createBeerObject = (beer) => {
        return {
            "beer_name": beer.beer.beer_name,
			"beer_description": beer.beer.beer_description,
            "untappd_bid": beer.beer.bid,
            "beer_style": beer.beer.beer_style,
            "beer_label": beer.beer.beer_label,
            "beer_abv": beer.beer.beer_abv,
            "brewery_name": beer.brewery.brewery_name,
            "brewery_city": beer.brewery.location.brewery_city,
            "brewery_state": beer.brewery.location.brewery_city
        };
    };

    const createInventoryObject = (beerId) => {
        return {
            "for_trade": false,
            "number_for_trade": "",
            "quantity": 1,
            "uid": AuthService.getCurrentUid(),
            "beer_id": beerId,
            "trade_id": ""
        };
    };

    const addToCellar = (beer) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/beers.json`, JSON.stringify(beer));
    };

    const addToInventory = (beer) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/inventory.json`, JSON.stringify(beer));
    };

    const searchForBeer = (beerId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/beers.json?orderBy="untappd_bid"&equalTo="${beerId}"`);
    };

    return {addToCellar, addToInventory, createBeerObject, createInventoryObject, searchForBeer};
});