function banRedirect() {
	var queryString = arguments[0] ? arguments[0] : '';
	WOC.goToPage('accountHold', queryString);
}

function getQsVar(key) {
  var regex = new RegExp('[\\?&]'+ key +'=([^&#]*)');
  var qs = regex.exec(window.location.href);

  return qs == null ? false : qs[1];
}

function onPurchaseComplete(data) {
	var trackingPixel = $(new Image());

	function welcomeRedirect() {
		window.location = PATH.siteRoot +'/welcome-member/';
	}

	if($.cookie('FromCommissionJunction') !== null) {
		trackingPixel.load(welcomeRedirect).error(welcomeRedirect).attr('src', 'https://www.emjcd.com/u?CID=1520128&OID=woc-' + (new Date()).getTime() + '&TYPE=343077&ITEM1=' + data.term + '&AMT1=' + data.price + '&QTY1=1&CURRENCY=USD&METHOD=IMG' );
		$(document.body).append(trackingPixel);
	} else {
		welcomeRedirect();
	}
}

jQuery(document).ready(function() {
	if(!swfobject.hasFlashPlayerVersion('10')) {
		window.location = RDR.flashUpgrade;
		return false;
	}

	var paymentMethod = getQsVar('forcePaymentChoice');
	if(paymentMethod) {
		RAMP.purchase.flashVars.forcePaymentChoice = paymentMethod;
	}

	swfobject.embedSWF( PATH.swf +'/common/DVC_OS.swf', 'ramp-purchMod', '100%', '100%', '10.0.0', false, RAMP.purchase.flashVars, RAMP.purchase.params );
});