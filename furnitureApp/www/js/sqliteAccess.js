angular.module('starter.saf', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query) {
    // parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
        // console.log('db' + db);
        // console.log('query' + query);
        // console.log('parameter' + parameters);

      $cordovaSQLite.execute(db, query)
        .then(function (result) {
          q.resolve(result);
          console.log(" result :" + result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }


  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Menu', function($cordovaSQLite,  $q,  DBA) {

   return {

     getData : function() {

      var deferred = $q.defer();

      
      var mainArr = [];

      // get color
      var query = "SELECT id, nombre FROM ctg_colores";
      var colorArr = {"menu_name":"Color","name":"color_id"};
      $cordovaSQLite.execute(db, query).then(function(data) {
         colorArr.menu_data = DBA.getAll(data);
         mainArr.push(colorArr);
       //  console.error('rootScope.first' + JSON.stringify(mainArr));
      }, function (err) {
           console.error(JSON.stringify(err));
      });

      // get tapiz
      var query = "SELECT id, nombre  FROM ctg_tapiz";
      var tapizArr = {"menu_name":"Tapiz","name":"tapiz_id"};
      $cordovaSQLite.execute(db, query).then(function(data) {
         tapizArr.menu_data = DBA.getAll(data)
         mainArr.push(tapizArr);
       //  console.error('rootScope.seocond' + JSON.stringify(mainArr));
      }, function (err) {
           console.error(JSON.stringify(err));
      });


        // get color
        var query = "SELECT id, nombre FROM ctg_mecanismos";
        var mecaArr = {"menu_name":"Mecanismo","name":"mecanismo_id"};
        $cordovaSQLite.execute(db, query).then(function(data) {
           mecaArr.menu_data = DBA.getAll(data)
           mainArr.push(mecaArr);
          // console.error('rootScope.third' + JSON.stringify(mainArr));
        }, function (err) {
             console.error(JSON.stringify(err));
        });


         // get masaje
        var query = "SELECT id, nombre FROM ctg_masaje";
        var MasaArr = {"menu_name":"Masaje","name":"masaje_id"};
        $cordovaSQLite.execute(db, query).then(function(data) {
           MasaArr.menu_data = DBA.getAll(data)
           mainArr.push(MasaArr);
          // console.error('rootScope.third' + JSON.stringify(mainArr));
        }, function (err) {
             console.error(JSON.stringify(err));
        });


         // get categorias
        var query = "SELECT id, nombre FROM ctg_categorias";
        var cateArr = {"menu_name":"Categories","name":"categoria_id"};
        $cordovaSQLite.execute(db, query).then(function(data) {
           cateArr.menu_data = DBA.getAll(data)
           mainArr.push(cateArr);
          // console.error('rootScope.third' + JSON.stringify(mainArr));
        }, function (err) {
             console.error(JSON.stringify(err));
        });

      deferred.resolve(mainArr);
      return deferred.promise;


    }
 }

});