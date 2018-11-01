angular.module('starter.dmf', [])
        .factory('dataManager', function ($q, dataAccess) {
            return {
                post: post,
                get: get
            };
            
            function post(url, data){
                var deferred = $q.defer();
                
                dataAccess.post(url, data).success(function (resp) {
                    deferred.resolve(resp);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };
            
            function get(url){
                var deferred = $q.defer();
                
                dataAccess.get(url).success(function (resp) {
                    deferred.resolve(resp);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };
        });