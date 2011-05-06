
var modal = Ti.UI.createWindow({
	navBarHidden:true
});

var modalWin = Ti.UI.createWindow({
	
});

var nav = Ti.UI.iPhone.createNavigationGroup({
	window:modalWin
});

var actInd = Titanium.UI.createActivityIndicator({
	top:50, 
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
});
modalWin.add(actInd);

var camara = Titanium.UI.createButton({
	color:'#336699',
	height:35,
	top:80,
	left:10,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	title:'Camara',
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
camara.addEventListener('click',function()
{
	Titanium.Media.showCamera({

		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;

			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
			f.write(image);
			//win.backgroundImage = f.nativePath;

			var xhr = Titanium.Network.createHTTPClient();

		    var timeout = setInterval(function() {
		        if (xhr.readyState == 4) {
		            clearInterval(timeout);
		            actInd.hide();
		        }
		    }, 1000);

		    xhr.onload = function() {
				alert("Exito");
		        alert(this.responseText);
				camara.title="√ Foto";
				
				
				
				
				
				
				var check = Titanium.Network.createHTTPClient();
				check.onload = function()
				{
					alert(this.responseText);
					
				}
				check.onerror = function()
				{
					alert("No se puedo realizar Checkin. Compruebe Señal");
				};
				check.open("POST","http://sun.elwime.com/api/checkin/");
				check.send({"user":Ti.UI.currentWindow.user_id, "id":Ti.UI.currentWindow.id, "estatus": "Entregado con Foto", "lote":Ti.UI.currentWindow.lote });
				
				
				
				
				
				
				
		    }
			actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
			actInd.show();
		    xhr.open("POST", 'http://sun.elwime.com/api/do_upload');
		    xhr.setRequestHeader('Content-Type', 'form-data');
		    xhr.send({userfile:image,"id":Ti.UI.currentWindow.id });
	
	
			
			
		},
		cancel:function()
		{

		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});

			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Device does not have video recording capabilities');
				camara.title="√ Foto"
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}

			// show alert
			a.show();
		},
		allowEditing:true
	});
});

var tf1 = Titanium.UI.createTextField({
	color:'#336699',
	height:35,
	top:30,
	left:10,
	width:300,
	hintText :"Nombre de la persona que recibe",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});


modalWin.add(camara);
modalWin.add(tf1);

var done = Titanium.UI.createButton({
	title:'Check In',
});

modalWin.setLeftNavButton(done);
done.addEventListener('click',function()
{
	if(camara.title=="√ Foto"){
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Realizar Check in',
		    message: '¿Estas Seguro?',
		    buttonNames: ['Aceptar','Cancelar']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e) {
			if(e.index==0){
				alert("Envio Exitoso");
				modal.close();
				Ti.UI.currentWindow.close();
				
			}else if(e.index=1){
				alertDialog.close();
				modal.close();
				Ti.UI.currentWindow.close();
				
			}
			
		});
		
		
	}else{
		alert("Toma una fotografía Por Favor");
	}

});
var cancelar = Titanium.UI.createButton({
	title:'Cancelar',
});

modalWin.setRightNavButton(cancelar);
cancelar.addEventListener('click',function()
{
	
	modal.close();
});





modal.add(nav);
modal.open({modal:true});
