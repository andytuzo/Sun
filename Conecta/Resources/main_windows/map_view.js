var win = Titanium.UI.currentWindow;

var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}



var atlantaParams = {
		latitude:parseFloat(win.lat),
		longitude:parseFloat(win.lng),
		title:"Punto de Entrega",
		subtitle:win.descripcion,
		pincolor: isAndroid ? "orange" : Titanium.Map.ANNOTATION_RED,
		animate:true,
		myid:1 
};
	
	
if (!isAndroid) {
	atlantaParams.pincolor = Titanium.Map.ANNOTATION_PURPLE;
} else {
	atlantaParams.pinImage = "../images/map-pin.png";
}
var atlanta = Titanium.Map.createAnnotation(atlantaParams);

//
// PRE-DEFINED REGIONS
//
var regionAtlanta = {latitude:33.74511,longitude:-84.38993,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};
var regionSV = {latitude:37.337681,longitude:-122.038193,animate:true,latitudeDelta:0.04, longitudeDelta:0.04};

//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:parseFloat(win.lat), longitude:parseFloat(win.lng), latitudeDelta:0.005, longitudeDelta:0.005},
	animate:true,
	regionFit:true,
	userLocation:true,
});

if (!isAndroid) {
	mapview.addAnnotation(atlanta);
}
mapview.selectAnnotation(atlanta);
win.add(mapview);

//
// NAVBAR BUTTONS
//

var removeAll = null;
var sat = null;
var std = null;
var hyb = null;
var zoomin = null;
var zoomout = null;
		
var wireClickHandlers = function() {
	removeAll.addEventListener('click', function() {
		mapview.removeAllAnnotations();
	});

	

	
	sat.addEventListener('click',function() {
		// set map type to satellite
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Reportar',
		    message: 'Elige un motivo',
		    buttonNames: ['Cambió de domicilio','No abrieron','No conocen a la persona','Casa vacía','Terreno baldío', 'Cancelar']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e) {
			if(e.index==0){
				
				var check = Titanium.Network.createHTTPClient();
				check.onload = function()
				{
					alert(this.responseText)
				}
				check.onerror = function()
				{
					alert("No se puedo realizar Checkin. Compruebe Señal");
				};
				check.open("POST","http://sun.elwime.com/api/checkin/");
				check.send({"user":Ti.UI.currentWindow.user_id, "id":Ti.UI.currentWindow.id, "estatus": "No Abrieron","lote":Ti.UI.currentWindow.lote });
				
				Ti.UI.currentWindow.close();
			}else if(e.index=1){
				var check = Titanium.Network.createHTTPClient();
				check.onload = function()
				{
					alert(this.responseText)
				}
				check.onerror = function()
				{
					alert("No se puedo realizar Checkin. Compruebe Señal");
				};
				check.open("POST","http://sun.elwime.com/api/checkin/");
				check.send({"user":Ti.UI.currentWindow.user_id, "id":Ti.UI.currentWindow.id, "estatus": "Domicilio Erroneo" , "lote":Ti.UI.currentWindow.lote });
				Ti.UI.currentWindow.close();
			}else if(e.index==2){
				var check = Titanium.Network.createHTTPClient();
				check.onload = function()
				{
					alert(this.responseText)
				}
				check.onerror = function()
				{
					alert("No se puedo realizar Checkin. Compruebe Señal");
				};
				check.open("POST","http://sun.elwime.com/api/checkin/");
				check.send({"user":Ti.UI.currentWindow.user_id, "id":Ti.UI.currentWindow.id, "estatus": "Se rechazo Documento", "lote":Ti.UI.currentWindow.lote  });
				Ti.UI.currentWindow.close();
				
			}
		});
	});
	
	// Tipos De Check In
	std.addEventListener('click',function() {
		// set map type to standard
		
		//alert(Ti.UI.currentWindow.tipo_de_entrega);
		if(Ti.UI.currentWindow.tipo_de_entrega==1){
			
			var win = null;
		
				win = Titanium.UI.createWindow({
					url:'navgroup.js',
					title:'Check In',
					backgroundColor:'#fff',
					barColor:'#111',
					id:Ti.UI.currentWindow.id,
					user_id:Ti.UI.currentWindow.user_id,
					lote:Ti.UI.currentWindow.lote

				});

			Titanium.UI.currentTab.open(win,{animated:true});
			
			
		}else{
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: 'Realizar Check in',
				    message: '¿Estas Seguro?',
				    buttonNames: ['Aceptar','Cancelar']
				});
				alertDialog.show();
				alertDialog.addEventListener('click',function(e) {
					if(e.index==0){
						var check = Titanium.Network.createHTTPClient();
						check.onload = function()
						{
							
							
							alert(this.responseText);
							Ti.UI.currentWindow.close();
						}
						check.onerror = function()
						{
							alert("No se puedo realizar Checkin. Compruebe Señal");
						};
						check.open("POST","http://sun.elwime.com/api/checkin/");
						check.send({"user":Ti.UI.currentWindow.user_id, "id":Ti.UI.currentWindow.id, "estatus": "Entregado", "lote":Ti.UI.currentWindow.lote });
						
					}else if(e.index=1){
						alertDialog.close();
					}
					
				});
		}
		
			
		
		win.close();
			if(Ti.UI.currentWindow.cuestionarios!=0){
				//alert(Ti.UI.currentWindow.cuestionarios);


				var win = null;

					win = Titanium.UI.createWindow({
						url:'web_views.js',
						title:'Check In',
						backgroundColor:'#fff',
						cuestionario:Ti.UI.currentWindow.cuestionarios

					});

				Titanium.UI.currentTab.open(win,{animated:true});


			}
	
	});
	
	
	hyb.addEventListener('click',function() {
			var win = null;
		
				win = Titanium.UI.createWindow({
					url:'metadata.js',
					title:'Check In',
					backgroundColor:'#fff',
					barColor:'#111',
					id:Ti.UI.currentWindow.id

				});
			Titanium.UI.currentTab.open(win,{animated:true});
	});
	
	zoomin.addEventListener('click',function() {
		mapview.zoom(1);
	});
	
	zoomout.addEventListener('click',function() {
		mapview.zoom(-1);
	});
}		

if (!isAndroid) {
	removeAll = Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		title:'Remove All'
	});

	mapview.addEventListener('complete', function()
	{
		Ti.API.info("map has completed loaded region");
	});
	
	
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	// button to change map type to SAT
	sat = Titanium.UI.createButton({
		title:'Reportar',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	// button to change map type to STD
	std = Titanium.UI.createButton({
		title:'Check In',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	// button to change map type to HYBRID
	hyb = Titanium.UI.createButton({
		title:'Detalles',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	// button to zoom-in
	zoomin = Titanium.UI.createButton({
		title:'+',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	// button to zoom-out
	zoomout = Titanium.UI.createButton({
		title:'-',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	wireClickHandlers();
	
	win.setToolbar([flexSpace,std,flexSpace,hyb,flexSpace,sat]);
} else {
	var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		
		
		sat = menu.add({title : 'Sat'});
		std = menu.add({title : 'Std'});
		hyb = menu.add({title : 'Hyb'});
		zoomin = menu.add({title : "Zoom In"});
		zoomout = menu.add({title : 'Zoom Out'});
		removeAll = menu.add({title:'Remove All'});
		
		wireClickHandlers();
	}
}

//
// EVENT LISTENERS
//

// region change event listener
mapview.addEventListener('regionChanged',function(evt)
{
	Titanium.API.info('maps region has updated to '+evt.longitude+','+evt.latitude);
});

var annotationAdded = false;

// map view click event listener
mapview.addEventListener('click',function(evt)
{

	// map event properties
	var annotation = evt.annotation;
	var title = evt.title;
	var clickSource = evt.clicksource;

	// custom annotation attribute
	var myid = (evt.annotation)?evt.annotation.myid:-1;

	Ti.API.info('mapview click clicksource = ' + clickSource);
	// use custom event attribute to determine if atlanta annotation was clicked
	if (myid == 3 && evt.clicksource == 'rightButton')
	{
		//  change the annotation on the fly
		evt.annotation.rightView = Titanium.UI.createView({width:20,height:20,backgroundColor:'red'});
		evt.annotation.leftView = Titanium.UI.createView({width:20,height:20,backgroundColor:'#336699'});
		evt.annotation.title = "Atlanta?";
		evt.annotation.pincolor = Titanium.Map.ANNOTATION_GREEN;
		evt.annotation.subtitle = 'Appcelerator used to be near here';
		evt.annotation.leftButton = 'images/appcelerator_small.png';

	}
	if (myid == 2)
	{
		if(annotationAdded==false)
		{
			mapview.addAnnotation(mountainView);
			annotationAdded=true;
		}
		else
		{
			mapview.removeAnnotation(mountainView);
			annotationAdded=false;
		}
	}
});

// annotation click event listener (same as above except only fires for a given annotation)
atlanta.addEventListener('click', function(evt)
{
	// get event properties
	var annotation = evt.source;
	var clicksource = evt.clicksource;
	Ti.API.info('atlanta annotation click clicksource = ' + clicksource);
});


