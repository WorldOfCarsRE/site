(function (window, $, undefined) {
	/* vars ------------------------------------------------- */
	var document = window.document,
		cfg = {
			queryString: {},
			colorbox: $.colorbox,
			launchGame: WOC.launchGame,
			disneyLoginPage: PATH.siteRoot + '/site/play/login.html',
			whoAmI: CFG.api + 'WhoAmIRequest',
			promoCodeService: CFG.api + 'RedeemPromoCodeRequest',
			selectors: {
				disneyLoginLink: '.cod-login-link',
				codeEntryForm: '#cod-entryForm',
				codeInput: '#cod-input',
				codeSubmitButton: '#btn-submit',
				formErrorContainer: '.sys-formErrorContainer',
				playLink: '.cod-playLink',
				rewardList: '#cod-rewardList',
				rewardPageBackLink: '.cod-backButton',
				rewardPageNextLink: '.cod-nextButton'
			},
			loginCallback: 'function(){parent.window.location="' + PATH.siteRoot + '/site/community/codes/redeem/";}',
			step: 1,
			step1: PATH.siteRoot + '/site/community/codes/',
			rewardHtmlTemplate: '<li class="cod-reward"><img src="{thumbnail}" alt="{description}" /><div class="cod-description">{quantity} {description}</div></li>',
			successHtmlTemplate: '<div class="sys-modalOverlayContainer">' +
				'<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-congratulations.png" alt="Congratulations" /></h2>' +
				'<div class="cod-modalOverlayBody">' +
				'<div class="sys-clear"></div>' +
				'<div id="cod-rewardCarousel" class="cod-rewardCarousel">' +
				'<a href="#" class="cod-navButton cod-backButton"><</a>' +
				'<ul id="cod-rewardList" class="cod-rewardList">{rewards}</ul>' +
				'<a href="#" class="cod-navButton cod-nextButton">></a>' +
				'</div>' +
				'<a href="#" class="cod-playLink btn-play-62">Play Game</a>' +
				'<a href="javascript:$.colorbox.close();">Enter another code</a></li>' +
				'</div>' +
				'</div>'
		},
		api = $.fn.DIMGCodeRedemption = $.DIMGCodeRedemption = function (cfgOverride) {
			$.extend(true, cfg, cfgOverride);
		};
	/* ------------------------------------------------------ */

	/* helper functions ------------------------------------- */

	/* ------------------------------------------------------ */

	/* api functions ---------------------------------------- */
	api.init = function () {
		switch (cfg.step) {
			case 2:
				api.initStep2();
				break;

			case 1:
			default:
				api.initStep1();
				break;
		}
	};

	api.initStep1 = function () {
		$(cfg.selectors.disneyLoginLink).click(api.loadLoginModule);
	};

	api.initStep2 = function () {
		api.requireLogin(function () {
			$(cfg.selectors.codeSubmitButton).attr('disabled', false);
			$(cfg.selectors.codeEntryForm).submit(api.onCodeSubmit);
			$(cfg.selectors.playLink).live('click', function () { cfg.launchGame(); return false; });
		});
	};

	api.onCodeSubmit = function (e) {
		$(cfg.selectors.formErrorContainer).html('');
		$.post(cfg.promoCodeService, $(this).serializeArray(), api.onCodeSubmitResponse);
		e.preventDefault();
	};

	api.onCodeSubmitResponse = function (xml) {
		var addReward = function (i) {
			var description = $(this).children('description').text(),
				quantity = $(this).children('quantity').text(),
				thumbnail = PATH.img + $(this).children('thumbnail').text();

			if (description.toLowerCase() === 'car coins') { // coins don't have a catalog id
				thumbnail = PATH.img + '/codes/' + (quantity >= 1000 ? 'rwd-coins-2.jpg' : 'rwd-coins-1.jpg');
			}

			rewardStrings.push(cfg.rewardHtmlTemplate.replace(/{description}/g, description).replace(/{quantity}/g, quantity).replace(/{thumbnail}/g, thumbnail));
		},
			pageLinkStrings = [],
			rewardStrings = [],
			error = false,
			errorCode = false,
			errorCodeMap = {
				ALREADY_REDEEMED_PROMO_CODE: 'The code you entered has already been redeemed',
				INVALID_PROMO_CODE: 'Invalid code',
				USER_NOT_LOGGED_IN: 'You need to <a href="' + PATH.siteRoot + '/site/community/codes/">log in</a> before redeeming a code',
				RACECAR_NOT_FOUND: 'You need to <a href="' + PATH.siteRoot + '/site/community/codes/">log in and create a racecar</a> before redeeming this code'
			};

		if ($(xml).find('success').text().toLowerCase() !== 'true') {
			errorCode = $(xml).find('error').attr('code');
			error = errorCodeMap[errorCode] !== undefined ? errorCodeMap[errorCode] : 'Unknown Error';

			$(cfg.selectors.formErrorContainer).html('<ul><li>' + error + '</li></ul>');
			return;
		}

		$(xml).find('reward').each(addReward);
		cfg.colorbox({
			html: cfg.successHtmlTemplate.replace(/{rewards}/, rewardStrings.join('')).replace(/{pageLinks}/, pageLinkStrings.join('')),
			onComplete: api.onRewardOverlayLoaded
		});
		$(cfg.selectors.codeInput).val('');
	};

	api.onRewardOverlayLoaded = function () {
		var rewardList = $(cfg.selectors.rewardList),
			rewardCount = rewardList.children().length,
			backLinkEnabled = false,
			nextLinkEnabled = false;

		function disableLink(direction) {
			if (direction === 0) {
				if (backLinkEnabled) {
					$(cfg.selectors.rewardPageBackLink).removeClass('active');
					backLinkEnabled = false;
				}
			} else {
				if (nextLinkEnabled) {
					$(cfg.selectors.rewardPageNextLink).removeClass('active');
					nextLinkEnabled = false;
				}
			}
		}

		function enableLink(direction) {
			if (direction === 0) {
				if (!backLinkEnabled) {
					$(cfg.selectors.rewardPageBackLink).addClass('active');
					backLinkEnabled = true;
				}
			} else {
				if (!nextLinkEnabled) {
					$(cfg.selectors.rewardPageNextLink).addClass('active');
					nextLinkEnabled = true;
				}
			}
		}

		rewardList.cycle({
			after: function (current, next, opts) {
				var currSlide = opts.currSlide + 1;

				if (currSlide === 1) {
					disableLink(0);
					enableLink(1);
				} else if (currSlide === rewardCount) {
					disableLink(1);
					enableLink(0);
				} else {
					enableLink(0);
					enableLink(1);
				}
			},
			fx: 'scrollHorz',
			next: cfg.selectors.rewardPageNextLink,
			nowrap: true,
			prev: cfg.selectors.rewardPageBackLink,
			speed: 300,
			timeout: 0
		});

		if (rewardCount > 1) {
			$(cfg.selectors.rewardPageBackLink + ',' + cfg.selectors.rewardPageNextLink).css('display', 'block');
		}
	};

	api.loadLoginModule = function (e) {
		cfg.colorbox({
			innerWidth: 996,
			innerHeight: 687,
			iframe: true,
			href: cfg.disneyLoginPage + '?regCompleteCallback=' + escape(cfg.loginCallback) // add mbox tracking call here?
		});
		e.preventDefault();
		e.stopPropagation();
	};

	api.displayMessage = function (msg, type) {
		type = type || 'success';
		alert(type + ': ' + msg);
	};

	api.requireLogin = function (onLoginConfirmed) {
		$.get(cfg.whoAmI, false, function (xml) {
			if ($(xml).find('status').text() === 'logged_in_player') {
				onLoginConfirmed();
			} else {
				window.location = cfg.step1;
			}
		}, 'xml');
	};
	/* ------------------------------------------------------ */

	/* initialize on document ready ------------------------- */
	$(api.init);
	/* ------------------------------------------------------ */
})(window, jQuery);