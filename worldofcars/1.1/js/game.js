// Window mangaer
var WMG = new windowManager({
	pages: RDR,
	omnitureTracking: {
		// 'purchase_sponsor_your_car_nav': { 'property': 'car', 'account': 'worldofcars', 'category': 'dgame', 'site': 'woc', 'siteSection': 'game:sponsorship', 'contentType': 'regular' },
		// 'crews_news_landing_nav': { 'property': 'car', 'account': 'worldofcars', 'category': 'dgame', 'site': 'woc', 'siteSection': 'game:community', 'contentType': 'regular' },
		// 'help_contact_us_report_a_bug_nav': { 'property': 'car', 'account': 'worldofcars', 'category': 'dgame', 'site': 'woc', 'siteSection': 'game:community', 'contentType': 'regular' },
		// 'help_home_nav': { 'property': 'car', 'account': 'worldofcars', 'category': 'dgame', 'site': 'woc', 'siteSection': 'game:community', 'contentType': 'homepage' },
		// 'change_server_nav': { 'property': 'car', 'account': 'worldofcars', 'category': 'dgame', 'site': 'woc', 'siteSection': 'game:server', 'contentType': 'regular' }
	}
});

jQuery(document).ready(function () {
	function displayGate(gateMsg) {
		jQuery('#pla-gameModule').html('<div class="pla-gateMessage">' + gateMsg + '</div>');
	};

	function embedFlash(bannerMsg) {
		var qsVars = {};
		var pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		var msg = 'Welcome to the test server. Missing features and bugs are to be expected. Enjoy!';

		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split('=');
			qsVars[pair[0]] = pair[1];
		}

		swfobject.embedSWF(PATH.cdnRootBase + '/game/DVC_OS.swf?ver=' + clientVersion, 'pla-gameModule', '100%', '100%', '10.0.0', false, jQuery.extend({}, GAME.flashVars, qsVars, { 'customMsg': escape((bannerMsg || msg)) }), GAME.params);
	};

	function heartbeatTick() {
		if (!this.heartbeatFails) {
			this.heartbeatFails = 0;
		}
		jQuery.ajax({
			cache: false,
			dataType: 'xml',
			type: 'GET',
			url: CFG.whoAmI,
			xhrFields: {
				withCredentials: true
			},
			error: function () {
				if (heartbeatFails > 2) {
					displayGate('The World of Cars Online is currently unavailable. We apologize for the inconvenience and are working quickly to resolve the problem. Please try again soon and thank you for your patience!');
					return false;
				}

				heartbeatFails = heartbeatFails + 1;
				heartbeatTick();
			},
			success: function (xml) {
				heartbeatFails = 0;
				if (typeof xml == 'object' || xml != false) {
					if (jQuery('testUser', xml).length > 0 && jQuery.inArray(jQuery('testUser', xml).text(), ['true', 'false']) == -1) {
						displayGate(jQuery('testUser', xml).text());
					} else if (jQuery('notification', xml).length > 0 && jQuery.inArray(jQuery('notification', xml).text(), ['true', 'false']) == -1) {
						embedFlash(jQuery('notification', xml).text());
					} else if (jQuery('gameClosed', xml).length > 0 && jQuery.inArray(jQuery('gameClosed', xml).text(), ['true', 'false'] == -1)) {
						displayGate(jQuery('gameClosed', xml).text());
					} else {
						embedFlash();
					}
				}
			}
		});
	}

	if (!swfobject.hasFlashPlayerVersion('10')) {
		window.location = 'flash-upgrade.html';
	}

	heartbeatTick();
});