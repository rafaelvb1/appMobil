angular.module("starter.controllers", [])

        /*Dashboard controller*/
        .controller('addFormCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicLoading, $stateParams, dataManager, $rootScope) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.byPass = "";
            $scope.count = 1;
            $scope.totalIndex = 1;
            $scope.currentIndex = 0;
            $scope.nextIndex = 1;
            $rootScope.arrayText = [];
//        $scope.arr = [];
            $scope.form = {};
            console.log("1" + JSON.stringify($rootScope.arrayText));
            dataManager.post(Questions, {"Template_Id": $stateParams.Template_Id}).then(function (response) {
                console.log(JSON.stringify(response))
                if (response.status == 'true') {
                    $ionicLoading.hide();
                    $scope.arr = response.data;
                    $scope.data = response.data[0];
                    $scope.show = 1; // Show view
                $cordovaToast.showLongBottom(response.message);
//                        $location.path("/dashboard")
                } else {
                    $ionicLoading.hide();
                $cordovaToast.showLongBottom(response.message);
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Network Error',
                    template: 'Please check internet conection.'
                });
            });
            $ionicLoading.hide();

            $scope.nextQue = function ($isValid) {
                if ($isValid) {
//                console.log($scope.data[$scope.currentIndex]);
                    $rootScope.arrayText.push({'que_id': $scope.data.Question_Id, 'que': $scope.data.Question_name, "question_ans": $scope.form.question_ans});
                    $scope.form = {};
                    $scope.byPass = "pass";
                    nextSet();
                    console.log("2" + JSON.stringify($rootScope.arrayText));
                }
            }

            function nextSet() {
                $scope.count += 1;
                $scope.totalIndex += 1;
                $scope.currentIndex += 1;
                $scope.nextIndex += 1;
                $scope.data = $scope.arr[$scope.currentIndex];
                if ($scope.count > $scope.arr.length) {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    localStorage.setItem("templateId", $stateParams.Template_Id);
                    $state.go("confirm");
                }
                console.log("array length: " + $scope.arr.length + " count:" + $scope.count);
            }

            function backSet() {
                console.log($scope.count + ' ' + $scope.totalIndex + ' ' + $scope.currentIndex + ' ' + $scope.nextIndex);
                $scope.count -= 1;
                $scope.totalIndex -= 1;
                $scope.currentIndex -= 1;
                $scope.form = $rootScope.arrayText[$scope.currentIndex];
                $scope.data = $scope.arr[$scope.currentIndex];
                $rootScope.arrayText.splice($scope.currentIndex, 1);
                console.log("3" + JSON.stringify($rootScope.arrayText));
                $scope.nextIndex -= 1;
                console.log($scope.count + ' ' + $scope.totalIndex + ' ' + $scope.currentIndex + ' ' + $scope.nextIndex);
                console.log("2" + JSON.stringify($rootScope.arrayText));
            }

            $scope.back = function () {
                backSet();
            }

            $scope.prompt = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Message',
                    template: 'Your form information will not save.'
                });

                alertPopup.then(function (res) {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go("myForm")
                });
            }
        })

        /*Login Controller*/
        .controller('loginCtrl', function ($scope, $location, $ionicPopup, dataManager, $ionicLoading, $cordovaToast, $ionicHistory, $state) {

            $scope.signup = function () {
                window.open('http://35.165.17.240', '_blank');
            }

            var User_Id = localStorage.getItem("QUser_Id");
            if (User_Id) {
                $location.path("/myForm");
            } else {
                $scope.loginData = {};

                $scope.login = function (isValid) {
                    if (isValid) {
                        $ionicLoading.show({
                            content: 'Loading',
                            animation: 'fade-in',
                            showBackdrop: true,
                            maxWidth: 200,
                            showDelay: 0
                        });

                        console.log("Valid");
                        $scope.loginData.User_Device_Token = "tested";
                        if (ionic.Platform.isAndroid()) {
                            $scope.loginData.User_Device_Type = 1;
                        }
                        if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                            $scope.loginData.User_Device_Type = 2;
                        }
                        dataManager.post(UserLogin, $scope.loginData).then(function (response) {
                            //alert(response);
                            //console.log(JSON.stringify(response))
                            if (response.status == 'true') {
                                localStorage.setItem('QUser_Id', response.ID);
//                                localStorage.setItem('QUser_Email', response.User_Email);
                                $ionicLoading.hide();
                                $cordovaToast.showLongBottom(response.message);

                                $ionicHistory.clearHistory();
                                $ionicHistory.clearCache();
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go("myForm")
                            } else {
                                $ionicLoading.hide();
                                $cordovaToast.showLongBottom(response.message);
                            }
                        }, function (error) {
                            $ionicLoading.hide();
                            console.log(error);
//                            $cordovaToast.showLongBottom('Please check internet conection.');
                            $ionicPopup.alert({
                                title: 'Network Error',
                                template: 'Please check internet conection.'
                            });
                        });
                    }
                }
            }
        })

        /*Forgot password controller*/
        .controller('forgotCtrl', function ($scope, $location, $ionicPopup, dataManager, $ionicLoading, $cordovaToast) {
            $scope.forgotData = {};

            $scope.forgot = function (isValid) {
                console.log("sdfsdf");
                if (isValid) {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    dataManager.post(forgot, $scope.forgotData).then(function (response) {
                        //alert(response);
                        //console.log(JSON.stringify(response))
                        if (response.status == 'true') {

                            $ionicLoading.hide();
                            $cordovaToast.showLongBottom(response.message);
                            $location.path("/login");
                        } else {
                            $ionicLoading.hide();
                            $cordovaToast.showLongBottom(response.message);
                        }
                    }, function (error) {
                        $ionicLoading.hide();
                        console.log(error);
                        $ionicPopup.alert({
                            title: 'Network Error',
                            template: 'Please check internet conection.'
                        });
                    });
                }
            }

        })

        /*My Form controller*/
        .controller('myFormCtrl', function ($state, $scope, $location, $ionicPopup, dataManager, $ionicLoading, $cordovaToast, $ionicHistory) {

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.show = 0;
            var User_Id = localStorage.getItem("QUser_Id");
            dataManager.post(MyForm, {"User_Id": User_Id}).then(function (response) {
                console.log(JSON.stringify(response))
                if (response.status == 'true') {
                    $ionicLoading.hide();
                    $scope.data = response.data;
                    $scope.show = 1; // Show view
//                $cordovaToast.showLongBottom(response.message);
//                        $location.path("/dashboard")
                } else {
                    $ionicLoading.hide();
                    $cordovaToast.showLongBottom(response.message);
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Network Error',
                    template: 'Please check internet conection.'
                });
            });

            $scope.logout = function () {
                $ionicPopup.confirm({
                    title: 'Logout',
                    template: 'Are you sure you want to logout?'
                })
                        .then(function (result) {
                            if (result) {
                                $ionicHistory.clearCache();
                                $ionicHistory.clearHistory();
                                localStorage.setItem("QUser_Id", '');
//                                localStorage.setItem("QUser_Email", '');
                                $state.go('login');
                            }
                        });
            };
        })

        .controller('newFormCtrl', function ($state, $scope, $ionicPopup, dataManager, $ionicLoading, $cordovaToast, $ionicHistory) {

            $scope.serverSideList = [
                {text: 'Almost Certain,Likely,Possible,Unlikely,Rare', value: "1"},
                {text: 'Catastrophic,Major,Moderate,Minor,Negligible', value: "2"},
                {text: 'Yes,No', value: "3"},
                {text: "True,False", value: "4"},
                {text: "Safe,Unsafe", value: "5"},
                {text: "1,2,3,4,5,6", value: "6"}
            ];
            $scope.byPass = "";
            $scope.count = 1;
            $scope.totalIndex = 1;
            $scope.currentIndex = 0;
            $scope.nextIndex = 1;
            $scope.arrayText = [];
            $scope.form = {};
            console.log("1" + JSON.stringify($scope.arrayText));
            $scope.addText = function ($isValid) {
                console.log("sdfsdf");
                if ($isValid) {
                    console.log("valid");
                    $scope.arrayText.push($scope.form);
                    $scope.form = {};
                    $scope.byPass = "pass";
                    nextSet();
                    console.log("2" + JSON.stringify($scope.arrayText));
                }
            }

            function nextSet() {
                $scope.count += 1;
                $scope.totalIndex += 1;
                $scope.currentIndex += 1;
                $scope.nextIndex += 1;
            }

            function backSet() {
                console.log($scope.count + ' ' + $scope.totalIndex + ' ' + $scope.currentIndex + ' ' + $scope.nextIndex);
                $scope.count -= 1;
                $scope.totalIndex -= 1;
                $scope.currentIndex -= 1;
                $scope.form = $scope.arrayText[$scope.currentIndex];
                $scope.arrayText.splice($scope.currentIndex, 1);
                console.log("3" + JSON.stringify($scope.arrayText));
                $scope.nextIndex -= 1;
                console.log($scope.count + ' ' + $scope.totalIndex + ' ' + $scope.currentIndex + ' ' + $scope.nextIndex);
            }

            $scope.back = function () {
                backSet();
            }

            $scope.finish = function ($isValid) {
                if ($isValid) {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    $scope.arrayText.push($scope.form);
                    console.log("finish" + JSON.stringify($scope.arrayText));
                    var User_Id = localStorage.getItem("QUser_Id");
                    dataManager.post(saveTemp, {"questions": $scope.arrayText, "user_id": User_Id}).then(function (response) {
                        if (response.status == 'true') {
                            $ionicLoading.hide();
                            console.log("success");
                            $ionicHistory.clearHistory();
                            $ionicHistory.clearCache();
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go("myForm")
                            $cordovaToast.showLongBottom(response.message);
                        } else {
                            $ionicLoading.hide();
                            console.log("failed");
                            $cordovaToast.showLongBottom(response.message);
                        }
                    }, function (error) {
                        $ionicLoading.hide();
                        console.log(error);
                        $ionicPopup.alert({
                            title: 'Network Error',
                            template: 'Please check internet conection.'
                        });
                    });
                }
            }
        })

        .controller('infoCnfrmCtrl', function ($scope, $ionicPopup, dataManager, $rootScope, $cordovaToast, $state, $ionicLoading, $cordovaToast, $ionicHistory, $location) {

            var canvas = document.getElementById('signatureCanvas');
            var signaturePad = new SignaturePad(canvas);

            $scope.clearCanvas = function () {
                signaturePad.clear();
            }

            $scope.saveCanvas = function () {
                var sigImg = signaturePad.toDataURL();
                $scope.signature = sigImg;
            }
            $scope.validData = ''
            $scope.formData = {};
            $scope.formData.full_name = '';
            $scope.formData.infouser_email = '';
            $scope.formData.infouser_position = '';
            $scope.formData.infouser_contact_number = '';
            $scope.formData.User_Id = localStorage.getItem("QUser_Id");
            $scope.formData.questions = $rootScope.arrayText;
            $scope.formData.TemplateId = localStorage.getItem("templateId");
            console.log($scope.formData.questions);
            $scope.submitInfo = function ($isValid) {
                if ($isValid) {
                    console.log("validData "+ $scope.validData);
//                    if($scope.validData) {
                        showPopup();
//                    } else {
//                        addSign();
//                    }
                }
            }

            function showPopup() {
                $scope.data = {};
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    title: 'Confirmation',
                    template: '<h5>Would you like to save this form in your saved template?</h5>',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                myPopup.close();
                                e.preventDefault();
                                var dataUrl = signaturePad.toDataURL();
                                console.log(dataUrl);
                                $scope.formData.imageData = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
                                $ionicLoading.show({
                                    content: 'Loading',
                                    animation: 'fade-in',
                                    showBackdrop: true,
                                    maxWidth: 200,
                                    showDelay: 0
                                });
                                dataManager.post(addInfo, $scope.formData).then(function (response) {
                                    if (response.status == 'true') {
                                        console.log("true");
                                        $ionicLoading.hide();
                                        $cordovaToast.showLongBottom(response.message);

                                        $scope.img = response.img;
                                        $ionicHistory.clearHistory();
                                        $ionicHistory.clearCache();
                                        $ionicHistory.nextViewOptions({
                                            disableBack: true
                                        });
                                        localStorage.setItem("templateId", "");

                                        $state.go("myForm");

//                                        $location.path("/myForm");

                                    } else {
                                        $ionicLoading.hide();
                                        $state.go("myForm");
                                        $cordovaToast.showLongBottom(response.message);
                                        console.log("false");
                                    }

                                }, function (error) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Network Error',
                                        template: 'Please check internet conection.'
                                    });
                                });

                            }
                        }
                    ]
                });
            }

            $scope.addSign = function () { 
                $scope.addme = 'addme';
                console.log("valid "+ JSON.stringify($scope.formData));
                var dataUrl = signaturePad.toDataURL();
//                console.log(dataUrl);
                if($scope.formData.full_name === '') {
                    return false;
                } else if($scope.formData.infouser_email === '') {
                    return false;
                } else if($scope.formData.infouser_position === '') {
                    return false;
                } else if($scope.formData.infouser_contact_number === '') {
                    return false;
                } else if(dataUrl === '') {
                    $cordovaToast.showLongBottom("Please add signature.");
                    return false;
                } else {
                    
                var dataUrl = signaturePad.toDataURL();
                console.log(dataUrl);
                $scope.formData.imageData = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                dataManager.post(addSign, $scope.formData).then(function (response) {
                    if (response.status == 'true') {
                        console.log("true");
                        $ionicLoading.hide();
                        $scope.formData = {};
                        $scope.formData.User_Id = localStorage.getItem("QUser_Id");
                        $scope.formData.questions = $rootScope.arrayText;
                        $scope.formData.TemplateId = localStorage.getItem("templateId");
                        signaturePad.clear();
                        $cordovaToast.showLongBottom(response.message);

                        $scope.img = response.img;
                    } else {
                        $ionicLoading.hide();
                        $cordovaToast.showLongBottom(response.message);
                        console.log("false");
                    }

                }, function (error) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Network Error',
                        template: 'Please check internet conection.'
                    });
                });
            }
            }
        });
