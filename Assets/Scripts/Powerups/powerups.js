#pragma strict
#pragma implicit
#pragma downcast

//settings
		var	boosterEnabled	: boolean	= false;
private	var	boosterCounting	: boolean	= false;
private	var	boosterDuration	: float		= 100;
		var	boosterCurDur	: float		= 0;
		var	boosterReload	: float		= 0.1;

		var	jumperEnabled	: boolean	= false;
private	var	jumperCounting	: boolean	= false;
private	var	jumperDuration	: float		= 100;
		var	jumperCurDur	: float		= 0;
		var	jumperReload	: float		= 0.1;

//internal and debug variables
		var	boosterSpeed	: int		= 1000;
		var	jumperSpeed		: int		= 1000;
private var	finalDir		: Vector3;
// relations - Objects
private var	mainCamera		: GameObject;
// relations - Scripts
private	var	script_movement	: movement;
		
		var temp = 0;
		var temptemp = 0;

// relations - Get Objects on Startup
function setRelations () {
	mainCamera			= GameObject.Find("MainCamera");
	script_movement		= GetComponent("movement") as movement;
}

function Awake () {
	setRelations();
}

function Update () {
	if (boosterCounting	&& boosterCurDur <= boosterDuration) {
		boosterCurDur	+= 0.1;
	}
	if (jumperCounting	&& jumperCurDur <= jumperDuration) {
		jumperCurDur	+= 0.1;
	}
}

function getLoadingVar (returnWhich : String) : float {
	switch (returnWhich) {
		case "booster":
			return boosterCurDur;
			break;
		case "jumper":
			return jumperCurDur;
			break;	
	}
}

function powerup (powerupName : String) {
	switch (powerupName) {
		case "booster":
			if (boosterEnabled && boosterCurDur >= boosterDuration)			booster();
			break;
		case "jumper":
			if (jumperEnabled && jumperCurDur >= boosterDuration)			jumper();
			break;	
	}
}

function booster () {
		temp = Time.time;
		boosterCurDur	= 0;
		boosterCounting = true;
		finalDir = mainCamera.transform.forward.normalized;
		finalDir.y = 0;
		rigidbody.AddForce(finalDir * boosterSpeed);	// push	
}

function jumper () {
		jumperCurDur	= 0;
		boosterCounting = true;
		rigidbody.AddForce(0, jumperSpeed, 0);	// push	
}