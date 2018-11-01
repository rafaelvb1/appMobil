angular.module('starter.controllers')
.controller('ProfileCtrl', function($cordovaNetwork , $ionicPlatform, $scope,$rootScope,$ionicModal,$timeout,dataManager, $cordovaToast, $window, $cordovaOauth, $localStorage, $ionicPopup, $http) {
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


    if($cordovaNetwork.isOnline() == true) { 

			$scope.profile = {};
			$scope.branches = {};
			var userid = localStorage.getItem("User_Id"); 
			console.log('user id' + userid);
			$scope.userData = function(){
				if($cordovaNetwork.isOnline() == true) { 
				dataManager.get(getUserDetail+'/'+userid).then( function(response) {
					if(response.status == "true"){
						console.log(response.data);
						$scope.profile = response.data;
						$scope.branches = response.branch;
					}else{
						console.log(response.message);
					}
				}, function(error){

				});
			 }else{
			 		$cordovaToast.showLongBottom("Please check your internet connection!");
			 }
			}
			$scope.userData();



		      // $scope.profile = {};
	      $scope.userUpdate = function(form) {
	              if(form.$valid) {
	              	if($cordovaNetwork.isOnline() == true) { 
	                    $scope.profile = {email:$scope.profile.useremail,first_name:$scope.profile.fullname, userid : userid};
	                    dataManager.post(userUpdateState, $scope.profile).then( function(response){
	                        console.log(JSON.stringify(response.data));
	                        if(response.status == "true"){
	                        	 $scope.profile = response.data;
	                        	 $cordovaToast.showLongBottom('Profile update successfully!');
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

         }else{

         	$cordovaToast.showLongBottom("Please check your internet connection!");
         	$window.location.href = '#/app/dashboardlist';
         }

      });
});
