#pragma strict
#pragma implicit
#pragma downcast

//	general powerup variables
		var	avalible		: boolean	= false;
private	var	counting		: boolean	= false;
		var	cooldown		: float		= 100;
 var	curCooldown		: float		= 0;
private	var	reloadSteps		: float		= 1;
		
//	internal and debug variables
		var speed			: int		= 1000;
		
//	relations - Objects
private var	playerObj		: GameObject;

//	relations - Scripts
private	var	script_movement	: movement;

//	relations - Get Objects on Startup
function setRelations () {
	playerObj			= transform.parent.gameObject;
	script_movement		= playerObj.GetComponent("movement") as movement;
}
function Start () {
	setRelations();
}

//	functions to (un)lock/(un)pause skill
function toggleSkill (status : boolean) {
	if (status) {
		avalible	= true;
		counting	= true;
	}
	else {
		avalible	= false;
		counting	= false;
	}
}
function toggleCounting (status : boolean) {
	if (status)
	counting = true;
	else
	counting = false;
}
//	gives back the remaining percent to use skill again
function returnCooldown () : float {
	return (curCooldown / cooldown);
}


//	function called when activated by player

function doWork () {
	if (curCooldown >= cooldown) {
		cooldown	= 0;
		counting	= true;
		playerObj.rigidbody.AddForce(0, speed, 0);
	}
}

function resetCooldown () {
	curCooldown = 0;
}

function FixedUpdate () {
	if (curCooldown <= cooldown && counting == true) {
		curCooldown += reloadSteps;
	}
}

function getAccess (Sender : GameObject) {
	(Sender.GetComponent("Debugger") as Debugger).produceLabels("Jumper", avalible, returnCooldown());	
}