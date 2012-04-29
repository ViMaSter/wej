var touchMeshes : TextMesh[];
var crossSize	: float			= 25;
function Start () {
	touchMeshes		= new TextMesh[5];
	touchMeshes[0]	= GameObject.Find("debug0").GetComponent(TextMesh) as TextMesh;
	touchMeshes[1]	= GameObject.Find("debug1").GetComponent(TextMesh) as TextMesh;
	touchMeshes[2]	= GameObject.Find("debug2").GetComponent(TextMesh) as TextMesh;
	touchMeshes[3]	= GameObject.Find("debug3").GetComponent(TextMesh) as TextMesh;
	touchMeshes[4]	= GameObject.Find("debug4").GetComponent(TextMesh) as TextMesh;
}

function Update () {
	var temp = (5 - Input.touchCount);
	for (var i = 0; i < temp; i++) {
			touchMeshes[4-i].text = "";
	}
	if(Input.touchCount > 0) {	
		for (var touch : Touch in Input.touches) {
			var location = touch.position;
			touchMeshes[touch.fingerId].transform.position.x = location[0];
			touchMeshes[touch.fingerId].transform.position.y = location[1];
			touchMeshes[touch.fingerId].text = "ID: " + touch.fingerId + "\nX: " + location[0] + "\nY: " + location[1];
			var pos1 : Vector2 = new Vector2(touch.position[0] - crossSize, touch.position[1]);
			var pos2 : Vector2 = new Vector2(touch.position[0] + crossSize, touch.position[1]);
			var pos3 : Vector2 = new Vector2(touch.position[0], touch.position[1] - crossSize);
			var pos4 : Vector2 = new Vector2(touch.position[0], touch.position[1] + crossSize);
	    	Debug.DrawLine (pos1, pos2, Color.green);
	    	Debug.DrawLine (pos3, pos4, Color.green);
		}
	}
	if (Input.touchCount > 1) {
		for (var touchone : Touch in Input.touches) {
			for (var touchzwo : Touch in Input.touches) {
				Debug.DrawLine (touchone.position, touchzwo.position, Color(0, 192, 255, 1));
			}
		}
	}
}