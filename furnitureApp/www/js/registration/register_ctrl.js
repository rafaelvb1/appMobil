angular.module('starter.controllers')

        .controller('RegisterCtrl', function ($scope, $location, $rootScope, $state, dataManager, $window, $cordovaToast,  $cordovaOauth, $localStorage, $ionicPopup, $http) {
            'use strict';
            $scope.register = {};
            dataManager.get(storeList).then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status == 'true') {
                    $scope.stores = response.data;
                } else {
                    console.log(response.message);
                }
            }, function (error) {
                console.log(error);
            });

            /*Get states list*/
            $scope.getStates = function () {
                if ($scope.register.store != '') {
                    dataManager.get(statesList + $scope.register.store).then(function (response) {
                        console.log(JSON.stringify(response.data));
                        if (response.status == 'true') {
                            $scope.states = response.data;
                        } else {
                            console.log(response.message);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                } else {
                    alert("fa");
                }
            }
            
            /*Get city list*/
            $scope.getCities = function () {
                if ($scope.register.store != '' && $scope.register.state != '') {
                    dataManager.get(cityList + $scope.register.store+'/'+$scope.register.state).then(function (response) {
                        console.log(JSON.stringify(response.data));
                        if (response.status == 'true') {
                            $scope.Cities = response.data;
                        } else {
                            console.log(response.message);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                } else {
                    alert("fa");
                }
            }
            
            /*Get Branches*/
            $scope.getBranch = function () {
                if ($scope.register.store != '' && $scope.register.city != '') {
                    dataManager.get(branchList + $scope.register.store+'/'+$scope.register.city).then(function (response) {
                        console.log(JSON.stringify(response.data));
                        if (response.status == 'true') {
                            $scope.branches = response.data;
                        } else {
                            console.log(response.message);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                } else {
                    alert("fa");
                }
            }
            
            $scope.userRegister = function(form) {
                if(form.$valid) {
                    $scope.register = {code:$scope.register.code, email:$scope.register.useremail,
cellphone:$scope.register.cellphone, first_name:$scope.register.fullname, father_name:$scope.register.fathername, 
mother_name:$scope.register.mothername, branch_office:$scope.register.branch, username:$scope.register.username, password:$scope.register.password, devicetoken : $rootScope.deviceId};
                    dataManager.post(userRegisterState, $scope.register).then( function(response){
                        console.log(JSON.stringify(response.data));
                        if(response.status == "true"){
                             $cordovaToast.showLongBottom(response.message);
                             $window.location.href = '#/login';
                        } else {
                            $cordovaToast.showLongBottom(response.message);
                            console.log(response.message);
                        }
                    }, function (error){
                        console.log(error);
                    });
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
