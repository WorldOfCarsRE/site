// Window Manager Class --------------------------------[MN]
var windowManager = function (config) {
	var This = function () {

		// Public Vars
		This._config = {
			pages: {},
			omnitureTracking: {},
			windows: {
				'game': window,
				'website': window.opener
			},
			redirectOnClose: false
		};

		// Public Functions
		This.afk = function () {
			This._config.windows.game.location = 'afk.html';
		};

		This.bindRedirect = function (URI) {
			jQuery(This._config.windows.game).bind('unload', function () {
				This.redirectWebsite(URI);
			});
		};

		This.unbindRedirect = function () {
			jQuery(This._config.windows.game).unbind('unload');
		};

		This.closeGame = function () {
			This._config.windows.game.location = 'login.html';
			This._config.windows.game.close();
			This._config.windows.game = null;
		};

		This.focusWebsite = function () {
			This._config.windows.website.focus();
		};

		This.goTo = function (page) {
			var closeGame = arguments[1] && arguments[1] != 'false' ? arguments[1] : false;
			var queryString = arguments[2] && arguments[2] != 'false' ? arguments[2] : false;
			var omnitureTrack = arguments[3] && arguments[3] != 'false' ? arguments[3] : false;
			var focusWebsite = false;

			if (omnitureTrack && This._config.omnitureTracking[omnitureTrack]) {
				This.sendOmnitureTrack(omnitureTrack);
			}
			if (This._config.pages[page]) {
				var URI = This._config.pages[page];

				if (queryString) {
					URI = URI + queryString;
				}

				This.redirectWebsite(URI);
				focusWebsite = true;
			}

			if (closeGame == true || closeGame == 'true') {
				This.unbindRedirect();
				This.focusWebsite();
				This.closeGame();
			}

			if (focusWebsite) {
				This.focusWebsite();
			}
		};

		This.loadLogin = function () {
			window.location = RDR.play;
		};

		This.logOff = function (page) {
			if (This._config.pages[page]) {
				This.redirectWebsite(This._config.pages[page]);
			}
			This.focusWebsite();
			jQuery.get(CFG.ajaxLogout, false, This.closeGame);
		};

		This.redirectWebsite = function (URI) {
			if (This._config.windows.website == null || This._config.windows.website.closed || !This._config.windows.website.location) {
				This._config.windows.website = window.open(URI, 'woc_site');
			} else {
				This._config.windows.website.location = URI;
			}
		};

		This.sendOmnitureTrack = function (omnitureTrack) {
			var trackLib = {}
			jQuery.extend(true, trackLib, cto, This._config.omnitureTracking[omnitureTrack], { pageName: omnitureTrack });
			trackLib.track();
		};

		This.refresh = function () {
			This.unbindRedirect();
			window.location = window.location;
		};

		This.resizeWindow = function (width, height) {
			var scrollbars = false;

			if (screen.width < width) {
				width = screen.width;
				scrollbars = true;
			}
			if (screen.height < height) {
				height = screen.height;
				scrollbars = true;
			}

			window.resizeTo(width, height);
			jQuery('html').css('overflow', scrollbars ? 'auto' : 'hidden');
		};

		// Constructor
		(function () {
			This._config = jQuery.extend(This._config, config);
			if (This._config.redirectOnClose) {
				This.bindRedirect(This._config.redirectOnClose);
			}
		})();

		return This;
	};
	return This();
};
//------------------------------------------------------[MN]