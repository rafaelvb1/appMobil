angular.module('starter.controllers')
.controller('EditpasswordCtrl', function($cordovaNetwork,$ionicPlatform,$scope,$rootScope,$ionicModal,$timeout,$cordovaToast,$window,dataManager) {
	'use strict';
    $ionicPlatform.ready(function() {

    function netCheck() {
        var isOnline = $cordovaNetwork.isOnline();
      // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            var onlineState = networkState;
        })
         console.log("is"+ isOnline);
       return isOnline;
        
      }


       var ntw = netCheck();

	   $scope.iniLogin = {};
	   var User_Id = localStorage.getItem("User_Id");
	   $scope.userLoginPassword = function(form) {
                if(form.$valid) {
                    if(ntw == true) { 
                    $scope.iniLogin = {userId:User_Id, oldpassword : $scope.iniLogin.oldpassword1, password : $scope.iniLogin.newpassword, confirmPass : $scope.iniLogin.confirm};
                    console.log($scope.iniLogin);
                    dataManager.post(userChangePassword, $scope.iniLogin).then( function(response){
                    	console.log(response.message);
                        if(response.status == "true"){
                             $scope.iniLogin = {oldpassword : "", password : "", confirmPass : ""};
                             $cordovaToast.showLongBottom(response.message);
                             $('#oldpassword').val('');
                             $('#password').val('');
                             $scope.resetForm();
                            // $location.path("#/app/dashboardlist");
                            // $window.location.href = '#/app/dashboardlist';
                        } else {
                            $cordovaToast.showLongBottom(response.message);
                            console.log(response.message);
                        }
                    }, function (error){
                        console.log(error);
                    });
                   }else{
                      $cordovaToast.showLongBottom("Please check your internet connection!");
                   }
                }
            }
     })
});
