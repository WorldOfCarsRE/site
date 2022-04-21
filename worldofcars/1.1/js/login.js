// Omniture page tracking
if( window.CTO ) {
	var cto = new CTO();
	cto.account = 'worldofcars';
	cto.category = 'dgame';
	cto.site = 'woc';
	cto.siteSection = 'website:game';
	cto.pageName = 'game_login';
	cto.contentType = 'homepage';
	cto.property = 'car';
	cto.track();
}

// Window mangaer
var WMG = new windowManager( {
	pages : RDR
} );


jQuery( document ).ready( function() {
	function displayGate( gateMsg ) {
		jQuery( '#pla-regModule' ).html( '<div class="pla-gateMessage">'+ gateMsg +'</div>' );
	};

	function embedFlash( bannerMsg ) {
		// media mind tracking cookie
		var	ebSession = MMD.getSessionID();
		var ebRand = Math.random()+'';
		ebRand = ebRand * 1000000;

		var qsVars = {};
		var pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

		for(var i=0; i < pairs.length; i++) {
			var pair = pairs[i].split('=');
			qsVars[pair[0]] = pair[1];
		}

		swfobject.embedSWF( PATH.swf +'/common/DVC_OS.swf', 'pla-regModule', '100%', '100%', '10.0.0', false, jQuery.extend( { mediaMindConversion : 'HTTPS://bs.serving-sys.com/BurstingPipe/activity3.swf?' + escape('ebAS=bs.serving-sys.com&activityParams=ActivityID=73484&f=1&Session=' + ebSession + '&rnd=' + ebRand) }, RAMP.registration.flashVars, qsVars ), RAMP.registration.params );
	};

	function heartbeatTick() {
		if( !this.heartbeatFails ) {
			this.heartbeatFails = 0;
		}
		jQuery.ajax( {
			cache : false,
			dataType : 'text', // Previously xml type but our api service returns text
			type : 'GET',
			url : CFG.whoAmI,
			error : function() {
				if( heartbeatFails > 2 ) {
					displayGate( 'The World of Cars Online is currently unavailable. We apologize for the inconvenience and are working quickly to resolve the problem. Please try again soon and thank you for your patience!' );
					return false;
				}

				heartbeatFails = heartbeatFails + 1;
				heartbeatTick();
			},
			success	: function( xml ) {
				heartbeatFails = 0;
				if( typeof xml == 'object' || xml != false ) {
					if( jQuery('testUser',xml).length > 0 && jQuery.inArray( jQuery('testUser',xml).text(), [ 'true', 'false' ] ) == -1 ) {
						displayGate( jQuery('testUser',xml).text() );
					} else if( jQuery('notification',xml).length > 0 && jQuery.inArray( jQuery('notification',xml).text(), [ 'true', 'false' ] ) == -1 ) {
						embedFlash( jQuery('notification',xml).text() );
					} else if( jQuery('gameClosed',xml).length > 0 && jQuery.inArray( jQuery('gameClosed',xml).text(), [ 'true', 'false' ] == -1 ) ) {
						displayGate( jQuery('gameClosed',xml).text() );
					} else {
						embedFlash();
					}
				}
			}
		} );
	}

	if( !swfobject.hasFlashPlayerVersion( '10' ) ) {
		window.location = 'flash-upgrade.html';
	}

	heartbeatTick();
} );

function regComplete(){
	mboxTrackLink( 'Cars_RegistrationComplete', false, 'game.html' );
}