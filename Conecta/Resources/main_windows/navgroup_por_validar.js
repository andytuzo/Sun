
var modal = Ti.UI.createWindow({
	navBarHidden:true
});

var modalWin = Ti.UI.createWindow({
	
});

var nav = Ti.UI.iPhone.createNavigationGroup({
	window:modalWin
});


var tf1 = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:80,
	left:10,
	width:300,
	hintText :"Nombre de la persona que recibe",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});


modalWin.add(tf1);

var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});

modalWin.setRightNavButton(done);
done.addEventListener('click',function()
{
	modal.close();
	Ti.UI.currentWindow.close();
});



modal.add(nav);
modal.open({modal:true});
