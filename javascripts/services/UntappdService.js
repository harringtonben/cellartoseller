'use strict';

app.service("UntappdService", function($http, UNTAPPD_CONFIG) {
    const getBeerData = (query) => {
        return $http.get(`https://api.untappd.com/v4/search/beer?client_id=${UNTAPPD_CONFIG.clientId}&client_secret=${UNTAPPD_CONFIG.clientSecret}&q=${query}`);
    };

    return {getBeerData};
});