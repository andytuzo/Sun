data=[];
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

Titanium.UI.currentWindow.setRightNavButton(refresh);
refresh.addEventListener('click',function()
{
	refreshing();
});
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function()
{
	var json = eval(this.responseText);
	// create table view
	for (var i=0; i < json.length; i++) {
		data.push({title: json[i].nombre, hasChild:true, test:'map_view_por_validar.js',id: json[i].id});
	};
	var tableview = Titanium.UI.createTableView({
		data:data
	});

	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.test)
		{
			var win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title,
				id: e.rowData.id
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
xhr.onerror = function()
{
	Ti.API.info('in utf-8 error for GET');
};

function refreshing(){
	xhr.open("GET","http://sun.elwime.com/api/porvalidar");
	xhr.send({"a":"€漢字"});
}
refreshing();