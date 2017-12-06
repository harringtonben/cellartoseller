'use strict'; 

app.controller("ModalCtrl", ['$rootScope', '$scope', '$uibModal',

    function ($rootScope, $scope, $uibModal) {

        $scope.launchModal = (template, controller, bid) => {

            var modalInstance = $uibModal.open({
                templateUrl: template, 
                controller: controller, 
                scope: $scope,
            });

            modalInstance.result.then(function (result) {
                
            }, function (result) {
                if (result === "pin added" || "pin removed") {
                    $rootScope.$broadcast("updatePins");                    
                }              
            });
        };

    }
]);