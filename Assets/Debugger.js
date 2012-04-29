#pragma strict
#pragma implicit
#pragma downcast

//settings
		var boxDimensions		: int[];
			
//internal and debug variables

// relations - Objects
		var	portArray						: Vector3[];
		var	playerObj						: GameObject;
		var	powerupObj						: GameObject;
		var portObjs						: GameObject[];

// relations - Scripts
		var	script_powerups					: powerups;

// relations - Get Objects on Startup
function setObjects	() {
	playerObj								= GameObject.Find("Player");
	powerupObj								= playerObj.Find("powerups");
	portObjs								= GameObject.FindGameObjectsWithTag("port");
	script_powerups							= playerObj.GetComponent("powerups");
}

function setPortPos () {
	// ready Arrays
		boxDimensions						= new int[3];
		portArray							= new Vector3[portObjs.Length];
		
	// set GUIDimensions
		boxDimensions[0]					= 10;	// margin
		boxDimensions[1]					= 200;	// width
		boxDimensions[2]					= 150;	// height
	for (i = 0; i < portObjs.Length; i++) {
		protObjID	= int.Parse(portObjs[i].name);
		portArray[protObjID] = portObjs[i].transform.position;
	}
}

// relations - Get Scripts on Startup

function Awake () {
	setObjects();
	setPortPos();
}

var i : int = 0;

function produceLabels (scriptName : String, availability : boolean, cooldown : float) {
/*	availability	= GUI.Toggle(Rect((Screen.width - boxDimensions[0] - boxDimensions[1]) + (0) + boxDimensions[0], Screen.height - boxDimensions[0] - boxDimensions[1] + 55 + (40 * i), 65, 25), availability, scriptName);
	GUI.Label (Rect((Screen.width - boxDimensions[0] - boxDimensions[1]) + (125) + boxDimensions[0], Screen.height - boxDimensions[0] - boxDimensions[1] + 55 + (40 * i), 65, 25), "(KNASEN-Taste)");
	GUI.HorizontalSlider	(Rect((Screen.width - boxDimensions[0] - boxDimensions[1]) + (0) + boxDimensions[0], Screen.height - boxDimensions[0] - boxDimensions[1] + 80 + (40 * i), 180, 25), cooldown, 0, 1);
	i++;*/
}

function OnGUI () {
	for (var child : Transform in transform) {
		i = 0;
		child.SendMessage ("getAccess", gameObject);
	}	
	GUI.Box (Rect(Screen.width - boxDimensions[0] - boxDimensions[1], Screen.height - boxDimensions[0] - boxDimensions[1], boxDimensions[1], boxDimensions[2]), "Port PlayerObj");
	for (i = 0; i < portArray.Length; i++) {
		if (GUI.Button(Rect((Screen.width - boxDimensions[0] - boxDimensions[1]) + (55 * i) + boxDimensions[0], Screen.height - boxDimensions[0] - boxDimensions[1] + 35, 50, 50), i.ToString())) {
			playerObj.transform.position = portArray[i];
			playerObj.rigidbody.velocity = Vector3(0, 0, 0);
		}
	}
}