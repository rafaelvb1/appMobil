angular.module('starter.daf', [])
//    .factory('dataAccess', function ($http, ConnectivityMonitor, $ionicPopup) {
    .factory('dataAccess', function ($http, $ionicPopup) {
        return {
            post: post,
            get: get
        };

        function post(url, data) {
            return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
           /* ConnectivityMonitor.isOnline();
            if(ConnectivityMonitor.isOnline() == true){
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            } else {
                $ionicPopup.alert({
                    title: 'Network Error',
                    template: 'No Internet Connection'
                });
            }*/
        };

        function get(url) {

        };
    });