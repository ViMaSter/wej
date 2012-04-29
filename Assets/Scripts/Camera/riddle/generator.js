#pragma strict
#pragma implicit
#pragma downcast

//settings
private	var	levelArea		: Vector3[];
private	var unlockedAreas	: boolean[];
		

// relations - Objects
		var	levelAdditions	: GameObject[];
		var spawnObjs		: GameObject[];

// relations - Get Objects on Startup
function Start () {
	setSpawnPositions();
}	
function setSpawnPositions () {
	spawnObjs			= GameObject.FindGameObjectsWithTag("levelSpawn");
	levelArea			= new Vector3	[parseInt(spawnObjs.Length)];
	levelAdditions		= new GameObject[parseInt(spawnObjs.Length)];
	for (i = 0; i < spawnObjs.Length; i++) {
		levelArea[i]	= spawnObjs[i].transform.position;
	}
}

function callLevelArea (ChoosenNumber : int, ChoosenPosition : Vector3) {
	try {
		var getResource						: GameObject = Resources.Load("stages/1/stage" + (ChoosenNumber + 2));
		if (levelAdditions[ChoosenNumber] == null) {
			levelAdditions[ChoosenNumber]		= Instantiate(getResource, levelArea[ChoosenNumber], Quaternion.identity);
			levelAdditions[ChoosenNumber].name	= getResource.name;
		}
		else if (levelAdditions[ChoosenNumber] == null) {
			print ("Already Created."	+ "(Tried " + "stages/1/stage" + (ChoosenNumber + 2) + ")");
		}
		else if (getResource == null) {
			print ("Not avalible."		+ "(Tried " + "stages/1/stage" + (ChoosenNumber + 2) + ")");
		}
	}
	catch (e) {
		print ("Other error: \n" + e.ToString());
	}
}