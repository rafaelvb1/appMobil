var baseUrl = "http://distincion.mx/api/";

//var baseUrl = "http://192.168.1.120/distincion/api/";

//Vendor
var userLoginState = baseUrl+"vendedor/validarCredencialesVendedor/";
var userRegisterState = baseUrl+"vendedor/guardarVendedor/";
var userForgetpassState = baseUrl+"vendedor/forgetpassword/";
var productlist = baseUrl+"vendedor/obtenerMueblesPorTiendaYCategoria";
var productdetail = baseUrl+"vendedor/obtenerProductoPorId";
var getUserDetail = baseUrl+"vendedor/getuserdetail";
var userUpdateState = baseUrl+"vendedor/userupdate/";
var addvisitedUser = baseUrl+"vendedor/guardarVisita/";

var productRelatedData = baseUrl+"vendedor/getproductrelatedinfo/";

var productosPorTienda = baseUrl+"vendedor/obtenerMueblesPorTienda/";
var detailproduct = baseUrl+"vendedor/detailproduct/";

//Catalog
var storeList = baseUrl+"catalog/obtenerTiendas";
var statesList = baseUrl+"catalog/obtenerEstadoPorTienda/";
var cityList = baseUrl+"catalog/obtenerLocalidadesPorTiendaEstado/";
var branchList = baseUrl+"catalog/obtenerSucursalesPorLocalidad/";
var tapiz = baseUrl+"catalog/obtenerTipoTapiz";
var color = baseUrl+"catalog/obtenerColores";
var mecanismo = baseUrl+"catalog/obtenerTipoMecanismos";
var mergemenu = baseUrl+"catalog/getMergeMenu";

// Agent
var userChangePassword = baseUrl+"agente/changePassword/";
