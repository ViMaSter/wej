#pragma strict
#pragma implicit
#pragma downcast

//settings
		var	XSpeed		: float		= 2000;
		var	YSpeed		: float		= 2000;
		var	MaxSpeed	: float		= 20;
		
		var	GJump		: float		= 200;
		var	AJump		: float		= 100;
		var AJumpFin	: float		= 100;
		
//mobile settings
		var mobileJump	: boolean	= false;
		var xDeg		: float		= 0;
		var yDeg		: float		= 0;
		var zDeg		: float		= 0;

//internal and debug variables
		var jumped		: int		= 0;
		var iOSDeadzone	: float		= 0.1;
		var iOSTilt		: Vector3	= Vector3.zero;
private	var aJumpDeadz	: int		= 50;

// relations - Objects

// relations - Scripts
private	var script_menu	: menu;
private	var script_powerups	: powerups;

// relations - Get Objects on Startup
function setRelations () {
	script_menu		= GetComponent("menu") as menu;
	script_powerups	= GetComponent("powerups") as powerups;
}

function Awake () {
	setRelations();
}

function mobileTouchType () {
	if (Input.touchCount == 1) {
		for (var touch : Touch in Input.touches) {
			if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) {
				mobileJump = false;	
			}
			else if (touch.phase == TouchPhase.Began ) {
				mobileJump = true;
			}
		}
	}
}

function resetiOSOrientation () {
	iOSTilt = Input.acceleration;
	print ("Reset!");
}

function Update () {
	if (Input.GetButtonDown("Jump") || mobileJump) {
		mobileJump = false;
		if (rigidbody.velocity.y >= 0) {
			AJumpFin = AJump;
		}
		if (rigidbody.velocity.y < 0 && rigidbody.velocity.y >= -aJumpDeadz) {
			AJumpFin = (AJump + -rigidbody.velocity.y * 50);
		}
		else if (rigidbody.velocity.y < -aJumpDeadz) {
			AJumpFin = AJump + aJumpDeadz * 50;
		}
//		print ("Fin: " + AJumpFin + " | rigi: " + rigidbody.velocity.y + " | ajump: " + AJump);
		switch (jumped) {
			case 1:
				rigidbody.AddForce(Vector3(0, AJumpFin, 0));
				break;
			case 0:
				rigidbody.AddForce(Vector3(0, GJump, 0));
				break;
		}
		jumped++;
	}
	if (Input.GetKeyDown(KeyCode.H)) {
		(gameObject.Find("powerups").GetComponent(booster) as booster).doWork();
	}
	if (Input.GetKeyDown(KeyCode.J)) {
		(gameObject.Find("powerups").GetComponent(jumper) as jumper).doWork();
	}
	if (Input.touchCount == 3) {
		resetiOSOrientation();
	}
//	print ("Accel X: " + Input.acceleration.x +  " | " + "Accel y: " + Input.acceleration.y +  " | " + "Accel z: " + Input.acceleration.z);
//	print("H: " + Input.GetAxis("Horizontal") + " - V: " + Input.GetAxis("Vertical"));
//	print(rigidbody.velocity);
}

function FixedUpdate () {
	mobileTouchType();
	if ((Input.acceleration.y - iOSTilt[1] > iOSDeadzone || Input.acceleration.y - iOSTilt[1] < (iOSDeadzone*-1)) || (Input.GetAxis("Horizontal") && (rigidbody.velocity.x < MaxSpeed && rigidbody.velocity.z < MaxSpeed))) {
		finalDir = GameObject.Find("MainCamera").transform.right.normalized;
		finalDir.y = 0;
		if (rigidbody.velocity.magnitude < MaxSpeed) {
			rigidbody.AddForce(((Input.acceleration.y - iOSTilt[1])*5*-1) * finalDir * XSpeed * Time.deltaTime);			// iOS-Control
			rigidbody.AddForce(Input.GetAxis("Horizontal") * finalDir * YSpeed * Time.deltaTime);							// PC, Mac, Standalone, Flash
		}
	}
	if ((Input.acceleration.x - iOSTilt[1] > iOSDeadzone || Input.acceleration.x - iOSTilt[1] < (iOSDeadzone*-1))  || (Input.GetAxis("Vertical") && (rigidbody.velocity.x < MaxSpeed && rigidbody.velocity.z < MaxSpeed))) {
		finalDir = GameObject.Find("MainCamera").transform.forward.normalized;
		finalDir.y = 0;
		if (rigidbody.velocity.magnitude < MaxSpeed) {
			rigidbody.AddForce(((Input.acceleration.x - iOSTilt[0])*5) * finalDir * YSpeed * Time.deltaTime);				// iOS-Control
			rigidbody.AddForce(Input.GetAxis("Vertical") * finalDir * YSpeed * Time.deltaTime);								// PC, Mac, Standalone, Flash
			
		}
	}
}

/* OLD MOVEMENT
function checkMovement () {
	//print("H: " + Input.GetAxis("Horizontal") + " - V: " + Input.GetAxis("Vertical"));
	if (Input.GetAxis("Horizontal")) {
		finalDir = GameObject.Find("MainCamera").transform.right.normalized;
		finalDir.y = 0;
		if (rigidbody.velocity.magnitude > 20) {
			rigidbody.velocity -= Input.GetAxis("Horizontal") * finalDir * XSpeed * Time.deltaTime;
		}
		else {
			rigidbody.velocity += Input.GetAxis("Horizontal") * finalDir * XSpeed * Time.deltaTime;
		}
	}
	if (Input.GetAxis("Vertical") && (rigidbody.velocity.x < 20 && rigidbody.velocity.y < 20 && rigidbody.velocity.z < 20)) {
		finalDir = GameObject.Find("MainCamera").transform.forward.normalized;
		finalDir.y = 0;
		if (rigidbody.velocity.magnitude > 20) {
			rigidbody.velocity -= Input.GetAxis("Vertical") * finalDir * YSpeed * Time.deltaTime;
		}
		else {
			rigidbody.velocity += Input.GetAxis("Vertical") * finalDir * YSpeed * Time.deltaTime;
		}
	}
	if (Input.GetButtonDown("Jump")) {
		if (rigidbody.velocity.y >= 0) {
			AJumpFin = AJump;
		}
		if (rigidbody.velocity.y < 0 && rigidbody.velocity.y >= -aJumpDeadz) {
			AJumpFin = (AJump + -rigidbody.velocity.y * 50);
		}
		else if (rigidbody.velocity.y < -aJumpDeadz) {
			AJumpFin = AJump + aJumpDeadz * 50;
		}
//		print ("Fin: " + AJumpFin + " | rigi: " + rigidbody.velocity.y + " | ajump: " + AJump);
		switch (jumped) {
			case 1:
				rigidbody.AddForce(Vector3(0, AJumpFin, 0));
				break;
			case 0:
				rigidbody.AddForce(Vector3(0, GJump, 0));
				break;
		}
		jumped++;
	}
}

function Update () {
	checkMovement();
} */

function OnCollisionEnter(cObj : Collision) {
	var fwd = Vector3(0, -1, 0);
	if (Physics.Raycast(transform.position, fwd, 1.5) && jumped != 0) {
		jumped = 0;
    }	
}
