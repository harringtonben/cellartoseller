'use strict';

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthService){
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.navbar = true;
      AuthService.searchUsers().then((results) => {
        if (isEmpty(results.data) === true) {
          let newUser = AuthService.createUserObject(result);
          console.log(newUser);
          // AuthService.addUser(newUser);
        }
      }).catch((error) => {
        console.log("Error in getting users", error);
      });
      console.log(result);
      $scope.$apply(() =>{
        $location.path("/search");
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };

  const isEmpty = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
};
});