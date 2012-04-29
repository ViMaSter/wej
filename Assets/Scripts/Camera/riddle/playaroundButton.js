#pragma strict
#pragma implicit
#pragma downcast

//settings

//internal and debug variables
private	var jumped			: int			= 0;
private	var aJumpDeadz		: int			= 50;

// relations - Objects
private	var optionObj		: GameObject;

// relations - Scripts
private	var generatorScript	: generator;

// relations - Get Objects on Startup
function setRelations () {
		optionObj						= GameObject.Find("Options");
		if (optionObj) {
			generatorScript					= optionObj.GetComponent("generator");
		}
}
function Awake () {
	setRelations();
}

function OnCollisionEnter (cObj : Collision) {
	if (cObj.transform.name == "Player") {
		generatorScript.callLevelArea(0, Vector3(0, 22, 20));
	}
}