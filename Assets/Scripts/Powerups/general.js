#pragma strict
#pragma implicit
#pragma downcast

//	general powerup variables
		var	avalible		: boolean	= false;
private	var	counting		: boolean	= false;
		var	cooldown		: float		= 100;
private var	curCooldown		: float		= 0;
private	var	reloadSteps		: float		= 0.1;
		
//	internal and debug variables
		var speed			: int		= 1000;
		
//	relations - Objects
private var	playerObj		: GameObject;

//	relations - Scripts
private	var	script_movement	: movement;
		var	script_toUse;

//	relations - Get Objects on Startup
function setRelations () {
	playerObj			= transform.parent.parent.gameObject;
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
	var cameraObj	: GameObject = Camera.main.gameObject;
	temp = Time.time;
	boosterCurDur	= 0;
	boosterCounting = true;
	finalDir = cameraObj.transform.forward.normalized;
	finalDir.y = 0;
	playerObj.rigidbody.AddForce(finalDir * speed);
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
	(Sender.GetComponent("Debugger") as Debugger).produceLabels(gameObject.name, avalible, returnCooldown());	
}