(function (window, $, undefined) {
    /* vars ------------------------------------------------- */
    var document = window.document,
        cfg = {
            queryString: {},
            colorbox: $.colorbox,
            launchGame: WOC.launchGame,
            disneyLoginPage: PATH.siteRoot + '/play/login.html',
            psnLogin: CFG.psn + '/index.vm?returnURL=' + encodeURIComponent(CFG.apiProxy + 'SynergyPlaystationLogin'),
            xblLogin: CFG.wlid + '/signin.aspx?redirect=' + encodeURIComponent(CFG.apiProxy + 'SynergyXblLogin'),
            unlinkNetwork: CFG.apiProxy + 'SynergyUnlinkNetwork',
            getNetworkTags: CFG.apiProxy + 'SynergyGetNetworkTags',
            getCars2EventStatus: CFG.apiProxy + 'SynergyGetCars2SavedEvents',
            whoAmI: CFG.apiProxy + 'WhoAmIRequest',
            classes: {
                rewardComplete: 'rwd-complete',
                rewardNavSelected: 'rwd-subnav-selected'
            },
            selectors: {
                dsTeaserLink: '#lnk-dsTeaserLink',
                psnTeaserLink: '#lnk-psnTeaserLink',
                wiiTeaserLink: '#lnk-wiiTeaserLink',
                xblTeaserLink: '#lnk-xblTeaserLink',
                disneyLoginLink: '.lnk-login',
                psnLoginLink: '#psn-loginLink',
                wiiLoginLink: '#wii-loginLink',
                xblLoginLink: '#xbl-loginLink',
                dsUserTag: '#lnk-dsUserTag',
                psnUserTag: '#lnk-psnUserTag',
                wiiUserTag: '#lnk-wiiUserTag',
                xblUserTag: '#lnk-xblUserTag',
                dsHelpLink: '.lnk-dsHelp',
                psnHelpLink: '.lnk-psnHelp',
                wiiHelpLink: '.lnk-wiiHelp',
                xblHelpLink: '.lnk-xblHelp',
                dsUnlink: '#ds-unlink',
                psnUnlink: '#psn-unlink',
                wiiUnlink: '#wii-unlink',
                xblUnlink: '#xbl-unlink',
                linkAccountButton: '.lnk-linkButton',
                unlinkAccountButton: '.lnk-unlinkButton',
                playLink: '.lnk-playLink',
                rewardContainers: '.rwd-checklistContainer',
                dsRewardContainer: '.rwd-dsContainer',
                psnRewardContainer: '.rwd-psnContainer',
                wiiRewardContainer: '.rwd-wiiContainer',
                xblRewardContainer: '.rwd-xblContainer',
                dsRewardNavLink: '#rwd-dsNavLink',
                psnRewardNavLink: '#rwd-psnNavLink',
                wiiRewardNavLink: '#rwd-wiiNavLink',
                xblRewardNavLink: '#rwd-xblNavLink',
                wiiErrorContainer: '#lnk-wiiErrorContainer'
            },
            loginCallback: 'function(){parent.window.location="' + PATH.siteRoot + '/community/cars-connections/accounts/";}',
            step: 1,
            step1: PATH.siteRoot + '/community/cars-connections/',
            dsTeaserHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-rewards.png" alt="Rewards" /></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">' +
                '<h3>Link to your Nintendo DS and earn rewards!</h3>' +
                '<p>Connect your Cars 2: The Video Game for the Nintendo DS to your account for The World of Cars Online and you can unlock special bonuses!</p>' +
                '<p>Complete races in your Cars 2: The Video Game on the Nintendo Wii and you can earn tons of coins, cool decals and an exclusive costume for your online Car in The World of Cars Online.  In addition, when you play games and race in The World of Cars Online, youâ€™ll unlock new race tracks in your Cars 2: The Video Game.</p>' +
                '<img class="chr-costume-ds" src="' + PATH.img + '/characters/chr-costume-ds.png" />' +
                '</div>' +
                '</div>',
            psnTeaserHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-rewards.png" alt="Rewards" /></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">' +
                '<h3>Link to your PS3 and earn rewards!</h3>' +
                '<p>Connect your Cars 2: The Video Game for the PS3 to your account for The World of Cars Online and you can unlock special bonuses!</p>' +
                '<p>Complete levels and earn crests in your Cars 2: The Video Game on the PS3 and you can earn tons of coins, cool decals and an exclusive costume for your online Car in The World of Cars Online.  In addition, when you play games and race in The World of Cars Online, youâ€™ll unlock spy points and new characters in your Cars 2: The Video Game.</p>' +
                '<img class="chr-costume-psn" src="' + PATH.img + '/characters/chr-costume-psn.png" />' +
                '</div>' +
                '</div>',
            wiiTeaserHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-rewards.png" alt="Rewards" /></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">' +
                '<h3>Link to your Wii and earn rewards!</h3>' +
                '<p>Connect your Cars 2: The Video Game for the Nintendo Wii to your account for The World of Cars Online and you can unlock special bonuses!</p>' +
                '<p>Complete levels and earn crests in your Cars 2: The Video Game on the Nintendo Wii and you can earn tons of coins, cool decals and an exclusive costume for your online Car in The World of Cars Online.  In addition, when you play games and race in The World of Cars Online, youâ€™ll unlock spy points and new characters in your Cars 2: The Video Game.</p>' +
                '<img class="chr-costume-wii" src="' + PATH.img + '/characters/chr-costume-wii.png" />' +
                '</div>' +
                '</div>',
            xblTeaserHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-rewards.png" alt="Rewards" /></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">' +
                '<h3>Link to your XBOX 360 and earn rewards!</h3>' +
                '<p>Connect your Cars 2: The Video Game for the XBOX 360 to your account for The World of Cars Online and you can unlock special bonuses!</p>' +
                '<p>Complete levels and earn crests in your Cars 2: The Video Game on the XBOX 360 and you can earn tons of coins, cool decals and an exclusive costume for your online Car in The World of Cars Online.  In addition, when you play games and race in The World of Cars Online, youâ€™ll unlock spy points and new characters in your Cars 2: The Video Game.</p>' +
                '<img class="chr-costume-xbl" src="' + PATH.img + '/characters/chr-costume-xbl.png" />' +
                '</div>' +
                '</div>',
            dsHelpHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-help.png" alt="Help" /></h2>' +
                '<div class="sys-modalOverlayBody">' +
                '<p>To link your account in The World of Cars Online to your Cars 2 game on Nintendo DS, you need to insert your Cars 2 game card into your Nintendo DS. Turn on the power and when you see the main menu, follow these instructions.</p>' +
                '<ol>' +
                '<li>Select World of Cars.</li>' +
                '<li>Connect to Nintendo Wi-Fi Connection.</li>' +
                '<li>Once connected, a screen with "Registered User" and "Login as a guest" will appear.</li>' +
                '</ol>' +
                '<h3 style="text-align: left;">Registered User</h3>' +
                '<ol>' +
                '<li>Will prompt for your Account ID and password for The World of Cars Online.</li>' +
                '<li>Once you are logged on, you can view the "News" feed or select "Redeem Unlock".</li>' +
                '</ol>' +
                '<h3 style="text-align: left;">Login as a Guest</h3>' +
                '<ol>' +
                '<li>Will automatically log you in.</li>' +
                '<li>From here you can select "News" or "Redeem Unlock".</li>' +
                '</ol>' +
                '</div>' +
                '</div>',
            psnHelpHTML: '<div class="lnk-helpContainer">' +
                '<p>To link your account in The World of Cars Online to your Cars 2 game on your PS3 console, you\'ll need your PlayStation&reg;Network Login and Password.  This is the login and password you use to log into the PlayStation&reg;Network on your PS3.  If you don\'t have one, you\'ll need to create one on your PS3.</p>' +
                '</div>',
            wiiHelpHTML: '<div class="lnk-helpContainer">' +
                '<p>To link your account in The World of Cars Online to your Cars 2 game on your Wii, you\'ll need your Wii Console ID.  To find your Wii Console ID, follow these steps:</p>' +
                '<ol>' +
                '<li>Turn on your Nintendo Wii.</li>' +
                '<li>Insert the Cars 2 Video Game into the Wii.</li>' +
                '<li>Start the Cars 2 Video Game.</li>' +
                '<li>Select the "World of Cars Online" selection from the main menu.</li>' +
                '<li>Choose to "Connect" to World of Cars Online.</li>' +
                '<li>Your World of Cars account code will be displayed at the bottom right of the screen.</li>' +
                '</ol>' +
                '</div>',
            xblHelpHTML: '<div class="lnk-helpContainer">' +
                '<p>To link your account in The World of Cars Online to your Cars 2 game on your Xbox 360 console, you\'ll need your Windows Live ID and Password.  When you signed up for Xbox LIVE, you associated your Xbox LIVE account with a Windows Live ID (your email address). Use this same Windows LIVE ID and password to link your account in The World of Cars Online to your Cars 2 game on your Xbox 360.</p>' +
                '</div>',
            messageHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">{message}</div>' +
                '</div>',
            successHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-congratulations.png" alt="Congratulations" /></h2>' +
                '<div class="sys-modalOverlayBody" style="text-align: center;">' +
                '<h3>Account Linked</h3>' +
                '<p>You have successfully linked your Cars 2: The Video Game with your account for The World of Cars Online.  Now, you can unlock special bonuses!</p>' +
                '<p>Complete levels and circuits in your Cars 2: The Video Game and you can earn tons of coins, cool decals and more for your online Car in The World of Cars Online.  In addition, when you play games and race in The World of Cars Online, you\'ll unlock cool rewards in your Cars 2: The Video Game.</p>' +
                '<p style="margin-top: 5px;"><a class="lnk-playLink btn-play-62" style="margin: auto;" href="#">Play Game</a></p>' +
                '<p><a href="javascript:$.colorbox.close();">Link another account</a></p>' +
                '<p><a href="' + PATH.siteRoot + '/community/cars-connections/rewards/">View my rewards</a></p>' +
                '<img class="chr-materLightning-small" src="' + PATH.img + '/characters/chr-mater-lightning-small.png" />' +
                '</div>' +
                '</div>',
            unlinkedHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-account-unlinked.png" alt="Account Unlinked" /></h2>' +
                '<div class="sys-modalOverlayBody">' +
                '<h3>Account Unlink Confirmed</h3>' +
                '<p>You have successfully unlinked your account in The World of Cars Online from Cars 2: The Video Game.  All rewards you\'ve unlocked in The World of Cars Online and Cars 2: The Video Game will remain in your account.  Repeat the linking process if you would like to re-link your account.</p>' +
                '<img class="chr-red-small" src="' + PATH.img + '/characters/chr-red-small.png" />' +
                '</div>' +
                '</div>',
            wiiLoginHTML: '<div class="sys-modalOverlayContainer">' +
                '<h2><img src="' + PATH.img + '/pageTitle/ttl-overlay-link-my-account.png" alt="Link My Account" /></h2>' +
                '<div class="sys-modalOverlayBody">' +
                '<div class="lnk-logo lnk-logo-wii" style="position: absolute; left: 370px; top: 20px;"></div>' +
                '<h3 style="margin-top: 75px;">ENTER YOUR WII CONSOLE ID</h3>' +
                '<form id="wiiForm" action="' + CFG.apiProxy + 'SynergyWiiLogin">' +
                '<div style="width: 305px; margin: auto; position: relative;">' +
                '<input class="sys-textInput" type="text" name="code" style="width: 289px;"/><div class="sys-textInputCap"></div>' +
                '<div id="lnk-wiiErrorContainer" class="sys-formErrorContainer"></div>' +
                '<div class="sys-clear"></div>' +
                '</div>' +
                '<input style="margin: 30px auto; display: block;" class="btn-submit-36" type="submit" value="" />' +
                '</form>' +
                '</div>' +
                '</div>'
        },
        api = $.fn.DIMGAccountLinker = $.DIMGAccountLinker = function (cfgOverride) {
            $.extend(true, cfg, cfgOverride);
        };
    /* ------------------------------------------------------ */

    /* helper functions ------------------------------------- */
    function parseQueryString() {
        var i = 0,
            pair = [],
            pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i].split('=');
            cfg.queryString[pair[0]] = decodeURI(pair[1]).replace(/\+/, ' ');
        }
    }

    function setLinkStatus(network, userTag) {
        var tagSelectors = {
            'ds': cfg.selectors.dsUserTag,
            'psn': cfg.selectors.psnUserTag,
            'wii': cfg.selectors.wiiUserTag,
            'xbl': cfg.selectors.xblUserTag
        },
            tag = tagSelectors[network] ? $(tagSelectors[network]) : false,
            container,
            linkButton,
            unlinkButton;

        if (!tag) {
            return false;
        }

        container = tag.parent();
        linkButton = container.find(cfg.selectors.linkAccountButton);
        unlinkButton = container.find(cfg.selectors.unlinkAccountButton);

        if (userTag === false) {
            // not linked
            tag.html('NOT LINKED');
            container.removeClass('lnk-linked').addClass('lnk-notLinked');
            linkButton.html('Link My Account').removeClass('btn-change').addClass('btn-link-my-account');
            unlinkButton.css('display', 'none');
        } else {
            // linked
            tag.html(userTag !== '' ? userTag : 'LINKED');
            container.removeClass('lnk-notLinked').addClass('lnk-linked');
            linkButton.html('Change').removeClass('btn-link-my-account').addClass('btn-change');
            unlinkButton.css('display', 'inline');
        }

        linkButton.css('display', 'block');
    }
    /* ------------------------------------------------------ */

    /* api functions ---------------------------------------- */
    api.init = function () {
        switch (cfg.step) {
            case 2:
                api.initStep2();
                break;

            case 3:
                api.initStep3();
                break;

            case 1:
            default:
                api.initStep1();
                break;
        }
    };

    api.initStep1 = function () {
        $(cfg.selectors.disneyLoginLink).click(api.loadLoginModule);
        $(cfg.selectors.dsTeaserLink).colorbox({ 'html': cfg.dsTeaserHTML });
        $(cfg.selectors.wiiTeaserLink).colorbox({ 'html': cfg.wiiTeaserHTML });
        $(cfg.selectors.xblTeaserLink).colorbox({ 'html': cfg.xblTeaserHTML });
        $(cfg.selectors.psnTeaserLink).colorbox({ 'html': cfg.psnTeaserHTML });
    };

    api.initStep2 = function () {
        function setOverlayCookie() {
            if (cfg.queryString.t) {
                $.cookie('loginResponseOverlayShown', cfg.queryString.t);
            }
        }

        function isOverlayAllowed() {
            var overlayID = $.cookie('loginResponseOverlayShown');

            return (overlayID !== null && overlayID == cfg.queryString.t) ? false : true;
        }

        $(cfg.selectors.wiiLoginLink).colorbox({
            html: cfg.wiiLoginHTML,
            onComplete: function () {
                jQuery('#wiiForm').submit(function (e) {
                    $(cfg.selectors.wiiErrorContainer).html('');
                    jQuery.get(jQuery(this).attr('action'), jQuery(this).serializeArray(), function (json) {
                        api.onWiiLoginResponse(json);
                    }, 'json');
                    e.preventDefault();
                    e.stopPropagation();
                });

            }
        });
        $(cfg.selectors.xblLoginLink).attr('href', cfg.xblLogin);
        $(cfg.selectors.psnLoginLink).colorbox({
            innerWidth: 500,
            innerHeight: 500,
            iframe: true,
            href: cfg.psnLogin
        });

        $(cfg.selectors.dsHelpLink).colorbox({ 'html': cfg.dsHelpHTML });
        $(cfg.selectors.wiiHelpLink).colorbox({ 'html': cfg.wiiHelpHTML });
        $(cfg.selectors.xblHelpLink).colorbox({ 'html': cfg.xblHelpHTML });
        $(cfg.selectors.psnHelpLink).colorbox({ 'html': cfg.psnHelpHTML });

        $(cfg.selectors.psnUnlink).click(function (e) {
            $.getJSON(cfg.unlinkNetwork, { 'networkID': 1 }, function (json) {
                api.onNetworkTagsLoaded(json);
                cfg.colorbox({
                    'html': cfg.unlinkedHTML
                });
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(cfg.selectors.wiiUnlink).click(function (e) {
            $.getJSON(cfg.unlinkNetwork, { 'networkID': 2 }, function (json) {
                api.onNetworkTagsLoaded(json);
                cfg.colorbox({
                    'html': cfg.unlinkedHTML
                });
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(cfg.selectors.xblUnlink).click(function (e) {
            $.getJSON(cfg.unlinkNetwork, { 'networkID': 3 }, function (json) {
                api.onNetworkTagsLoaded(json);
                cfg.colorbox({
                    'html': cfg.unlinkedHTML
                });
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(cfg.selectors.xblUnlink).click(function (e) {
            $.getJSON(cfg.unlinkNetwork, { 'networkID': 4 }, function (json) {
                api.onNetworkTagsLoaded(json);
                cfg.colorbox({
                    'html': cfg.unlinkedHTML
                });
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(cfg.selectors.playLink).live('click', cfg.launchGame);
        $.getJSON(cfg.getNetworkTags, false, api.onNetworkTagsLoaded);

        parseQueryString();
        if (cfg.queryString.success !== undefined && cfg.queryString.success === 'true' && isOverlayAllowed()) {
            api.onLinkingSuccess();
            setOverlayCookie();
        }
        if (cfg.queryString.error !== undefined && isOverlayAllowed()) {
            api.displayMessage(cfg.queryString.error, 'error');
            setOverlayCookie();
        }

    };

    api.initStep3 = function () {
        parseQueryString();
        api.requireLogin(function () {
            $.getJSON(cfg.getCars2EventStatus, false, api.onRewardLoadResponse);
        });

        $(cfg.selectors.dsRewardNavLink).click(function (e) { api.displayRewards('ds'); e.preventDefault(); });
        $(cfg.selectors.wiiRewardNavLink).click(function (e) { api.displayRewards('wii'); e.preventDefault(); });
        $(cfg.selectors.xblRewardNavLink).click(function (e) { api.displayRewards('xbl'); e.preventDefault(); });
        $(cfg.selectors.psnRewardNavLink).click(function (e) { api.displayRewards('psn'); e.preventDefault(); });
    };

    api.loadLoginModule = function (e) {
        cfg.colorbox({
            innerWidth: 996,
            innerHeight: 687,
            iframe: true,
            href: cfg.disneyLoginPage + '?regCompleteCallback=' + escape(cfg.loginCallback) // add mbox tracking call here?
        });
        return false;
    };

    api.displayMessage = function (msg, type) {
        type = type || 'success';

        cfg.colorbox({ 'html': cfg.messageHTML.replace(/{message}/g, msg) });
    };

    api.displayRewards = function (platform) {
        var allContainers = cfg.selectors.rewardContainers,
            containerSelectors = {
                'ds': cfg.selectors.dsRewardContainer,
                'psn': cfg.selectors.psnRewardContainer,
                'wii': cfg.selectors.wiiRewardContainer,
                'xbl': cfg.selectors.xblRewardContainer
            },
            navLinkSelectors = {
                'ds': cfg.selectors.dsRewardNavLink,
                'psn': cfg.selectors.psnRewardNavLink,
                'wii': cfg.selectors.wiiRewardNavLink,
                'xbl': cfg.selectors.xblRewardNavLink
            };

        $(navLinkSelectors[platform]).addClass(cfg.classes.rewardNavSelected).siblings().removeClass(cfg.classes.rewardNavSelected);
        $(allContainers + ':not(' + containerSelectors[platform] + ')').css('display', 'none');
        $(containerSelectors[platform]).css('display', 'block');
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

    api.onLinkingSuccess = function () {
        $.colorbox({
            html: cfg.successHTML
        });
    };

    api.onNetworkTagsLoaded = function (json) {
        if (json.tags) {
            api.setPsnLinkStatus(json.tags[1] !== undefined ? json.tags[1] : false);
            api.setWiiLinkStatus(json.tags[2] !== undefined ? json.tags[2] : false);
            api.setXblLinkStatus(json.tags[3] !== undefined ? json.tags[3] : false);
            api.setDsLinkStatus(json.tags[4] !== undefined ? json.tags[4] : false);
        } else {
            window.location = cfg.step1;
            // api.displayMessage(json.msg, 'error');
        }
    };

    api.onRewardLoadResponse = function (json) {
        var i = 0,
            j = 0,
            platforms = {
                19666: '.psnReward-',
                17742: '.wiiReward-',
                31466: '.xblReward-',
                12835: '.dsReward-',
                29119: '.wocReward-'
            };

        for (i in platforms) {
            if (!platforms.hasOwnProperty(i)) {
                continue;
            }
            for (j = 0; j < json[i].length; j++) {
                if (json[i].substr(j, 1) == 1) {
                    $(platforms[i] + j).addClass(cfg.classes.rewardComplete);
                }
            }
        }

        api.displayRewards(cfg.queryString.preselect !== undefined ? cfg.queryString.preselect : 'ds');
    };

    api.onPsnLoginResponse = function (status, msg, userTag) {
        $(document).bind('cbox_closed', function () {
            if (status === 'success') {
                api.onLinkingSuccess();
            } else {
                api.displayMessage(msg, status);
            }

            $(document).unbind('cbox_closed');
        });
        $.colorbox.close();

        if (userTag) {
            api.setPsnLinkStatus(userTag);
        }
    };

    api.onWiiLoginResponse = function (json) {
        if (json.status !== 'success') {
            $(cfg.selectors.wiiErrorContainer).html('<ul><li>' + json.msg + '</li></ul>');
            return;
        }

        $(document).bind('cbox_closed', function () {
            api.onLinkingSuccess();
            $(document).unbind('cbox_closed');
        });
        $.colorbox.close();

        if (json.userTag) {
            api.setWiiLinkStatus(json.userTag);
        }
    };

    api.onXblLoginResponse = function (status, msg, userTag) {
        $(document).bind('cbox_closed', function () {
            if (status === 'success') {
                api.onLinkingSuccess();
            } else {
                api.displayMessage(msg, status);
            }

            $(document).unbind('cbox_closed');
        });
        $.colorbox.close();

        if (userTag) {
            api.setXblLinkStatus(userTag);
        }
    };

    api.setDsLinkStatus = function (userTag) {
        setLinkStatus('ds', userTag);
    };

    api.setPsnLinkStatus = function (userTag) {
        setLinkStatus('psn', userTag);
    };

    api.setWiiLinkStatus = function (userTag) {
        setLinkStatus('wii', userTag);
    };

    api.setXblLinkStatus = function (userTag) {
        setLinkStatus('xbl', userTag);
    };
    /* ------------------------------------------------------ */

    /* initialize on document ready ------------------------- */
    $(api.init);
    /* ------------------------------------------------------ */
})(window, jQuery);