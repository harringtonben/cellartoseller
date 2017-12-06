'use strict';

app.service("CellarService", function($http, $q, FIREBASE_CONFIG) {
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

    const addToCellar = (beer) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/beers.json`, JSON.stringify(beer));
    };

    const searchForBeer = (beerId) => {
        let beerData = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/beers.json?orderBy="untappd_bid"&equalTo="${beerId}"`).then((results) => {
                let beer = results.data;
                if (beer != null) {
                    Object.keys(beer).forEach((key) => {
                        beer[key].id = key;
                        beerData.push(beer[key]);
                    });    
                }
                resolve(beerData); 
            }).catch((error) => {
                resolve(error);
            });
        });
    };

    return {addToCellar, createBeerObject, searchForBeer};
});