'use strict';

app.service("UntappdService", function($http, $q, UNTAPPD_CONFIG) {
    const getBeerData = (query) => {
        console.log("query in getBeerData", query);
        console.log('UNTAPPD_CONFIG', UNTAPPD_CONFIG);
    };

    return {getBeerData};
});