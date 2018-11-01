// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic',
 'starter.controllers',
  'starter.services',
  'starter.directives',  
  'starter.daf',
  'starter.dmf',
  'starter.saf',
  'sir-accordion',
  'ui.bootstrap',
  'ui.bootstrap.modal',
  'ionicShop',
  'ionic-datepicker',
  'ngCordova',
  'ngStorage',
  'ngMessages', 'ngCordovaOauth'])

.run(function($cordovaPushV5,$ionicPlatform,$rootScope,$cordovaSQLite,$cordovaNetwork,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


     setTimeout(function() {
        navigator.splashscreen.hide();
     }, 100);


    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  // for opening a background db:
   db = $cordovaSQLite.openDB({ name: "muebledi_distincion.db", location : 'default' });

   if($cordovaNetwork.isOnline() == true){

       $cordovaSQLite.execute(db,"DROP TABLE IF EXIST productos");
       $cordovaSQLite.execute(db,"DROP TABLE IF EXIST producto_tienda");
       $cordovaSQLite.execute(db,"DROP TABLE IF EXIST producto_fotos");
   }

   // table for menu colour
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_colores (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

   // table for mechanismo
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_mecanismos (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

   // table for ctg_tapiz
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_tapiz (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

  // table for productos
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS productos (id_producto integer, nombre text, tapiz_id integer, mecanismo_id integer, masaje_id integer, color_id integer, ancho integer, alto integer, profundo integer, estatus integer, categoria_id integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

   // table for producto_tienda
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS producto_tienda (id integer, producto_id integer, tienda_id integer)");

   // table for  producto_fotos
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  producto_fotos (id_foto integer, producto_id integer, path text, orden integer)");
   
   // table for  ctg_categorias
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_categorias (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");
  
   // table for  ctg_masaje
   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_masaje (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");
    

    $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit",function(a){},function(b){}
      );
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }
    e.preventDefault();
    return false;
  },101);


    
  
  });
  //--default clase for the currency vairable
  $rootScope.currencyIcon = 'ion-social-usd';
})

// Modal State Provider for nested modal
.provider('modalState', function($stateProvider) {
    var provider = this;
    this.$get = function() {
        return provider;
    }
    this.state = function(stateName, options) {
        var modalInstance;
        $stateProvider.state(stateName, {
            url: options.url,
            onEnter: function($modal, $state) {
                modalInstance = $modal.open(options);

                modalInstance.result['finally'](function() {
                    modalInstance = null;
                    console.log($state.$current.name,stateName);
                    if ($state.$current.name === stateName) {
						alert("goback");
                        $state.go('^');
                    }
                });

            },
            onExit: function() {
                if (modalInstance) {
                    modalInstance.close();
                }
            }
        });
    };

})


.config(function($stateProvider,modalStateProvider,$urlRouterProvider,$ionicConfigProvider) {


  if (ionic.Platform.isAndroid())$ionicConfigProvider.scrolling.jsScrolling(false);

  $ionicConfigProvider.navBar.alignTitle('center');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  /*Registration state*/
  .state('register', {
    cache:false,
    url: '/register',
    templateUrl: 'js/registration/register.html',
    controller: 'RegisterCtrl'
  })

  /*Login state*/
  .state('login', {
    cache:true,
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  })

  /*Login state*/
  .state('forgetpass', {
    cache:true,
    url: '/forgetpass',
    templateUrl: 'js/forgetpass/forgetpass.html',
    controller: 'ForgetpassCtrl'
  })



  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'js/dashboard/dashboard.html',
	controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.dashboardlist', {
    url: '/dashboardlist',
    views: {
      'menuContent': {
        templateUrl: 'js/dashboard/dashboardlist.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.categories', {
    cache:false,
      url:'/categories/:catid',
      views: {
        'menuContent': {
          templateUrl: 'js/products/products_banner.html',
		  controller: 'Products_bannerCtrl'
        }
      }
    })

		.state('app.products', {
      cache:false,
      url: '/products/:catid/:catName',
      views: {
        'menuContent': {
          templateUrl: 'js/products/product_list.html',
		  controller: 'ProductListCtrl'
        }
      }
    })

    .state('app.productdetail', {
      cache:false,
      url: '/productdetail/:prId',
      views: {
        'menuContent': {
          templateUrl: 'js/products/product_detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })


		// .state('app.productslistdetail', {
  //     cache:false,
  //     url: '/productdetail/:prId/:catid/:catName',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'js/products/product_detail.html',
		//       controller: 'ProductDetailCtrl'
  //       }
  //     }
  //   })

    //------------------
    .state('app.shopping-cart', {
   	cache:false,
       url: '/shopping-cart',
       views: {
         'menuContent': {
           templateUrl: 'js/cart/cart.html',
           controller: 'CartCtrl'
         }
       }
     })

     .state('app.delivery-address', {
     cache:false,
        url: '/delivery-address',
        views: {
          'menuContent': {
            templateUrl: 'js/cart/delivery-address.html',
            controller: 'CartDeliveryCtrl'
          }
        }
      })

      .state('app.delivery-options', {
     cache:false,
        url: '/delivery-options',
        views: {
          'menuContent': {
            templateUrl: 'js/cart/delivery-options.html',
            controller: 'CartOptionsCtrl'
          }
        }
      })

     .state('app.shipping-address', {
  cache:false,
     url: '/shipping-address',
     views: {
       'menuContent': {
         templateUrl: 'js/cart/shipping-address.html',
         controller: 'CartDeliveryCtrl'
       }
     }
   })

    .state('app.place-order', {
     cache:false,
        url: '/place-order',
        views: {
          'menuContent': {
            templateUrl: 'js/cart/place-order.html',
            controller: 'CartOrderCtrl'
          }
        }
      })

    .state('app.order-status', {
     cache:false,
        url: '/order-status/:status_id',
        views: {
          'menuContent': {
            templateUrl: 'js/cart/order-status.html',
            controller: 'CartOrderStatusCtrl'
          }
        }
      })
      //---------------------------
      .state('app.orders', {
     	cache:false,
         url: '/orders',
         views: {
           'menuContent': {
             templateUrl: 'js/orders/orders.html',
             controller: 'OrdersCtrl'
           }
         }
       })
       .state('app.editpasswordpage', {
         url: '/changepassword',
         views: {
           'menuContent': {
             templateUrl: 'js/changepassword/edit-password.html',
     		controller: 'EditpasswordCtrl'
           }
         }
       })

       .state('app.profile', {
         url: '/profile',
         views: {
           'menuContent': {
             templateUrl: 'js/profile/profile.html',
     		controller: 'ProfileCtrl'
           }
         }
       })
       .state('app.search', {
         url: '/search',
         views: {
           'menuContent': {
             templateUrl: 'templates/modules/search.html',
     		controller: 'SearchCtrl'
           }
         }
       })
		;
  // if none of the above states are matched, use this as the fallback
var User_Id = localStorage.getItem("User_Id");
var State = 'login';
  if(User_Id) {
    State = "app/dashboardlist";
  }
  $urlRouterProvider.otherwise('/'+State);
  // $urlRouterProvider.otherwise('/login');
  //  modalStateProvider.state('app.dashboard.search', {
  //       url: '/search',
  //       templateUrl: 'templates/modules/search.html',
  //       controller: 'SearchCtrl'
  //   });
  //   modalStateProvider.state('app.dashboardlist', {
  //       url: '/dashboardlist',
  //       templateUrl: 'js/dashboard/dashboardlist.html'
  //   });
});
Array.prototype.getIndexBy = function (name, value) {
for (var i = 0; i < this.length; i++) {
    if (this[i][name] == value) {
        return i;
    }
}
return -1;
}
