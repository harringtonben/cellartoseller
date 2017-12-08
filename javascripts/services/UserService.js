'use strict';

app.service("UserService", function($http, $q, FIREBASE_CONFIG) {
    const getAllUsers = () => {
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

    return {getAllUsers};
});