var HomepageSlideshow = function (config) {
	var This = function () {
		// Public Vars -----------------------------------------[MN]
		var slideTimer = null;
		var $slideContainer = null;
		var currentIndex = null;
		var fadeDuration = null;
		var slides = [];
		// -----------------------------------------------------[MN]

		// Public Vars -----------------------------------------[MN]
		This._config = {
			slides: [],
			selectors: {
				'hotLink': '.hom-slideshowHotspot',
				'fadeDuration': 3000,
				'slideContainer': '.hom-slideshowContainer'
			}
		};
		//------------------------------------------------------[MN]

		// Constructor -----------------------------------------[MN]
		(function () {
			This._config = jQuery.extend(This._config, config);
			fadeDuration = This._config.fadeDuration;
			$slideContainer = jQuery(This._config.selectors.slideContainer);
			slides = This._config.slides;

			jQuery(This._config.selectors.hotLink).hover(function () { This.hoverOn(); }, function () { This.hoverOff(); });
		})();
		//------------------------------------------------------[MN]

		// Public Functions ------------------------------------[MN]
		This.hoverOff = function () {
			$slideContainer.find('.hom-slide').css('top', '0px');
		};

		This.hoverOn = function () {
			$slideContainer.find('.hom-slide').css('top', '-397px');
		};

		This.init = function () {
			currentIndex = 0;

			var HTML = '';
			for (i in slides) {
				HTML += '<img src="' + slides[i].image + '" class="hom-slide" rel="' + i + '"';
				if (i == 0) {
					HTML += ' style="visibility: visible;"';
				}
				HTML += '></div>';
			}
			$slideContainer.html(HTML);

			jQuery(This._config.selectors.hotLink).click(This.onSlideClick);

			if (This._config.slides.length > 1) {
				This.startTimerAfterLoad();
			}

			$slideContainer.css('zoom', 1); // ie6 hax
		};

		This.onSlideClick = function () {
			slides[currentIndex].onClick();
			return false;
		};

		This.loadNextSlide = function () {
			var newIndex = currentIndex == slides.length - 1 ? 0 : currentIndex + 1;
			var $newGroup = $slideContainer.find('.hom-slide[rel=' + newIndex + ']');

			$newGroup.css('z-index', 1).siblings().css('z-index', 0);
			$newGroup.fadeIn(fadeDuration, function () {
				jQuery(This._config.selectors.hotLink).attr('href', slides[newIndex].link);
				jQuery(this).siblings().css('display', 'none');
			});

			currentIndex = newIndex;

			This.startTimer();
		};

		This.startTimer = function () {
			slideTimer = setTimeout(This.loadNextSlide, slides[currentIndex].duration * 1000);
		};

		This.startTimerAfterLoad = function () {
			var slidesLoading = slides.length;

			jQuery('.hom-slide').load(function () {
				slidesLoading = slidesLoading - 1;
				if (jQuery(this).attr('rel') != 0) {
					jQuery(this).css({
						'display': 'none',
						'visibility': 'visible'
					});
				}

				if (slidesLoading == 0) {
					This.startTimer();
				}
			});
		}
		//------------------------------------------------------[MN]

		return This;
	};
	return This();
};