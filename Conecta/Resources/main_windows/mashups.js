data=[];


Ti.include("version.js");
var longitude;
var latitude;



var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
Titanium.UI.currentWindow.setRightNavButton(refresh);
refresh.addEventListener('click',function()
{
	refreshing();
});
var xhr1 = Titanium.Network.createHTTPClient();
xhr1.onload = function()
{
	//alert(this.responseText);
	Ti.API.info(this.responseText);
	data=[];
	var json = eval(this.responseText);
	// create table view
	for (var i=0; i < json.length; i++) {
		//alert(json[i].tipo_de_entrega);
		data.push({title: json[i].descripcion, hasChild:true, tipo_de_entrega:json[i].tipo_de_entrega, test:'map_view.js', id: json[i].id, red: json[i].red, descripcion:json[i].descripcion, lat:json[i].lat,lng:json[i].lng, lote:json[i].lote,cuestionarios:json[i].cuestionarios });
	};
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	Titanium.UI.iPhone.appBadge = null;
	Titanium.UI.iPhone.appBadge = data.length;
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{	
		if (e.rowData.test)
		{
			//alert(e.rowData.tipo_de_entrega);
			var win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title,
				red:e.rowData.red,
				descripcion:e.rowData.descripcion,
				lat:e.rowData.lat,
				lng:e.rowData.lng,
				tipo_de_entrega: e.row.tipo_de_entrega,
				lote: e.row.lote,
				id: e.row.id,
				user_id:  Titanium.UI.currentWindow.id,
				
				
			});
			if (e.rowData.barColor)
			{
				win.barColor = e.rowData.barColor;
			}
			if (e.rowData.title_image)
			{
				win.titleImage = e.rowData.title_image;
			}
			Titanium.UI.currentTab.open(win,{animated:true});
		}
	});

	// add table view to the window
	Titanium.UI.currentWindow.add(tableview);
};
xhr1.onerror = function()
{
	alert("Problemas de Conectividad ar cargar Ordenas de Entrega");
};
function refreshing(){
	if (Titanium.Geolocation.locationServicesEnabled==false)
	{
		Titanium.UI.createAlertDialog({title:'Alerta', message:'Tu configuración de GPS esta desactivada.'}).show();
	}else{

		Titanium.Geolocation.getCurrentPosition(function(e)
		{
			if (!e.success || e.error)
			{
				alert('error ' + JSON.stringify(e.error));
				return;
			}

			longitude = e.coords.longitude;
			latitude = e.coords.latitude;
			var altitude = e.coords.altitude;
			var heading = e.coords.heading;
			var accuracy = e.coords.accuracy;
			var speed = e.coords.speed;
			var timestamp = e.coords.timestamp;
			var altitudeAccuracy = e.coords.altitudeAccuracy;
			Ti.API.info('speed ' + speed);
			//alert('long:' + longitude + ' lat: ' + latitude);
		});


	}
	xhr1.open("POST","http://sun.elwime.com/api/ordenDeEntrega/"+Titanium.UI.currentWindow.id);
	xhr1.send({"lng" : longitude, "lat" : latitude});
}
refreshing();