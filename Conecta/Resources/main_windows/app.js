// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var user_id;


// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});



tabGroup.addEventListener('open',function()
{
	// set background color back to white after tab group transition
	Titanium.UI.setBackgroundColor('#fff');
});

tabGroup.setActiveTab(0); 
// open tab group with a transition animation
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});


//

//
//  CREATE CUSTOM LOADING INDICATOR
//
var indWin = null;
var actInd = null;
function showIndicator()
{
	// window container
	indWin = Titanium.UI.createWindow({
		height:150,
		width:150
	});

	// black view
	var indView = Titanium.UI.createView({
		height:150,
		width:150,
		backgroundColor:'#000',
		borderRadius:10,
		opacity:0.8
	});
	indWin.add(indView);

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
	indWin.add(actInd);

	// message
	var message = Titanium.UI.createLabel({
		text:'Loading',
		color:'#fff',
		width:'auto',
		height:'auto',
		font:{fontSize:20,fontWeight:'bold'},
		bottom:20
	});
	indWin.add(message);
	indWin.open();
	actInd.show();

};

function hideIndicator()
{
	actInd.hide();
	indWin.close({opacity:0,duration:500});
};

if( (Titanium.App.Properties.getString('name_preference')) == null && (Titanium.App.Properties.getString('pass_preference')) == null){
	var w = Ti.UI.createWindow({
		backgroundColor:'red'
	});

	w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,navBarHidden:true});
}else{
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open("POST","http://sun.elwime.com/api/session/");
	xhr.send({"user":Titanium.App.Properties.getString('name_preference'), "pass":Titanium.App.Properties.getString('pass_preference')});
	xhr.onload = function()
	{
		if(this.responseText==null){
			var w = Ti.UI.createWindow({
				backgroundColor:'red'
			});

			w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,navBarHidden:true});
		}else{
			user_id = this.responseText;
			
			//
			// create mashup tab and root window
			//
			var win5 = Titanium.UI.createWindow({
			    url:'main_windows/mashups.js',
			    titleid:'Por Entregar',
				id: user_id
			});
			var tab5 = Titanium.UI.createTab({
			    icon:'images/tabs/KS_nav_mashup.png',
			    titleid:'Por Entregar',
			    window:win5
			});
			var win6 = Titanium.UI.createWindow({
			    url:'main_windows/por_validar.js',
			    titleid:'Por Validar',
				id: user_id
			});
			var tab6 = Titanium.UI.createTab({
			    icon:'images/tabs/KS_nav_mashup.png',
			    titleid:'Por Validar',
			    window:win6
			});

			//
			//  add tabs
			//
			//tabGroup.addTab(tab1);
			//tabGroup.addTab(tab2);
			//tabGroup.addTab(tab3);
			//tabGroup.addTab(tab4);
			tabGroup.addTab(tab5);
			tabGroup.addTab(tab6);
			
		}
	}
	xhr.onerror = function()
	{
		alert("Problemas de Conectividad, Verifique su conexión");
	};
}




//Ti.include("examples/version.js");

