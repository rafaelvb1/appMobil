// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.daf', 'starter.dmf', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                })

                .state('signup', {
                    url: '/signup',
                    templateUrl: 'templates/signup.html'
                })

                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'templates/dashboard.html'
                })

                .state('addForm', {
                    url: '/addForm/:Template_Id',
                    templateUrl: 'templates/add_form.html',
                    controller: 'addFormCtrl'
                })

                .state('new_form', {
                    url: '/new_form',
                    templateUrl: 'templates/new_form.html',
                    controller: 'newFormCtrl'
                })

                .state('myForm', {
                    url: '/myForm',
                    templateUrl: 'templates/my_form.html',
                    controller: 'myFormCtrl'
                })

                .state('templet', {
                    url: '/templet',
                    templateUrl: 'templates/template.html'
                })

                .state('confirm', {
                    url: '/confirm',
                    templateUrl: 'templates/confirm.html'
                })

                .state('additionalInfo', {
                    url: '/additionalInfo',
                    templateUrl: 'templates/info.html',
                    controller: "infoCnfrmCtrl"
                })
                
                .state('byPass', {
                    url: '/byPass',
                    templateUrl: 'templates/byPass.html',
                    controller: "byPassCtrl"
                })
                ;
                var Pass = '';
                var User_Id = localStorage.getItem("QUser_Id");
                if(User_Id) {
                    Pass = 'myForm';
                } else {
                    Pass = 'login';//'login';
                }
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/'+Pass);

        });
