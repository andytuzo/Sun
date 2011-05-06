
var modal = Ti.UI.createWindow({
	navBarHidden:true,
	
});
var scroll= Titanium.UI.createScrollView({
	top:50,
});

var modalWin = Ti.UI.createWindow({
	
});

var nav = Ti.UI.iPhone.createNavigationGroup({
	window:modalWin
});
var tipo = Titanium.UI.createButton({
	color:'#336699',
	height:25,
	top:20,
	left:10,
	width:300,
  title: 'tipo',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});


scroll.add(tipo);



var color = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:50,
	left:10,
	width:300,
	hintText :"Color Fachada",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(color);

var niveles = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:80,
	left:10,
	width:300,
	hintText :"Niveles",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(niveles);

var carac_barda = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:110,
	left:10,
	width:300,
	hintText :"Caracteristica de Barda",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(carac_barda);

var reja = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:140,
	left:10,
	width:300,
	hintText :"Color de reja",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(reja);

var porton = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:170,
	left:10,
	width:300,
	hintText :"Portón",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(porton);

var buzon = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:200,
	left:10,
	width:300,
	hintText :"Buzón",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(buzon);

var medidorluz = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:230,
	left:10,
	width:300,
	hintText :"Medidor de Luz",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(medidorluz);

var medidorgas = Titanium.UI.createTextField({
	color:'#336699',
	height:25,
	top:260,
	left:10,
	width:300,
	hintText :"Medidor de gas",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(medidorgas);

var observaciones = Titanium.UI.createTextField({
	color:'#336699',
	height:55,
	top:290,
	left:10,
	width:300,
	hintText :"Observaciones",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

scroll.add(observaciones);

var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});

modalWin.setRightNavButton(done);
done.addEventListener('click',function()
{
	
	xhr1.open("POST","http://sun.elwime.com/api/metadata/");
	xhr1.send({"@domicilios":Titanium.UI.currentWindow.id,"tipo" :value,"color_fachada":color.value,"niveles":niveles.value,"caracteristicas_barda":carac_barda.value,"color_reja":reja.value,"porton": porton.value,"buzon":buzon.value,"medidor_luz":medidorluz.value,"medidor_gas":medidorgas.value,"observaciones":observaciones.value});
	
	
});


var xhr1 = Titanium.Network.createHTTPClient();
xhr1.onload = function()
{
	alert(this.responseText);
	modal.close();
	Ti.UI.currentWindow.close();
};
xhr1.onerror = function()
{
	alert("Problemas de Conectividad ar cargar Ordenas de Entrega");
};

var picker = Ti.UI.createPicker({
	bottom:0
});

var data = [
	{title:'Casa',custom_item:'b'},
	{title:'Comercio',custom_item:'s'},
	{title:'Industria',custom_item:'m'},
];
var value;
picker.add(data);
picker.addEventListener('change',function(e)
{
	Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
	value = eval(data[e.rowIndex]).title;
	tipo.title=value;
	//label2.text = "row value: "+e.selectedValue[0];
	picker.hide();

});
picker.addEventListener('click',function(e)
{

});
// turn on the selection indicator (off by default)
picker.selectionIndicator = true;

tipo.addEventListener('click',function()
{
	modal.add(picker);

});


modal.add(nav);
modal.add(scroll);

modal.open({modal:true});
