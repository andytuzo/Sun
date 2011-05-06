var win = Titanium.UI.currentWindow;

var isAndroid = false;
if (Titanium.Platform.name == 'android') {
	isAndroid = true;
}


	

//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	//region:{latitude:parseFloat(win.lat), longitude:parseFloat(win.lng), latitudeDelta:0.5, longitudeDelta:0.5},
	animate:true,
	regionFit:true,
	userLocation:true,
});


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
		mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
	});
	
	// Tipos De Check In
	std.addEventListener('click',function() {
		// set map type to standard
		
		
		if(true){
			
			var win = null;
		
				win = Titanium.UI.createWindow({
					url:'metadata.js',
					title:'Check In',
					backgroundColor:'#fff',
					barColor:'#111',
					id:Ti.UI.currentWindow.id

				});

			Titanium.UI.currentTab.open(win,{animated:true});
		}else{
			alert("Check In Simple");
		}
		win.close();
	});
	
	// Meta Data
	hyb.addEventListener('click',function() {
		
		var w = Ti.UI.createWindow({
			
		});
		var b = Ti.UI.createButton({
			title:'Cerrar',
			width:100,
			height:30
		});
		
		b.addEventListener('click',function()
		{
			w.close();
		});
		
		w.add(b);
		w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,navBarHidden:true});
		
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
	//win.rightNavButton = removeAll;

	//
	// TOOLBAR BUTTONS
	//
	

	// activate annotation
	//mapview.selectAnnotation(mapview.annotations[0].title,true);
	

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
		title:'Metadata',
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
	
	win.setToolbar([flexSpace,std,flexSpace]);
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




