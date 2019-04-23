angular.module('starter.controllers')

  .controller('SpecialProductCtrl', function ($ionicLoading, $scope, $stateParams, $state, productsService, eCart, alertmsgService, dataManager, $cordovaToast, $cordovaSQLite, $ionicPlatform, $timeout) {

    $ionicPlatform.ready(function () {

      $scope.getPedidoEspecial = function () {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        $scope.pedidoEspecial = {};
        var store_id = localStorage.getItem("store_id"); 
        //$scope.getProductdetailfull(store_id, $stateParams.prId);

        dataManager.get(pedidoEspecial + "/"+store_id+"/"+$stateParams.prId).then(function (response) {
          console.log(response);
          
          if (response.status == "true") {
            $scope.pedidoEspecial = response.data;
            $ionicLoading.hide();

          } else {
            console.log("error al llamar " + "etailproduct/proId" + "(Mensaje):" + response.message);
          }
        }, function (error) {
          console.log("error 3" + error);
        });
      }

      $scope.getPedidoEspecial();

      //$stateParams.prId
    })
  })
