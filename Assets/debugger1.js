// A FPS counter.
// It calculates frames/second over each updateInterval,
// so the display does not keep changing wildly.
 
var updateInterval = 0.5;
private var lastInterval : double; // Last interval end time
private var frames = 0; // Frames over current interval
private var fps : float; // Current FPS
var textwidth : int = 150;
var styleToUse : GUIStyle;
function Start() {
    lastInterval = Time.realtimeSinceStartup;
    frames = 0;
}

function OnGUI () {
    // Display label with two fractional digits
    var i : int = 0;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), "" + fps.ToString("f2"), styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.operatingSystem, styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.processorType, styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.processorCount.ToString(), styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.systemMemorySize.ToString(), styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.graphicsMemorySize.ToString(), styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.deviceName, styleToUse); i++;
    GUI.Label(Rect(Screen.width - textwidth, 20*i, textwidth, 20), SystemInfo.deviceModel, styleToUse);
} 

function Update() {
    ++frames;
    var timeNow = Time.realtimeSinceStartup;
    if( timeNow > lastInterval + updateInterval )
    {
        fps = frames / (timeNow - lastInterval);
        frames = 0;
        lastInterval = timeNow;
    }
}