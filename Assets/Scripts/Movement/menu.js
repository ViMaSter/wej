#pragma strict
#pragma implicit
#pragma downcast

// settings
		var state			: int		= 0;
		var stateActivator	: boolean	= false;
		var playerFocus		: boolean	= false;

//internal and debug variables
		var activeStyle		: GUISkin;

// relations - Objects
private	var CameraObj		: GameObject;
private	var PlayerObj		: GameObject;

// relations - Scripts
private	var CameraScript	: WowCamera;
private	var mScript			: movement;

function setRelations () {
	CameraObj		= GameObject.Find("MainCamera");
	CameraScript	= CameraObj.GetComponent("WowCamera");
	PlayerObj		= GameObject.Find("Player");
	mScript			= PlayerObj.GetComponent("movement");
}
	
function Start () {
	setRelations();
}

function OnApplicationFocus (focusValue : boolean) {
	playerFocus = focusValue;
}

function getfromBrowser (values : String) {
	valueArray				= values.Split(" ,"[0]);
	rigidbody.mass			= float.Parse(valueArray[0]);
	rigidbody.drag			= float.Parse(valueArray[1]);
	rigidbody.angularDrag	= float.Parse(valueArray[2]);
	mScript.MaxSpeed		= float.Parse(valueArray[3]);
	mScript.XSpeed			= float.Parse(valueArray[4]);
	mScript.YSpeed			= float.Parse(valueArray[5]);
	mScript.GJump			= float.Parse(valueArray[6]);
	mScript.AJump			= float.Parse(valueArray[7]);
}

function externalValueChange () {
	/*var values : String = "";
		values += "getPlayerValues(Array(";
		values += rigidbody.mass;
		values += ", ";
		values += rigidbody.drag;
		values += ", ";
		values += rigidbody.angularDrag;
		values += ", ";
		values += mScript.MaxSpeed;
		values += ", ";
		values += mScript.XSpeed;
		values += ", ";
		values += mScript.YSpeed;
		values += ", ";	
		values += mScript.GJump;
		values += ", ";
		values += mScript.AJump;
		values += ", ";
		values += '"' + playerFocus + '"';
		values += "));";
		print (values);*/
//	if (playerFocus) Application.ExternalCall( "getPlayerValues", rigidbody.mass, rigidbody.drag, rigidbody.angularDrag, mScript.MaxSpeed, mScript.XSpeed, mScript.YSpeed, mScript.GJump, mScript.AJump, playerFocus );
}

function OnGUI () {
	// Check if the toggle was toggled
	stateActivator	= GUI.Toggle(Rect(25, 15, 125, 50), stateActivator, "Activate Settings");
	if (GUI.Button(Rect(170, 15, 125, 40), "Arcade Physics")) {
			rigidbody.mass			=	0.5;
			rigidbody.drag			=	1;
			rigidbody.angularDrag	=	0;
			mScript.MaxSpeed		=	20;
			mScript.XSpeed			=	1600;
			mScript.YSpeed			=	1600;
			mScript.GJump			=	600;
			mScript.AJump			=	425;
	}
	if (GUI.Button(Rect(335, 15, 125, 40), "Realistic Physics")) {
			rigidbody.mass			=	0.5;
			rigidbody.drag			=	1;
			rigidbody.angularDrag	=	0;
			mScript.MaxSpeed		=	12;
			mScript.XSpeed			=	1000;
			mScript.YSpeed			=	1000;
			mScript.GJump			=	400;
			mScript.AJump			=	200;
	}
	/*if (GUI.Button(Rect(175, 25, 75, 30))) {
	
	}*/
	state			= stateActivator? 1 : 0;
	switch (state) {
		case 0:
			break;
		case 1:
			var bigger : float = 20;
			rigidbody.mass			=	GUI.HorizontalSlider	(Rect (25, 50+ bigger, 300, 40),	rigidbody.mass			, 0.0, 5.0); bigger = bigger + 10;
			rigidbody.drag			=	GUI.HorizontalSlider	(Rect (25, 75+ bigger, 300, 40),	rigidbody.drag			, 0.0, 5.0); bigger = bigger + 10;
			rigidbody.angularDrag	=	GUI.HorizontalSlider	(Rect (25, 100+ bigger, 300, 40),	rigidbody.angularDrag	, 0.0, 5.0); bigger = bigger + 10;
			mScript.MaxSpeed		=	GUI.HorizontalSlider	(Rect (25, 125+ bigger, 300, 40),	mScript.MaxSpeed		, 0.0, 50.0); bigger = bigger + 10;
			mScript.XSpeed			=	GUI.HorizontalSlider	(Rect (25, 150+ bigger, 300, 40),	mScript.XSpeed			, 0.0, 2500.0); bigger = bigger + 10;
			mScript.YSpeed			=	GUI.HorizontalSlider	(Rect (25, 175+ bigger, 300, 40),	mScript.YSpeed			, 0.0, 2500.0); bigger = bigger + 10;
			mScript.GJump			=	GUI.HorizontalSlider	(Rect (25, 200+ bigger, 300, 40),	mScript.GJump			, 0.0, 1000.0); bigger = bigger + 10;
			mScript.AJump			=	GUI.HorizontalSlider	(Rect (25, 225+ bigger, 300, 40),	mScript.AJump			, 0.0, 1000.0); bigger = bigger + 10;
		
			bigger = 20;
			/*rigidbody.mass		=*/	GUI.Label				(Rect (330, 45+ bigger, 300, 40),	"Masse"					); bigger = bigger + 10;
			/*rigidbody.drag		=*/	GUI.Label				(Rect (330, 70+ bigger, 300, 40),	"Beruehrungswiderstand"	); bigger = bigger + 10;
			/*rigidbody.angularDrag	=*/	GUI.Label				(Rect (330, 95+ bigger, 300, 40),	"Luftwiderstand"		); bigger = bigger + 10;
			/*mScript.MaxSpeed	=*/		GUI.Label				(Rect (330, 120+ bigger, 300, 40),	"Max. Geschwindigkeit"	); bigger = bigger + 10;
			/*mScript.XSpeed		=*/	GUI.Label				(Rect (330, 145+ bigger, 300, 40),	"Beschl. (W und S)"		); bigger = bigger + 10;
			/*mScript.YSpeed		=*/	GUI.Label				(Rect (330, 170+ bigger, 300, 40),	"Beschl. (A und D)"		); bigger = bigger + 10;
			/*mScript.GJump		=*/		GUI.Label				(Rect (330, 195+ bigger, 300, 40),	"Erste Sprunghoehe"		); bigger = bigger + 10;
			/*mScript.AJump		=*/		GUI.Label				(Rect (330, 220+ bigger, 300, 40),	"Zweite Sprunghoehe"	); bigger = bigger + 10;
			
			externalValueChange();
			break;
	}
}