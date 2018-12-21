angular.module('starter.controllers')

  .controller('ProductDetailCtrl', function ($ionicLoading, $cordovaNetwork, $scope, $rootScope, $ionicModal, $ionicPopover, $ionicSlideBoxDelegate, $stateParams, $location, $state, productsService, eCart, alertmsgService, dataManager, $cordovaToast, $cordovaSQLite, $ionicPlatform, $timeout, $sce) {

    $ionicPlatform.ready(function () {

      $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
      }
      $scope.previousSlide = function () {
        $ionicSlideBoxDelegate.previous();
      }

      // check network connection
      $scope.checkNetwork = function netCheck() {
        var isOnline = $cordovaNetwork.isOnline()
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
          var onlineState = networkState;
        })
        console.log("is" + isOnline);
        return isOnline;

      }


      var imagePath = '';
      if ($cordovaNetwork.isOnline() == true) {
        var imagePath = "'http://distincion.mx/img.muebles/' ||  path";
      } else {
        var imagePath = "'img/no-image.png'";
        //var imagePath =  $location.path()+'/no-image.jpg' ;
      }



      // Proces a result set
      $scope.getAll = function (result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
          output.push(result.rows.item(i));
        }
        return output;
      }

      $scope.visitedUser = function (proId) {
        var userid = localStorage.getItem("User_Id");
        $scope.visiteduserdata = {
          user_id: userid,
          furniture_id: proId,
          type_visit: 'detalle'
        };
        dataManager.post(addvisitedUser, $scope.visiteduserdata).then(function (response) {
          if (response.status == "true") {
            console.log(response.message);
          } else {
            console.log(response.message);
          }
        }, function (error) {
          console.log(error);
        });
      }
      $scope.visitedMecanismo = function (proId) {
        var userid = localStorage.getItem("User_Id");
        $scope.visiteduserdata = {
          user_id: userid,
          furniture_id: proId,
          type_visit: 'mecanismo'
        };
        dataManager.post(addvisitedUser, $scope.visiteduserdata).then(function (response) {
          if (response.status == "true") {
            console.log(response.message);
          } else {
            console.log(response.message);
          }
        }, function (error) {
          console.log(error);
        });
      }

      $scope.myproduct = function (proId) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        $scope.productdetail = {};

        var query = "SELECT id_foto, (" + imagePath + ") as path, orden, producto_id FROM producto_fotos WHERE producto_id = " + proId + " ORDER BY orden ASC";
        console.log('image query ' + query);
        $cordovaSQLite.execute(db, query).then(function (data) {
          $scope.productdetail.images = $scope.getAll(data);
        }, function (err) {
          // console.error("ctg_masaje error" + JSON.stringify(err));
        });

        var query = 'SELECT pro.id_producto, pro.nombre, pro.ancho, pro.alto, pro.profundo, pro.sku, pro.color_id, pro.tapiz_id, pro.mecanismo_id, pro.categoria_id, pro.masaje_id, pro.estatus, cat.nombre nombre_cat, col.nombre color_cat, tapiz.nombre tapiz_nombre, meca.nombre mecanismo_nombre, masaje.nombre masaje_nombre, pro.usuario_creacion creado_por,  pro.fecha_creacion  FROM  productos pro inner join ctg_categorias cat on cat.id = pro.categoria_id inner join ctg_colores col on col.id = pro.color_id inner join ctg_tapiz tapiz on tapiz.id = pro.tapiz_id inner join ctg_mecanismos meca on meca.id = pro.mecanismo_id left join  ctg_masaje masaje on masaje.id = pro.masaje_id  WHERE pro.id_producto = ' + proId + ' order by cat.nombre,pro.nombre asc';
        console.log("query" + query);
        $cordovaSQLite.execute(db, query).then(function (data) {
          $scope.productdetail.detail = $scope.getAll(data);
          $scope.visitedUser(proId);
          $ionicLoading.hide();
        }, function (err) {
          // console.error("product new error " + JSON.stringify(err));
        });
      }

      // get product detail
      $scope.getProductDetail = function (proId) {
        var ntw = $scope.checkNetwork();
        if (ntw == true) {
          dataManager.get(detailproduct).then(function (response) {
            if (response.status == "true") {
              $cordovaSQLite.execute(db, "DROP TABLE IF EXIST ctg_masaje");
              $cordovaSQLite.execute(db, "DROP TABLE IF EXIST ctg_categorias");


              $cordovaSQLite.execute(db, 'DELETE FROM ctg_masaje').then(function (res) {
                console.log("ctg_masaje is delete " + res);
              }, function (err) {
                console.log('ctg_masaje delete err' + err);
              });

              $cordovaSQLite.execute(db, 'DELETE FROM ctg_categorias').then(function (res) {
                console.log("ctg_categorias is delete " + res);
              }, function (err) {
                console.log('ctg_masaje delete err' + err);
              });


              // insert product
              var masaje = response.masaje;

              for (i = 0; i < masaje.length; i++) {
                console.log("ctg_masaje data " + masaje[i].nombre);
                var id = masaje[i].id;
                var nombre = masaje[i].nombre;
                var estatus = masaje[i].estatus;
                var fecha_creacion = masaje[i].fecha_creacion;
                var fecha_modificacion = masaje[i].fecha_modificacion;
                var usuario_creacion = masaje[i].usuario_creacion;
                var usuario_modificacion = masaje[i].usuario_modificacion;

                // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_masaje (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

                var query = "INSERT INTO ctg_masaje (id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion) VALUES (?,?,?,?,?,?,?)";
                $cordovaSQLite.execute(db, query, [id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion]).then(function (res) {
                  //console.log("is added ctg_masaje"  + res);
                  console.log("is added ctg_masaje" + JSON.stringify(res));
                }, function (err) {
                  console.error("error 5" + err);
                });

              }


              // insert product
              var categorias = response.categorias;

              for (i = 0; i < categorias.length; i++) {
                console.log("ctg_categorias " + categorias[i].nombre);
                var id = categorias[i].id;
                var nombre = categorias[i].nombre;
                var estatus = categorias[i].estatus;
                var fecha_creacion = categorias[i].fecha_creacion;
                var fecha_modificacion = categorias[i].fecha_modificacion;
                var usuario_creacion = categorias[i].usuario_creacion;
                var usuario_modificacion = categorias[i].usuario_modificacion;

                // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_categorias (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

                var query = "INSERT INTO ctg_categorias (id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion) VALUES (?,?,?,?,?,?,?)";
                $cordovaSQLite.execute(db, query, [id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion]).then(function (res) {
                  //console.log("is added ctg_categorias : "  + res);
                  console.log("is added ctg_categorias : " + JSON.stringify(res));
                }, function (err) {
                  console.error("error 4" + err);
                });

              }

              console.log('product id' + proId)



            } else {
              console.log("error 2" + response.message);
            }
          }, function (error) {
            console.log("error 3" + error);
          });

        } else {
          console.log('Connection not found!');
          // $cordovaToast.showLongBottom('Connection not found!');
        }

        $scope.myproduct(proId);

      }

      $scope.getProductdetailfull = function (fId, proId) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
 
        $scope.productdetailfull = {};
        $scope.productdetail = {};

        dataManager.get(productdetailfull+fId+"/"+proId).then(function (response) {
          console.log("entro en full detalle producto");
          if (response.status == "true") {
            console.log("error 4");
            $scope.productdetail.detail = response.data;
           // $scope.productdetailfull.detail = repsonse.data;
            $scope.productdetail.images = response.data.fotos;
            $scope.visitedUser(proId);
            $ionicLoading.hide();

            console.log('AAAAAAAAAAAAAAAAAAAAAaa');
            
            console.log(response);
            

          }else{
            console.log("error al llamar "+"etailproduct/proId"+ "(Mensaje):" + response.message);
          }
        }, function (error) {
            console.log("error 3" + error);
        });
      }


      $scope.getProductDetail2 = function (proId) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
 
        $scope.productdetail = {};

        dataManager.get(productdetail+"/"+proId).then(function (response) {
          console.log("entro en detalle producto");
          if (response.status == "true") {
            console.log("error 3");
            $scope.productdetail.detail = response.data;
            $scope.productdetail.images = response.data.fotos;
            $scope.visitedUser(proId);
            $ionicLoading.hide();

          }else{
            console.log("error al llamar "+"etailproduct/proId"+ "(Mensaje):" + response.message);
          }

        }, function (error) {
            console.log("error 3" + error);
        });


        /*var query = "SELECT id_foto, (" + imagePath + ") as path, orden, producto_id FROM producto_fotos WHERE producto_id = " + proId + " ORDER BY orden ASC";
        console.log('image query ' + query);
        $cordovaSQLite.execute(db, query).then(function (data) {
          $scope.productdetail.images = $scope.getAll(data);
        }, function (err) {
          // console.error("ctg_masaje error" + JSON.stringify(err));
        });*/

       /* var query = 'SELECT pro.id_producto, pro.nombre, pro.ancho, pro.alto, pro.profundo, pro.sku, pro.color_id, pro.tapiz_id, pro.mecanismo_id, pro.categoria_id, pro.masaje_id, pro.estatus, cat.nombre nombre_cat, col.nombre color_cat, tapiz.nombre tapiz_nombre, meca.nombre mecanismo_nombre, masaje.nombre masaje_nombre, pro.usuario_creacion creado_por,  pro.fecha_creacion  FROM  productos pro inner join ctg_categorias cat on cat.id = pro.categoria_id inner join ctg_colores col on col.id = pro.color_id inner join ctg_tapiz tapiz on tapiz.id = pro.tapiz_id inner join ctg_mecanismos meca on meca.id = pro.mecanismo_id left join  ctg_masaje masaje on masaje.id = pro.masaje_id  WHERE pro.id_producto = ' + proId + ' order by cat.nombre,pro.nombre asc';
        console.log("query" + query);
        $cordovaSQLite.execute(db, query).then(function (data) {
          $scope.productdetail.detail = $scope.getAll(data);
          $scope.visitedUser(proId);
          $ionicLoading.hide();
        }, function (err) {
          // console.error("product new error " + JSON.stringify(err));
        });*/
      }


      
    $ionicModal.fromTemplateUrl('js/products/modal-mecanismo.html', {
        scope: $scope,
        animation: 'slide-in-up',
     }).then(function(modal) {$scope.modal = modal;});

     $scope.openModalMecanismo = function(proId) {
     
      $scope.mecanismo='Pruebaq';
        $scope.modal.show();  
        var userid = localStorage.getItem("User_Id");
        $scope.visiteduserdata = {
          user_id: userid,
          furniture_id: proId,
          type_visit: 'mecanismo'
        };
        dataManager.post(addvisitedUser, $scope.visiteduserdata).then(function (response) {
          if (response.status == "true") {
            console.log(response.message);
          } else {
            console.log(response.message);
          }
        }, function (error) {
          console.log(error);
        });
      
      };

      $scope.trustSrc = function(src) {  
        return $sce.trustAsResourceUrl(src);  
      } 
      
      $ionicModal.fromTemplateUrl('js/products/modal-masaje.html', {
        scope: $scope,
        animation: 'slide-in-up',
     }).then(function(modal) {$scope.modal2 = modal;});

      $scope.openModalMasaje = function(proId) {

        $scope.mecanismo='Pruebaq';
          $scope.modal2.show();  
          var userid = localStorage.getItem("User_Id");
          $scope.visiteduserdata = {
            user_id: userid,
            furniture_id: proId,
            type_visit: 'masaje'
          };
          dataManager.post(addvisitedUser, $scope.visiteduserdata).then(function (response) {
            if (response.status == "true") {
              console.log(response.message);
            } else {
              console.log(response.message);
            }
          }, function (error) {
            console.log(error);
          });
        
        };

        $scope.pauseVideo = function() {

          var iframes = document.getElementsByTagName("iframe");
          if (iframes != null) {
              for (var i = 0; i < iframes.length; i++) {
                  iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
              }
            }
  
    
      };

     $scope.closeModal = function() {
        $scope.modal.hide(); 
        $scope.modal.remove();
       };

       $scope.closeModal2 = function() {
        $scope.modal2.hide(); 
        $scope.modal2.remove();
       };
     
       $scope.$on('modal.hidden', function() {
        $scope.pauseVideo();
      });


  
      //$scope.getProductDetail2($stateParams.prId);

      var store_id = localStorage.getItem("store_id"); 
      $scope.getProductdetailfull(store_id, $stateParams.prId);
      
    
    })

  })
