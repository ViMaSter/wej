// WowCamera.js
// by Synthetique - http://forum.unity3d.com/viewtopic.php?p=278801#278801 
// converted to UnityScript and modified by ViMaSter (http://www.squaretimes.de/)

#pragma strict
#pragma implicit
#pragma downcast

// DEBUG INVERT Y-AXIS
		var invertedControl		: boolean	= false;
private	var isCorrected			: boolean;

// settings
		var state				: int		= 0;
		var xSpeed				: float		= 10.0f; 
		var ySpeed				: float		= 10.0f;
		var iOS_xSpeed			: float		= 1;
		var iOS_ySpeed			: float		= 1;
		
		var zoomRate			: float		= 10;  
		var iOS_zoomRate		: float		= 10;  
private	var	xDeg				: float		= 0.0f; 
private	var	yDeg 				: float		= 0.0f; 
private	var	currentDistance		: float; 
private	var	desiredDistance		: float; 
private	var	correctedDistance	: float;

//internal and debug variables
		var targetHeight		: float		= 1.7f; 
		var distance			: float		= 5.0f; 
		var offsetFromWall		: float		= 0.1f; 

private	var	maxDistance			: float		= 20; 
private	var	minDistance			: float		= .6f; 
private	var	speedDistance		: float		= 5; 

private	var	yMinLimit			: int		= -40; 
private	var	yMaxLimit			: int		= 80; 

private	var	rotationDampening	: float		= 3.0f; 
private	var	zoomDampening		: float		= 5.0f;

private var collisionLayers		: LayerMask	= -1; 

private var vTargetOffset		: Vector3; 
private	var angles				: Vector3;
private var trueTargetPosition	: Vector3;

private	var collisionHit		: RaycastHit;

private var rotation			: Quaternion;

// relations - Transform
private	var	target				: Transform;
private	var myself				: Transform;

// relations - Scripts
private var script_menu			: menu;

function setRelations () {
	target							= GameObject.Find("Player").transform;
	myself							= gameObject.transform;
	script_menu						= target.GetComponent("menu") as menu;
}
	
function Start () {
	setRelations();

	xDeg							= angles.x; 
	yDeg							= angles.y; 
	
	angle							= myself.eulerAngles;
 
	currentDistance					= distance; 
	desiredDistance					= distance; 
	correctedDistance				= distance; 

	if (myself.rigidbody)			myself.rigidbody.freezeRotation = true;
}

function Update () {
		calculateView();
}

function calculateTouchPinch () : float {
	var pos			: Vector2[] = new Vector2[2];
	var deltapos	: Vector2[] = new Vector2[2];
	if (Input.touchCount == 2) {
		Vector2.Distance(Input.touches[0].position, Input.touches[1].position);
		var i : int = 0;
		for (var touch : Touch in Input.touches) {
			pos[i]		= touch.position;
			deltapos[i]	= touch.deltaPosition;
			i++;
		}
		var curDist		: Vector2		= pos[0] - pos[1];
		var prevDist	: Vector2		= (pos[0]-deltapos[0]) - (pos[1]-deltapos[1]);
		var	delta		: float			= curDist.magnitude - prevDist.magnitude;
		return delta;
	}	
}

function calculateView () { 
	if (!target) return; 

	// If either mouse buttons are down, let the mouse govern camera position 
	if (GUIUtility.hotControl == 0) {
		
		xDeg						+=	Input.GetAxis ("MouseX") * xSpeed * 0.02f;																						// PC, Mac, Standalone, Flash
		yDeg						+=	invertedControl ? Input.GetAxis ("MouseY") * ySpeed * 0.02f : Input.GetAxis ("MouseY") * ySpeed * 0.02f * -1;					// PC, Mac, Standalone, Flash
		
		for (var touch : Touch in Input.touches) {
        	if (touch.phase == TouchPhase.Moved) {
        	    xDeg						+=	touch.deltaPosition[0] * xSpeed * 0.02f * iOS_xSpeed;																		// iOS-Control
        	    yDeg						+=	invertedControl ? touch.deltaPosition[1] * ySpeed * 0.02f : touch.deltaPosition[1] * ySpeed * 0.02f * -1 * iOS_ySpeed;	// iOS-Control
        	}
	    }
		
		

		// calculate the desired distance 
		desiredDistance				-=	Input.GetAxis("MouseScroll") * Time.deltaTime * zoomRate * Mathf.Abs (desiredDistance) * speedDistance; 
		desiredDistance				-= 	calculateTouchPinch() * Time.deltaTime * iOS_zoomRate * Mathf.Abs (desiredDistance) * speedDistance;
		
		if (Input.GetKey("joystick button 8")) {
			desiredDistance			-=	Time.deltaTime *  0.5 * Mathf.Abs (desiredDistance) * speedDistance; 
		}
		
		if (Input.GetKey("joystick button 9")) {
			desiredDistance			-=	Time.deltaTime * -0.5 * Mathf.Abs (desiredDistance) * speedDistance; 
		}
		
		desiredDistance				=	Mathf.Clamp (desiredDistance, minDistance, maxDistance); 

		yDeg						=	ClampAngle(yDeg, yMinLimit, yMaxLimit); 
		
		// set camera rotation 
		rotation					=	Quaternion.Euler(yDeg, xDeg, 0); 
		correctedDistance			=	desiredDistance; 

		// calculate desired camera position 
		vTargetOffset				=	new Vector3 (0, -targetHeight, 0); 
		var position : Vector3		=	target.position - (rotation * Vector3.forward * desiredDistance + vTargetOffset); 

		// check for collision using the true target's desired registration point as set by user using height 
		trueTargetPosition			=	new Vector3(target.position.x, target.position.y, target.position.z) - vTargetOffset; 

		// if there was a collision, correct the camera position and calculate the corrected distance 
		isCorrected					=	false; 
		if (Physics.Linecast (trueTargetPosition, position, collisionHit, collisionLayers.value)) { 
			// calculate the distance from the original estimated position to the collision location, 
			// subtracting out a safety "offset" distance from the object we hit.  The offset will help 
			// keep the camera from being right on top of the surface we hit, which usually shows up as 
			// the surface geometry getting partially clipped by the camera's front clipping plane. 
			correctedDistance		=	Vector3.Distance (trueTargetPosition, collisionHit.point) - offsetFromWall; 
			isCorrected				=	true; 
		} 

		// For smoothing, lerp distance only if either distance wasn't corrected, or correctedDistance is more than currentDistance 
		currentDistance				=	!isCorrected || correctedDistance > currentDistance ? Mathf.Lerp (currentDistance, correctedDistance, Time.deltaTime * zoomDampening) : correctedDistance; 

		// keep within legal limits 
		currentDistance				=	Mathf.Clamp (currentDistance, minDistance, maxDistance); 

		// recalculate position based on the new currentDistance 
		position					=	target.position - (rotation * Vector3.forward * currentDistance + vTargetOffset); 
		
		myself.transform.rotation	=	rotation; 
		myself.transform.position	=	position; 
	} 
}

private static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)		angle	+= 360; 
	if (angle >	 360)		angle	-= 360; 
	return Mathf.Clamp (angle, min, max); 
} 