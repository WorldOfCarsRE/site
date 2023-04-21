function querySt(name) {
    gy = window.location.search.substring(1).split("&");
    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        if (ft[0] == name) {
            return ft[1];
        }
    }
}

var swfId = "";
var swfUpdated = true;
var swfFlashvars;
var swfParams;
var swfTimer;
var swfBase = "";

function startSWF( flashvars, params, forceRestart ) {
	var queryString = arguments[3] ? arguments[3] : false;
	if( flashvars != null && params != null )
	{
		swfFlashvars = flashvars;
		swfParams = params;
		swfBase = params["base"];
	}

	swfFlashvars["forceRestart"] = forceRestart || "false";

	swfobject.embedSWF(swfBase + "DVC_OS.swf" + ( queryString ? '?'+ queryString : '' ), "flashDivContent", "100%", "100%", "10", "", swfFlashvars, swfParams, "", onEmbedSWF);
}

function onEmbedSWF(e) {
	swfId = e.id;
}

function swfUpdate() {
	swfUpdated = true;
}

function swfLoaded() {
	swfUpdated = true;
	swfTimeout();
}

function swfTimeout() {
	if( !swfUpdated )
	{
		restartSWF();
	}
	else
	{
		swfUpdated = false;
		swfTimer = setTimeout( "swfTimeout()", 1000 );
	}
}

function restartSWF() {
	clearTimeout(swfTimer)

	// Remove old swf object
	swfobject.removeSWF(swfId);

	// Recreate flashDivContent element
	var container;
	var divs = document.getElementsByTagName("div");
	for( var i = 0; i < divs.length; i++) {
		if( divs[i].getAttribute("id") == "flashDivContainer" ) {
			container = divs[i]
			break;
		}
	}

	var content = document.createElement("div");
	content.setAttribute("id", "flashDivContent");
	container.appendChild(content);

	// Start SWF with original parameters
	startSWF( null, null, "true" );
}