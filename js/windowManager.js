// Window Manager Class --------------------------------[MN]
var windowManager = function( config ) {
	var This = function() {

		// Public Vars
		This._config = {
			pages				: {},
			omnitureTracking	: {},
			windows				: {
				'game'		: window,
				'website'	: window.opener
			},
			survey				: false
		};

		// Public Functions
		This.bindSurvey = function( surveyURI ) {
			jQuery( This._config.windows.game ).bind( 'unload', function() {
				This.redirectWebsite( surveyURI );
			} );
		};

		This.goTo = function( page ) {
			var closeGame		= arguments[1] ? arguments[1] : false;
			var queryString		= arguments[2] ? arguments[2] : false;
			var omnitureTrack	= arguments[3] ? arguments[3] : false;
			var focusWebsite	= false;

			if( omnitureTrack && This._config.omnitureTracking[omnitureTrack] ) {
				This.sendOmnitureTrack( omnitureTrack );
			}

			if( This._config.pages[page] ) {
				var URI = This._config.pages[page];
				if( queryString ) {
					URI = URI + queryString;
				}

				This.redirectWebsite( URI );
				focusWebsite = true;
			}

			if( closeGame == 'true' ) {
				This._config.windows.game.close();
				This._config.windows.game	= null;
				focusWebsite				= true;
			}

			if( focusWebsite ) {
				This._config.windows.website.focus();
			}
		};

		This.redirectWebsite = function( URI ) {
			if( This._config.windows.website == null || jQuery( This._config.windows.website ).attr( 'closed' ) ) {
				This._config.windows.website			= window.open( URI, 'woc_site' );
			} else {
				This._config.windows.website.location	= URI;
			}
		};

		This.sendOmnitureTrack = function( omnitureTrack ) {
			var cto			= new CTO();
			jQuery.extend( true, cto, This._config.omnitureTracking[omnitureTrack], { pageName : omnitureTrack } );
			cto.track();
		};

		This.refresh = function() {
			window.location = window.location
		};

		// Constructor
		( function() {
			This._config = jQuery.extend( This._config, config );

			if( This._config.survey ) {
				This.bindSurvey( This._config.survey );
			}
		} )();

		return This;
	};
	return This();
};
//------------------------------------------------------[MN]