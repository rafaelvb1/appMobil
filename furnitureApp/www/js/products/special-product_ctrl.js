angular.module('starter.controllers')

  .controller('SpecialProductCtrl', function ($ionicLoading, $scope, $stateParams, $state, productsService, eCart, alertmsgService, dataManager, $cordovaToast, $cordovaSQLite, $ionicPlatform, $timeout) {

    $ionicPlatform.ready(function () {

     

      $scope.getProductDetail2 = function (proId) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        $scope.productdetail = {};

        dataManager.get(productdetail + "/" + proId).then(function (response) {
          if (response.status == "true") {
            $scope.productdetail.detail = response.data;
            $scope.productdetail.images = response.data.fotos;
            $ionicLoading.hide();
          } else {
            console.log("error al llamar " + "etailproduct/proId" + "(Mensaje):" + response.message);
          }
        }, function (error) {
          console.log("error 3" + error);
        });
      }

      $scope.getProductDetail2($stateParams.prId);

    })
  })
