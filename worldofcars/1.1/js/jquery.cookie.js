/* Cookie Plugin */
(function($) {
	$.cookie = function(name) {
		if (arguments[1] != undefined) {
			var value	= arguments[1] || '';
			var options = arguments[2] || {};
			var expires = '';
			var path	= (options.path)	? '; path=' + options.path : '';
			var domain	= (options.domain)	? '; domain=' + options.domain : '';
			var secure	= (options.secure)	? '; secure' : '';

			if (options.expires && typeof options.expires == 'number') {
				var date = new Date();
				date.setTime(date.getTime() + (options.expires * 86400000));
				expires = '; expires=' + date.toUTCString();
			}
			document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
		} else {
			if (document.cookie) {
				var cookies = document.cookie.split(';');

				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);

					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						return decodeURIComponent(cookie.substring(name.length + 1));
					}
				}
			}
			return null;
		}
	}
})(jQuery);