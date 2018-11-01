angular.module('starter.controllers')
        .controller('ForgetpassCtrl', function ($scope, $location, $rootScope, $state, dataManager, $cordovaToast, $window, $cordovaOauth, $localStorage, $ionicPopup, $http) {
            'use strict';
            $scope.forgetpassdata = {};
            $scope.forgetPass = function(form){
                     $scope.forgetpassdata = {email : $scope.forgetpassdata.email}
                     if(form.$valid) {
                        dataManager.post(userForgetpassState, $scope.forgetpassdata).then(function (response) {
                        if (response.status == 'true') {
                                $cordovaToast.showLongBottom(response.message);
                                $window.location.href = '#/app/login';
                            } else {
                                $cordovaToast.showLongBottom(response.message);
                                console.log(response.message);
                            }
                        }, function (error) {
                            console.log(error);
                        });
                        
                     }
             }
             $scope.userLoginPassword = function(form){
                     $scope.logindata.device_uuid = $scope.device_uuid;
                     if(form.$valid) {
                        
                     }
             }

             /*Facebook login*/
             $scope.facebooklogin = function () {
                    $cordovaOauth.facebook("1614759508837273", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function (result) {
                        // alert("yes"+result.access_token);
                        $localStorage.accessToken = result.access_token;
                        $scope.init();
                        //$location.path("/profile");
                    }, function (error) {
                        //alert("There was a problem signing in!  See the console for logs");
                        console.log(error);
                        $ionicPopup.alert({
                            title: 'Network Error',
                            template: 'Please Check Internet Connection'
                        });
                    });
                };

                $scope.init = function () {
                    if ($localStorage.hasOwnProperty("accessToken") === true) {
                        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: $localStorage.accessToken, fields: "id,name,email,gender,location,website,picture,relationship_status", format: "json"}}).then(function (result) {
                            console.log(result.data);
                            //alert(JSON.stringify(result.data));
                            //alert(JSON.stringify(result.data.id));
                            $scope.profileData = {};
                            $scope.profileData.user_name = result.data.name;
                            $scope.profileData.user_login_type = 2;
                            $scope.profileData.socail_unique_id = result.data.id;
                            $scope.profileData.social_login_json = result.data;
                            $scope.profileData.user_device_token = $rootScope.gcmKey;
                            if (ionic.Platform.isAndroid()) {
                                $scope.profileData.user_device_type = 1;
                            }
                            if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                $scope.profileData.user_device_type = 2;
                            }
                            dataManager.post(socialLogin, $scope.profileData).then(function (response) {
                                //==================Session=====================
                                var status = response.status;
                                if (status == 'true') {
                                    localStorage.setItem('user_id', response.user_id);
                                    localStorage.setItem('user_name', response.user_name);
                                    localStorage.setItem('user_email', response.user_email);
                                    $ionicPopup.alert({
                                        title: 'NewsApp',
                                        template: 'Welcome ' + response.user_name
                                    });
                                    $state.go("app.dashboard");
                                } else {
                                    $ionicPopup.alert({
                                        title: 'NewsApp',
                                        template: response.message
                                    });
                                }
                                //==================Session=====================

                            }, function (error) {
                                //alert(JSON.stringify(error));
                                $ionicPopup.alert({
                                    title: 'Login Error',
                                    template: JSON.stringify(error)
                                });
                            });
                        }, function (error) {
                            //alert("There was a problem getting your profile.  Check the logs for details.");
                            console.log(error);
                            $ionicPopup.alert({
                                title: 'Network Error',
                                template: 'Please Check Internet Connection'
                            });
                        });
                    } else {
//          alert("Not signed in");
                        console.log("Not signed in");
                        $location.path("/login");
                    }
                };
        });
