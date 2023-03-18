function banRedirect() {
	var queryString = arguments[0] ? arguments[0] : '';
	WOC.goToPage('accountHold', queryString);
}

jQuery( document ).ready( function() {
	if( !swfobject.hasFlashPlayerVersion( '10' ) ) {
		window.location = RDR.flashUpgrade;
		return false;
	}

	swfobject.embedSWF( PATH.swf +'/common/DVC_OS.swf', 'ramp-acctMgrMod', '100%', '100%', '10.0.0', false, RAMP.acm.flashVars, RAMP.acm.params );

	var closureNoticeHTML = '<div class="sys-modalOverlayContainer">'+
			'<h2></h2>'+
			'<div class="sys-modalOverlayBody" style="text-align: center;">'+
				'<h3>Important Membership Update</h3>'+
				'<p>The World of Cars Online will be closing on February 8, 2012.</p>'+
				'<p>Memberships to the online world are no longer available for purchase but ALL players can log into the online world and enjoy unlimited access for free through February 8, 2012.</p>'+
				'<p>If you have questions or would like additional information, please <a href="'+ PATH.siteRoot +'/help/contact-us/">contact us</a> or visit our <a href="'+ PATH.siteRoot +'/help/frequently-asked-questions/">FAQs</a></p>'+
				'<p><a href="javascript:$.colorbox.close();">Continue to Manage Account</a></p>'+
			'</div>'+
		'</div>';
	$.colorbox({'html' : closureNoticeHTML});
} );