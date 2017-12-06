'use strict';

app.controller("ProfileCtrl", function($scope, AuthService, ProfileService) {
    const getInventory = () => {
        let inventory = [];
        let beerlist = [];
        let myInventory = [];
        ProfileService.getMyInventory(AuthService.getCurrentUid()).then((results) => {
            inventory = results;
            ProfileService.getMyBeers().then((results) => {
                beerlist = results;
                console.log("My Inventory", inventory);
                console.log("My beer list", beerlist);
            }).catch((error) => {
                console.log("Error in getMyBeers", error);
            });
        }).catch((error) => {
            console.log("error in getInventory", error);
        });
    };

    getInventory();
});