angular.module('starter.controllers', ['ionic'])

.directive('validPasswordC', function () {
        return {
            require: 'ngModel',
            scope: {
                reference: '=validPasswordC'
            },
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {

                    var noMatch = viewValue != scope.reference
                    ctrl.$setValidity('noMatch', !noMatch);
                    return (noMatch) ? noMatch : !noMatch;
                });

                scope.$watch("reference", function (value) {

                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

                });
            }
        }
    })
.controller('AppCtrl', function($cordovaToast,$scope,$rootScope,$state, $ionicModal,$interval,$location,$ionicPopover,$ionicSideMenuDelegate,$filter, $window, $ionicLoading, $ionicPopup, $cordovaNetwork, $cordovaSQLite, $ionicPlatform, $timeout, categoryService,progressService, dataAccess, dataManager, Menu) {

	$ionicPlatform.ready(function() {


	$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  
   
	};

	// Notification Modal
	$ionicModal.fromTemplateUrl('templates/modules/notification.html', {
	scope: $scope
	}).then(function(modalNotification) {
	$scope.modalNotification = modalNotification;
	});
	$scope.closeNotification = function() {
	$scope.modalNotification.hide();
	};
	$scope.openNotifications = function() {
	$scope.modalNotification.show();
	};

	//$scope.menudata = { Altomin : '', Altomax : '', Anchomin : '', Anchomax : '', Promin : '', Promax: '' };

	$rootScope.$on('$stateChangeSuccess',
	function(event, toState, toParams, fromState, fromParams) {
	$rootScope.currentState=toState;
	}
	)
	 $scope.groups = [];

	// check network connection
	  $scope.checkNetwork = function netCheck() {
	        var isOnline = $cordovaNetwork.isOnline()
	      // listen for Online event
	        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
	            var onlineState = networkState;
	        })
	         console.log("is"+ isOnline);
	       return isOnline;
	    
	}


   var ntw = $scope.checkNetwork();

   if(ntw == true) { 

   $cordovaSQLite.execute(db,"DROP TABLE IF EXIST ctg_colores");
   $cordovaSQLite.execute(db,"DROP TABLE IF EXIST ctg_mecanismos");
   $cordovaSQLite.execute(db,"DROP TABLE IF EXIST ctg_tapiz");
   $cordovaSQLite.execute(db,"DROP TABLE IF EXIST ctg_masaje");
   $cordovaSQLite.execute(db,"DROP TABLE IF EXIST ctg_categorias");

	dataManager.get(color).then(function(response){
		if(response.status == "true"){
			 $cordovaSQLite.execute(db, 'DELETE FROM ctg_colores').then(function(res){
			 	console.log(" is delete " +res);
			 }, function(err){
			 		console.log('delete err' + err);
			 });
			 var color = response.data;
              for(i = 0; i<color.length; i++){
                var id = color[i].id;
                var nombre = color[i].nombre;
                var fecha_creacion = color[i].fecha_creacion;
                var fecha_modificacion = color[i].fecha_modificacion;
                var usuario_creacion = color[i].usuario_creacion;
                var usuario_modificacion = color[i].usuario_modificacion;

                // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_colores (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

            	var query = "INSERT INTO ctg_colores (id, nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion) VALUES (?,?,?,?,?,?)";
            	$cordovaSQLite.execute(db, query, [id,nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion]).then(function(res) {
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


		// get tapiz
	dataManager.get(tapiz).then(function(response){
		if(response.status == "true"){
			 $cordovaSQLite.execute(db, 'DELETE FROM ctg_tapiz').then(function(res){
			 	console.log(" is delete " +res);
			 }, function(err){
			 		console.log('delete err' + err);
			 });
			 var tapiz = response.data;
              for(i = 0; i<tapiz.length; i++){
                var id = tapiz[i].id;
                var nombre = tapiz[i].nombre;
                var fecha_creacion = tapiz[i].fecha_creacion;
                var fecha_modificacion = tapiz[i].fecha_modificacion;
                var usuario_creacion = tapiz[i].usuario_creacion;
                var usuario_modificacion = tapiz[i].usuario_modificacion;

                // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_tapiz (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

            	var query = "INSERT INTO ctg_tapiz (id,nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion) VALUES (?,?,?,?,?,?)";
            	$cordovaSQLite.execute(db, query, [id,nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion]).then(function(res) {
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


	// get mecanismo
	dataManager.get(mecanismo).then(function(response){
		if(response.status == "true"){
			 $cordovaSQLite.execute(db, 'DELETE FROM ctg_mecanismos').then(function(res){
			 	console.log(" is delete " +res);
			 }, function(err){
			 		console.log('delete err' + err);
			 });
			 var mecanismo = response.data;
              for(i = 0; i<mecanismo.length; i++){
                var id = mecanismo[i].id;
                var nombre = mecanismo[i].nombre;
                var fecha_creacion = mecanismo[i].fecha_creacion;
                var fecha_modificacion = mecanismo[i].fecha_modificacion;
                var usuario_creacion = mecanismo[i].usuario_creacion;
                var usuario_modificacion = mecanismo[i].usuario_modificacion;

                // create table
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ctg_mecanismos (id integer, nombre text, estatus integer, fecha_creacion text, fecha_modificacion text, usuario_creacion text, usuario_modificacion text)");

            	var query = "INSERT INTO ctg_mecanismos (id,nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion) VALUES (?,?,?,?,?,?)";
            	$cordovaSQLite.execute(db, query, [id,nombre,fecha_creacion,fecha_modificacion,usuario_creacion,usuario_modificacion]).then(function(res) {
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

	// get detail
	dataManager.get(detailproduct).then(function(response){
		if(response.status == "true"){

 		  $cordovaSQLite.execute(db, 'DELETE FROM ctg_masaje').then(function(res){
		        console.log("ctg_masaje is delete " +res);
		       }, function(err){
		          console.log('ctg_masaje delete err' + err);
		       });

    	      $cordovaSQLite.execute(db, 'DELETE FROM ctg_categorias').then(function(res){
		        console.log("ctg_categorias is delete " +res);
		       }, function(err){
		          console.log('ctg_masaje delete err' + err);
		       });


              // insert product
              var masaje = response.masaje;

              for(i = 0; i<masaje.length; i++){
              		console.log("ctg_masaje data " +  masaje[i].nombre);
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
	                 $cordovaSQLite.execute(db, query, [id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion]).then(function(res) {
	                		//console.log("is added ctg_masaje"  + res);
	                		console.log("is added ctg_masaje"  + JSON.stringify(res));
	             	 }, function (err) {
	                		console.error("error 5" + err);
	             	 });

              }


              // insert product
              var categorias = response.categorias;

              for(i = 0; i<categorias.length; i++){
              		console.log("ctg_categorias " +  categorias[i].nombre);
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
	              	$cordovaSQLite.execute(db, query, [id, nombre, estatus, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion]).then(function(res) {
	                		//console.log("is added ctg_categorias : "  + res);
	                		console.log( "is added ctg_categorias : "  +  JSON.stringify(res));
	             	 }, function (err) {
	                		console.error("error 4" + err);
	             	 });

              }
            

		} else {
			console.log(response.message);
		}
	}, function(error){
		console.log(error);
	});
 }









        $scope.groups = {};

     
		Menu.getData().then(function(result){
			$timeout(function () {
		  		$scope.groups = result;
		   }, 2000);
		})
	
	$scope.menudata = { Altomin : '00', Altomax : '', Anchomin : '', Anchomax : '', Promin : '', Promax: '' };
  	
    $scope.clearallmy = function(){
    	     
    	$scope.menudata = { Altomin : '', Altomax : '', Anchomin : '', Anchomax : '', Promin : '', Promax: '' };
    
    }


//	$scope.groups = response.data;







	// dataManager.get(mergemenu).then( function (response) {
	// 	if(response.status == "true"){
	// 		$scope.groups = response.data;
	// 	} else {
	// 		console.log(response.message);
	// 	}
	// }, function ( error ) {
	// 	console.log( error );
	// });



	//--------Get Category------------------------
	$rootScope.accordionConfig = {
		debug: false, //For developing
		animDur: 300, //Animations duration minvalue is 0
		expandFirst: false, //Auto expand first item
		autoCollapse: true, //Auto collapse item flag
		watchInternalChanges: false, //watch internal attrs of the collection (false if not needed)
		headerClass: '', //Adding extra class for the headers
		beforeHeader: '', //Adding code or text before all the headers inner content
		afterHeader: '', //Adding code or text after all the headers inner content
		topContentClass: '', //Adding extra class for topContent
		beforeTopContent: '', //Adding code or text before all the topContent if present on item
		afterTopContent: '', //Adding code or text after all the topContent if present on item
		bottomContentClass: '', //Adding extra class for topContent
		beforeBottomContent: '', //Adding code or text before all the topContent if present on item
		afterBottomContent: '', //Adding code or text before all the topContent if present on item
		menuLink: '#/app/categories' //Adding code or text before all the topContent if present on item
	};
	categoryService.getCategories()
	.then(function(response) {
		//console.log(response);
		// angular.forEach	(response.data.data,function(value, key){
		// 	//response.data.data[key].small_icon="";
		// 	})
		$rootScope.menuAccordionArray = response.data.data;
		//console.log($rootScope.menuAccordionArray);
		$rootScope.searchDefaultCats = getAutoSuggest($rootScope.menuAccordionArray);
		//console.log($rootScope.searchDefaultCats);
		//console.log($rootScope.searchDefaultCats);
		//$rootScope.searchDefaultCats = getAutoSuggest($rootScope.accordionArray);
	}, function(error) {
		$rootScope.tostMsg(error);
	});
//----search bar-----
	$scope.popularSearch = [{heading:'Popular Search',items:[{id:1,title:'Game tables',parent_category:'ACCENT'},{id:2,title:'Ashley Dining Set',parent_category:'DINING'},{id:3,title:'Futon Chairs',parent_category:'LIVING'},{id:4,title:'Conference Table',parent_category:'OFFICE'},{id:5,title:'Harbor Cabinet',parent_category:'STROAGE'}]}];
	$scope.getSearchResult = function(keywords){
		$scope.searchCats = $filter('filter')($scope.searchDefaultCats, { title: keywords });
		// console.log($scope.searchDefaultCats);
		// console.log($scope.searchCats);
		if($scope.searchCats=='') $scope.searchCats = '';
	}
	$scope.resetSearch = function(keywords){ $scope.searchCats = '';	}
	$scope.searchProduct = function(cat_id,title){
	// console.log(cat_id);
	// console.log(title);
		// $location.path("app/search/"+cat_id+"/"+title.replace("&amp;","and"));
		$location.path("app/products/"+cat_id+"/"+title.replace("&amp;","and"));

	}
//-----------------------------------------
		//code for the toggle effect of the category section wit default section
		 $scope.isCategory=true;
			$scope.cattoggle = function(){
			 if($scope.isCategory){
			$scope.isCategory=false;
		}
		else{
			$scope.isCategory=true;
			}
		 };
		 //----------------User Login-----------------------------------
			 $scope.logindata = {username:'',password:'',device_uuid:''};
			 $scope.userLogin = function(form){
					 $scope.logindata.device_uuid = $scope.device_uuid;
					 if(form.$valid) {
						//  usersService.userLogin($scope.logindata)
						//  .then(function(response){
						// 	 if(response.status){
						// 		 $scope.logindata = {username:'',password:''};
						// 		 $scope.usermaster.access_token = response.data;
						// 		 $scope.getUserProfile(response.data);
						// 		 $scope.userModal(1,'hide');
						// 	 }
						// 	 alertmsgService.tostMessage(response.msg);
						//  });
						//console.log('success');
						progressService.showLoader();
						$scope.uModal.hide();
						setTimeout(function(){ progressService.hideLoader();}, 3000);
						$location.path("app/dashboard");
					 }
			 }
			 $scope.userLoginPassword = function(form){
					 $scope.logindata.device_uuid = $scope.device_uuid;
					 if(form.$valid) {
						progressService.showLoader();
						setTimeout(function(){ progressService.hideLoader();}, 2000);
						$location.path("app/dashboard");
					 }
			 }
		 //----------------Get User Profile-----------------------------------

			//  $scope.getUserProfile = function(authData){
			 //
			// 	 usersService.userProfile(authData)
			// 	 .then(function(response){
			// 		 console.log(response);
			// 		 if(response.status){
			// 			 $scope.usermaster.username		= response.data.username;
			// 			 $scope.usermaster.name			= response.data.name;
			// 			 $scope.usermaster.email			= response.data.email;
			// 			 $scope.usermaster.logintype		= response.data.logintype;
			// 			 $scope.usermaster.profile_img	= response.data.profile_img;
			 //
			// 			 $localStorage.usermaster = $scope.usermaster;
			// 		 }
			// 		 //alertmsgService.tostMessage(response.msg);
			// 	 });
			 //
			//  }
		 //-------------Forgot Password----------------------------------
			 $scope.forgotdata = {email:''};
			 $scope.forgotPwd = function(form){
					 if(form.$valid) {
						//  usersService.userForgetPassword($scope.forgotdata)
						//  .then(function(response){
						// 	 if(response.status)$scope.forgotdata = {email:''};
						// 	 alertmsgService.tostMessage(response.msg);
						//  });
						progressService.showLoader();
						$scope.uModal.hide();
						setTimeout(function(){ progressService.hideLoader();}, 3000);

					 }
			 }
		 //-----------Register-----------------------------------------
			 $scope.userdata = {fullname:'',useremail:'',password:'',confirm_password:''};
			 $scope.userRegister = function(form){
					 if(form.$valid) {
						//  usersService.userSignup($scope.userdata)
						//  .then(function(response){
						// 	 if(response.status)$scope.userdata = {fullname:'',useremail:'',password:'',confirm_password:''};
						// 	 alertmsgService.tostMessage(response.msg);
						//  });
						progressService.showLoader();
						$scope.uModal.hide();
						setTimeout(function(){ progressService.hideLoader();}, 3000);
					 }
			 }
		 //----------------User Modals--------------------------------
		 $scope.userModal = function(index,action,animation,active) {

		 	//console.log(index);
		 	$scope.modal_url		='';
		 	$scope.modal_index		= index;
		 	if(animation===undefined) $scope.modal_animation ='fadeIn'; else $scope.modal_animation = animation;
		 	if(index == 1)	$scope.modal_url = 'js/userauth/modal-login.html';
		 	if(index == 2)  $scope.modal_url = 'js/userauth/modal-signup.html';
		 	if(index == 3)  $scope.modal_url = 'js/userauth/modal-forgotpassword.html';

		 	if(action!='hide'){
		 		if($scope.uModal)$scope.uModal.hide();
		 		$ionicModal.fromTemplateUrl($scope.modal_url, {
		 			id: $scope.modal_index, // We need to use and ID to identify the modal that is firing the event!
		 			scope: $scope,
		 			backdropClickToClose: false,
		 			animation: 'animated ' + $scope.modal_animation,
		 			hideDelay:920
		 		}).then(function(modal) {
		 				$scope.uModal = modal;
		 				$scope.uModal.show();
		 		});
		 	}
		 	if(action=='hide'){
				$scope.uModal.hide();
			}

		 }


		 $scope.logout = function(){

		 	  $ionicPopup.confirm({
                    title: 'Logout',
                    template: '¿Desea salir de la aplicación?'
                })
                        .then(function (result) {
                            if (result) {
                            	$cordovaToast.showLongBottom("Logout succesfully!");
                                $window.localStorage.clear();
                                localStorage.setItem("User_Id", '');
                                $window.location.href = '#/login';
                            }
                        });

		 };


		 
		  // for (var i=0; i<3; i++) {
		  //   $scope.groups[i] = {
		  //     name: i,
		  //     items: [],
		  //     show: false
		  //   };
		  //     $scope.groups[i].items[i] = $scope.menudata+i;
		  // }
  
		  /*
		   * if given group is the selected group, deselect it
		   * else, select the given group
		   */
		  $scope.toggleGroup = function(group) {
		    group.show = !group.show;
		  };
		  $scope.isGroupShown = function(group) {
		    return group.show;
		  };

	});

})
