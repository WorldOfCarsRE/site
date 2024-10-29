var WorldOfCars = function() {
	var This = function() {
		// Public Vars -----------------------------------------[MN]
//		var currentIndex		= 0;
		var bannerMessage		= false;
		var heartbeatTimer		= false;
		var heartbeatFails		= 0;
		var gameWindow			= false;
		var gameWindowSpawning	= false;
		var gated				= false;
		// -----------------------------------------------------[MN]

		// Public Functions ------------------------------------[MN]
		This.disablePlayButton = function() {
			if( This.playisEnabled() ) {
				jQuery( '.sys-btn-play' ).removeClass( 'sys-btn-play-active' );
			}
		};

		This.enablePlayButton = function() {
			if( !This.playisEnabled() ) {
				jQuery( '.sys-btn-play' ).addClass( 'sys-btn-play-active' );
			}
		};

		This.playisEnabled = function() {
			return jQuery( '.sys-btn-play' ).hasClass( 'sys-btn-play-active' );
		};

		This.gateSite = function( message ) {
			This.gated			= true;
			this.bannerMessage	= message;
			This.disablePlayButton();
			if( !This.hasBanner() ) {
				This.showBanner( message );
			}
		};

		This.goToPage = function( page ) {
			var queryString = arguments[1] ? arguments[1] : '';
			if( RDR[page] ) {
				window.location = RDR[page] + queryString;
			} else {
				return false;
			}
		};

		This.heartbeatTick = function() {
			jQuery.ajax( {
				cache		: false,
				dataType	: 'xml',
				type		: 'GET',
				url			: CFG.whoAmI,
				xhrFields: {
					withCredentials: true
				},
				error		: function() {
					if( heartbeatFails > 2 ) {
						This.gateSite( 'The World of Cars Online is currently unavailable. We apologize for the inconvenience and are working quickly to resolve the problem. Please try again soon and thank you for your patience!' );
						return false;
					}

					heartbeatFails++;
					This.heartbeatTick();
				},
				success		: function( xml ) {
					heartbeatFails = 0;
					if( typeof xml == 'object' || xml != false ) {
						if(jQuery('testUser',xml).length > 0 && jQuery.inArray( jQuery('testUser',xml).text(), [ 'true', 'false' ] ) == -1 ){
							This.gateSite(jQuery('testUser',xml).text());
						}
						if(jQuery('notification',xml).length > 0 && jQuery.inArray( jQuery('notification',xml).text(), [ 'true', 'false' ] ) == -1 ){
							if( !This.hasBanner() ) {
								This.showBanner(jQuery('notification',xml).text());
							}
							This.enablePlayButton();
						}
						if(jQuery('gameClosed',xml).length > 0 && jQuery.inArray( jQuery('gameClosed',xml).text(), [ 'true', 'false' ] == -1 )){
							This.gateSite(jQuery('gameClosed',xml).text());
						}
						if(jQuery('notification',xml).length == 0 && jQuery('gameClosed',xml).length == 0){
							This.removeGate();
						}
					}
				}
			} );
		};

		This.launchGame = function() {
			if( This.gameWindowSpawning || This.gated ) {
				return false;
			}
			This.gameWindowSpawning = true;

			if( This.gameWindow && !This.gameWindow.closed ) {
				This.gameWindow.focus();
				This.gameWindowSpawning = false;
				return false;
			}

			if( !swfobject.hasFlashPlayerVersion( '10' ) ) {
				window.location = RDR.flashUpgrade;
				This.gameWindowSpawning = false;
				return false;
			}

			var winAttr	= [ 'status=0', 'height=687', 'width=996', 'resizable=0', 'toolbar=0', 'menubar=0', 'location=0', 'directories=0', 'scrollbars=1' ];
			This.gameWindow = window.open( RDR.play, 'game_window', winAttr.join( ',' ) );

			if( !This.gameWindow ) {
				alert( 'The game window was blocked by your browser. Please make sure you do not have a popup blocker enabled.' );
			} else {
				This.gameWindow.focus();
			}

			This.gameWindowSpawning = false;
		};

		This.onPlayButtonClick = function() {
			if( !This.playisEnabled() ) {
				return false;
			}

			This.launchGame();
			return false;
		};

		This.hasBanner = function() {
			return jQuery( '#sys-banner' ).length ? true : false;
		};

		This.removeBanner = function() {
			var callback = arguments[0] ? arguments[0] : false;

			if( This.hasBanner() ) {
				jQuery( '#sys-banner' ).slideUp( 400, function() {
					jQuery( this ).remove();
					if( callback ) {
						callback();
					}
				} );
			} else if ( callback ) {
				callback();
			}
		};

		This.removeGate = function() {
			This.gated			= false;
			This.bannerMessage	= false;
			This.removeBanner();
			This.enablePlayButton();
		};

		This.showBanner = function( message ) {
			This.removeBanner( function() {
				jQuery( '.sys-chrome-header' ).after( '<div id="sys-banner" class="sys-banner" style="display: none;"><div class="sys-bannerContent">'+ message +'</div><div class="sys-bannerBottom"></div></div>' );
				jQuery( '#sys-banner' ).slideDown();
			} );
		};
		//------------------------------------------------------[MN]

		// Constructor -----------------------------------------[MN]
		( function() {
			This.heartbeatTick();
			heartbeatTimer = setInterval( This.heartbeatTick, 30000 );
			jQuery( '.sys-btn-play' ).click( This.onPlayButtonClick );

//			This.enablePlayButton();
		} ) ();
		//------------------------------------------------------[MN]

		return This;
	};
	return This();
};

var WOC = new WorldOfCars();