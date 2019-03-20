angular.module('starter.controllers')
.controller('DashboardCtrl', function($ionicLoading,$cordovaNetwork, $scope,$location,$rootScope,$state,$cordovaSQLite, $ionicPlatform, $timeout, categoryService,dashboardService,dataManager) {
	'use strict';


  $ionicPlatform.ready(function() {

  // $scope.getProductList = function(){
  //   $rootScope.productlist = {}
  //   var store_id = localStorage.getItem("store_id"); 
  //   dataManager.get(productlist+'/'+store_id+'/2' ).then( function (response){
  //       $rootScope.productlist = response.data;
  //       console.error('product list' + JSON.stringify($rootScope.productlist));
  //       $rootScope.productlistMain = response.data;
  //   }, function (error){
  //       console.log(error);
  //   });
  // }

  // $scope.getProductList();

  var imagePath = '';
  if($cordovaNetwork.isOnline() == true){
    var imagePath = "'http://distincion.mx/img.muebles/' ||  path";
  }else{
    var imagePath = "'img/no-image.png'";
    //var imagePath =  $location.path()+'/no-image.jpg' ;
  }
  $rootScope.imagePath="http://distincion.mx/img.muebles/";;
  //Llamada dos


  

  $scope.cargaListaProductos = function(result) { 

  var store_id = localStorage.getItem("store_id"); 
  dataManager.get(productosPorTienda+store_id).then(function(response){
    if(response != null){
      $rootScope.productlist =response;
    }else {
      console.log(response);
    }
   
  }, function(error){
      console.log(error);
  });
  };
  

  //Fin llamada dos

 // get product related data
 if($cordovaNetwork.isOnline() == true && false){
   
     $cordovaSQLite.execute(db,"DROP TABLE IF EXIST productos");
     $cordovaSQLite.execute(db,"DROP TABLE IF EXIST producto_tienda");
     $cordovaSQLite.execute(db,"DROP TABLE IF EXIST producto_fotos");

    dataManager.get(productRelatedData).then(function(response){
      if(response.status == "true"){

         $cordovaSQLite.execute(db, 'DELETE FROM productos').then(function(res){
          console.log(" productos deleted " +res);
         }, function(err){
            console.log('delete err' + err);
         });


         $cordovaSQLite.execute(db, 'DELETE FROM producto_tienda').then(function(res){
          console.log(" producto_tienda deleted " +res);
         }, function(err){
            console.log('delete err' + err);
         });

         $cordovaSQLite.execute(db, 'DELETE FROM producto_fotos').then(function(res){
          console.log(" producto_fotos deleted " +res);
         }, function(err){
            console.log('delete err' + err);
         });

                // insert product
                var product = response.product;

                for(i = 0; i<product.length; i++){

                  var id_producto = product[i].id_producto;
                  var nombre = product[i].nombre;
                  var tapiz_id = product[i].tapiz_id;
                  var mecanismo_id = product[i].mecanismo_id;
                  var masaje_id = product[i].masaje_id;
                  var color_id = product[i].color_id;

                  var ancho = product[i].ancho;
                  var alto = product[i].alto;
                  var profundo = product[i].profundo;
                  var estatus = product[i].estatus;
                  var categoria_id = product[i].categoria_id;
                  var fecha_creacion = product[i].fecha_creacion;

                  var fecha_modificacion = product[i].fecha_modificacion;
                  var usuario_creacion = product[i].usuario_creacion;
                  var usuario_modificacion = product[i].usuario_modificacion;

                  // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS productos (id_producto integer, nombre text, tapiz_id integer, mecanismo_id integer, masaje_id integer, color_id integer, ancho integer, alto integer, profundo integer, estatus integer, categoria_id integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

                var query = "INSERT INTO productos (id_producto, nombre, tapiz_id, mecanismo_id, masaje_id, color_id, ancho, alto, profundo, estatus, categoria_id, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute(db, query, [id_producto, nombre, tapiz_id, mecanismo_id, masaje_id, color_id, ancho, alto, profundo, estatus, categoria_id, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion]).then(function(res) {
                  console.log("resposne : "  + res);
                }, function (err) {
                  console.error(err);
                });

                }



                // insert tienda

                var tienda = response.tienda;

                for(i = 0; i<tienda.length; i++){

                  var id = tienda[i].id;
                  var producto_id = tienda[i].producto_id;
                  var tienda_id = tienda[i].tienda_id;
                  // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS producto_tienda (id integer, producto_id integer, tienda_id integer)");

                var query = "INSERT INTO producto_tienda (id, producto_id, tienda_id) VALUES (?,?,?)";
                $cordovaSQLite.execute(db, query, [id, producto_id, tienda_id]).then(function(res) {
                  console.log("resposne : "  + res);
                }, function (err) {
                  console.error(err);
                });

                }


                // insert producto_fotos

                var images = response.images;

                for(i = 0; i<images.length; i++){

                  var id_foto = images[i].id_foto;
                  var producto_id = images[i].producto_id;
                  var path = images[i].path;
                  var orden = images[i].orden;
                  // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  producto_fotos (id_foto integer, producto_id integer, path text, orden integer)");
     
                var query = "INSERT INTO producto_fotos (id_foto, producto_id, path, orden) VALUES (?,?,?,?)";
                $cordovaSQLite.execute(db, query, [id_foto, producto_id, path, orden]).then(function(res) {
                  console.log("resposne : "  + res);
                }, function (err) {
                  console.error(err);
                });

                }

              

      } else {
        console.log(response.message);
      }
    }, function(error){
      console.log(error);
    });

}
      // Proces a result set
      $scope.getAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
          output.push(result.rows.item(i));
        }
        return output;
      }

      var store_id = localStorage.getItem("store_id"); 
      $rootScope.productlist = {};
      var query = "SELECT *, (select  ("+ imagePath +") from producto_fotos where producto_id = producto_tienda.producto_id limit 1 ) path FROM productos inner join producto_tienda on producto_tienda.producto_id = productos.id_producto where producto_tienda.tienda_id = "+ store_id +" and productos.estatus = 1 order by productos.nombre";
      console.log('query' + query);

      $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

      $cordovaSQLite.execute(db, query).then(function(data) {
        // $rootScope.productlist = $scope.getAll(data);
         //$rootScope.productlistMain = $rootScope.productlist;
         $ionicLoading.hide();
       //  console.error('product list 2' + JSON.stringify($rootScope.productlist));
      }, function (err) {
           console.error(JSON.stringify(err));
      });




   $scope.data = {
    grid: true
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $scope.include = function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }


  $scope.test = function(menuname, id){

  	console.log(JSON.stringify($rootScope.productlist));
    var filtered = [];
    var items = $rootScope.productlistMain;
    console.log('menuname : '+ menuname);
    console.log('id : '+ id);
    var letterMatch = new RegExp(id, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var match = '';
      if(menuname == 'tapiz_id'){
      	 match = item.tapiz_id;
      }else if(menuname == 'mecanismo_id'){
      	 match = item.mecanismo_id;
      }else if(menuname == 'color_id'){
         match = item.color_id;
      }else if(menuname == 'masaje_id'){
      	 match = item.masaje_id;
      }else if(menuname == 'categoria_id'){
         match = item.categoria_id;
      }else if(menuname == "Ancho"){

           var Anchomin = angular.element(document.querySelector(".Anchomin")).val();
           var Anchomax = angular.element(document.querySelector(".Anchomax")).val();

      
           if(Anchomin != ''  && Anchomax != ''){


              if( item.ancho >= Anchomin && item.ancho <= Anchomax ) {
                filtered.push(item);
              }

           }
         
      }else if(menuname == "Alto"){

           var Altomin = angular.element(document.querySelector(".Altomin")).val();
           var Altomax = angular.element(document.querySelector(".Altomax")).val();

     
           if(Altomin  != '' &&  Altomax != ''){

              if( item.alto >= Altomin && item.alto <= Altomax ) {
                filtered.push(item);
              }

           }
         
      }else if(menuname == "profundo"){

         
          var Promin = angular.element(document.querySelector(".Promin")).val();
          var Promax = angular.element(document.querySelector(".Promax")).val();

     

           if(Promin != ''  && Promax != ''){


              if( item.profundo >= Promin && item.profundo <= Promax ) {
                filtered.push(item);
              }

           }
         
      }else{
         var items = $rootScope.productlistMain;
          $rootScope.productlist = items;
      }



      if (letterMatch.test(match)) {
        filtered.push(item);
      }
    }
     $rootScope.productlist = filtered;

  }
//  $scope.menudata = { Altomin : '', Altomax : '10', Anchomin : '', Anchomax : '', Promin : '', Promax: '' };
  $scope.clearallmydata = function(){
   // alert('data');
  //   $scope.menudata = { Altomin : '', Altomax : '20', Anchomin : '', Anchomax : '', Promin : '', Promax: '' };
      $scope.filter = {};
      var items = $rootScope.productlistMain;
      $rootScope.productlist = items;

  }

  $scope.cargaToken = function(){
    
  window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
    console.log(token);
}, function(error) {
    console.error(error);
});
  }

  $scope.cargaListaProductos();
  $scope.$on("$ionicView.enter", function(){
    $scope.cargaListaProductos();

    })
})



});

// .filter('filter', function() {

//  return function (items, letter) {
 	
//   var items = items;
//   var letter = letter;
//   console.log(letter);
//     var filtered = [];
//     var letterMatch = new RegExp(letter, 'i');
//     for (var i = 0; i < items.length; i++) {
//       var item = items[i];
//       if (letterMatch.test(item.nombre) || letterMatch.test(item.id_producto)) {
//         filtered.push(item);
//       }
//     }
//     return filtered;
//   };

// });
