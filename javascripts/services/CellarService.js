'use strict';

app.service("CellarService", function($http, FIREBASE_CONFIG) {
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

    return {addToCellar, createBeerObject};
});