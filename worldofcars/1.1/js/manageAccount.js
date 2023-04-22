function banRedirect() {
	var queryString = arguments[0] ? arguments[0] : '';
	WOC.goToPage('accountHold', queryString);
}

jQuery(document).ready(function () {
	if (!swfobject.hasFlashPlayerVersion('10')) {
		window.location = RDR.flashUpgrade;
		return false;
	}

	swfobject.embedSWF(PATH.swf + '/common/DVC_OS.swf', 'ramp-acctMgrMod', '100%', '100%', '10.0.0', false, RAMP.acm.flashVars, RAMP.acm.params);
});
