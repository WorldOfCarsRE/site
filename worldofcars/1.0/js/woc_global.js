// set jQuery no conflict
var jq = jQuery.noConflict();

// set custom Disney chrome
var chromeColor = "lightgrey";
var chromeWidth = 996;
//var chromeCategory = "Games";
var legalFooterColor = "#A3A3A3";
var legalFooterCat = "Games";

var jsReady = false;
var eiData = {};
var regCallback = '';

// var basePath = 'http://a.dolimg.com/worldofcars/websitedevelopment';	// REPLACED WITH PATH.cdn
// var imgPath = basePath+'/images';		// REPLACED WITH PATH.img
var gate = false;
var gateMsg = '';
var gateTimer = '';
var gameWindow = false;
var gameWindowSpawning = false;
var moduleSpawning = false;
var helpSwitchAnimating = false;

jq(function(){

	jq('.q_list a').click(helpSwitch);

	checkGate();
	gateTimer = setInterval(checkGate,30000);
	//showGate('We are excited to report that new game features are being added. Unfortunately, The World of Cars Online will be unavailable from 12:15AM PST until 2AM PST while we update the game. We appreciate your patience!');

	jq( '#play_button' ).click( onPlayClick );
});
/*
window.onbeforeunload = function (evt) {
  var message = 'Are you sure you want to leave?';
  if (typeof evt == 'undefined') {
    evt = window.event;
  }
  if (evt) {
    evt.returnValue = message;
  }
  return message;
}
*/

// Test browser for Version IE
function browserVersion() {
	var version = '';
  if (navigator.appVersion.indexOf("MSIE") != -1)
    version = parseFloat(navigator.appVersion.split("MSIE")[1]);
  return version;
}

var popupStatus = 0;
var activeDiv = '';
var opacity = '0.7';
var access = false;

function onPlayClick() {
	if( jq( '#play_button' ).hasClass( 'play_active' ) ) {
		cto=new CTO();
		cto.account='worldofcars';
		cto.category='dgame';
		cto.site='woc';
		cto.pageName='play_button';
		cto.contentType='regular';
		cto.property='car';
		cto.track();

		launchGame();
	}
}

function loadPopup(div){
	if(popupStatus==0){
		jq("#blk_alpha").css({
			"opacity":opacity
		});
		jq("#blk_alpha").fadeIn("fast");
		jq("#"+div).fadeIn("slow");
		popupStatus = 1;

		jq("#blk_alpha").click(function(){
			jq('#blk_alpha').fadeOut('fast');
			disablePopup(activeDiv);
		});
	}
}

function disablePopup(div){
	if(popupStatus==1){
		jq("#blk_alpha").fadeOut("fast");
		jq("#"+div).fadeOut("slow");
		popupStatus = 0;

		jq("#blk_alpha").remove();
		jq("#"+div).remove();

		if( typeof WTN != 'undefined' ) { // Restart What's New carousel
			WTN.start();
		}
	}
}

function centerPopup(div){
	activeDiv=div;
	var wWidth = document.documentElement.clientWidth;
	var wHeight = document.documentElement.clientHeight;

	var popupHeight = jq("#"+div).height();
	var popupWidth = jq("#"+div).width();

	var xCenter = (wWidth/2)-(popupWidth/2);
	var yCenter = (wHeight/2)-(popupHeight/2);

	var top = yCenter < 0 ? 0 : yCenter;

	jq( window ).scrollTop( 0 );
	jq("#"+div).css({
		"position":"absolute",
		"top": "0px",
		"left": xCenter+"px"
	});

	jq("#blk_alpha").css({
		"height":wHeight,
		"width":wWidth
	});

	jq(window).bind('resize',resizePopup);

	if( typeof WTN != 'undefined' ) { // Pause What's New carousel
		WTN.pause();
	}

	loadPopup(div);
}

function resizePopup(){
	if(popupStatus == 1)
		centerPopup(activeDiv)
}

var errorInt = 0;
function checkGate() {
	jq.ajax( {
		'type'		: 'GET',
		'url'		: CFG.whoAmI,
		'dataType' : 'xml',
		'success'	: function( data ) {
			if( typeof data == 'object' || data != false ) {
				processGate( data );
			}
		},
		'error'		: function() {
			if( errorInt > 3 ){
				var defaultMessage = '<gameClosed>The World of Cars Online is currently unavailable. We apologize for the inconvenience and are working quickly to resolve the problem. Please try again soon and thank you for your patience!</gameClosed>';

				if (window.DOMParser){
					var parser = new DOMParser();
					xmlDoc = parser.parseFromString(defaultMessage,"text/xml");
				} else { // Internet Explorer
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async="false";
					xmlDoc.loadXML(defaultMessage);
				}
				processGate( xmlDoc );
			} else{
				checkGate();
				errorInt++;
			}
		}
	} );
}

function processGate(xml) {
	if(jq('testUser',xml).length > 0){
		showGate(jq('testUser',xml).text());
		gateMsg = jq('testUser',xml).text();
	}
	if(jq('notification',xml).length > 0){
		showGate(jq('notification',xml).text());
		gateMsg = jq('notification',xml).text();
		loadPlayButton();
	}
	if(jq('gameClosed',xml).length > 0){
		showGate(jq('gameClosed',xml).text());
		disablePlay();
		gate = true;
		gateMsg = jq('gameClosed',xml).text();
	}
	if(jq('notification',xml).length == 0 && jq('gameClosed',xml).length == 0){
		removeGate();
	}
}

function disabledClick() {
	return false;
}

function disablePlay(){
	if( jq( '#play_button' ).hasClass( 'play_active' ) ) {
		jq( '#play_button' ).addClass( 'play_inactive' ).removeClass( 'play_active' );
	}


//	jq( '.welcome_play' ).each( function() {
//		jq( this ).click( function() { return false; } );
		jq( '.welcome_play' ).attr( 'href', '#' ).addClass( 'welcome_inactive' );
//	} );
}

function showGate(msg){
	if(msg != 'true' && msg != 'false'){
		if(jq('#gate').length == 0){
			jq('#chrome').after('<div id="gate"><div class="l_gate"><p>'+msg+'</p></div></div>');
			jq('#gate').slideDown();
		}
		if(jq('#gate p').html() != msg)
			jq('#gate p').html(msg);
	}
}

function removeGate(){
	gate = false;
	jq('#gate').slideDown(function(){jq(this).remove();});
	loadPlayButton();
}

function carsLogin(u,p){
	if(gate == true){
		alert(gateMsg);
	}else{
		jq.ajax({
			type: "POST",
			url: CFG.ajaxLogin,
			data: "username="+u+"&password="+p,
			success: loginSuccess,
			error: handleError
		});
	}
}

function toCancel(){
	window.location = '/sponsorship/manage-account/cancel-sponsorship/confirmation.html';
}

function productLoginSuccess(){
}

function loginComplete(){
}
function handleError(e){
//	alert(e);
}
function exitMod(){
	disablePopup(activeDiv);
}
function loadOverlay(){

}

function loadPlayButton(){
	if( jq( '#play_button' ).hasClass( 'play_inactive' ) ) {
		jq( '#play_button' ).addClass( 'play_active' ).removeClass( 'play_inactive' );
	}

	jq( '.welcome_play' ).attr( 'href', 'javascript:void(0);' ).removeClass( 'welcome_inactive' );
}

function loadDataservice(){
	var callback	= arguments[0] ? arguments[0] : false;
	var basePath	= arguments[1] ? arguments[1] : PATH.cdnRoot +'/1.0/swf';
	var wrap = jq('<div>');//.css({'height':'0px','width':'0px'});
	jq('body').append('<div id="flash_content"></div>');
	jq('#flash_content').wrap(wrap);
	var attributes = {};
		attributes['id'] = 'dataservice';
		attributes['allowScriptAccess'] = "always";
	var flashparams = {};
		flashparams['allowScriptAccess'] = "always";
	var flashvars = {};
		flashvars['allowScriptAccess'] = "always";

	swfobject.embedSWF(basePath +'/dataservice.swf', "flash_content", "1", "1", "9.0.0", "", RAMP.flashVars, RAMP.params, attributes, callback);
}

function regComplete(){
	window.location = PATH.siteRoot +'/welcome/';
}

function goToReg(){
	launchGame();
}

function purchaseComplete(){
/*
	disablePopup(activeDiv);
	launchGame();
*/
	window.location = PATH.siteRoot +'/welcome-sponsored-racer/';
}

function toXML(string){
	try //Internet Explorer
	{
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.loadXML(string);
		return xmlDoc;
	}
	catch(e)
	{
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(string,"text/xml");
		return xmlDoc;
	}
}

function launchGame(){
	if( gameWindowSpawning ) {
		return false;
	}
	gameWindowSpawning = true;

	if( gameWindow && !gameWindow.closed ) {
		gameWindow.focus();
		gameWindowSpawning = false;
		return false;
	}

	if( gate ) {
		window.location = PATH.siteRoot +'/';
		gameWindowSpawning = false;
		return false;
	}

	if( !swfobject.hasFlashPlayerVersion( '10' ) ) {
		jq( window ).attr( 'location', PATH.siteRoot +'/flash-upgrade/' );
		gameWindowSpawning = false;
		return false;
	}

	disablePopup(activeDiv);
	var winAttr	= [ 'status=0', 'height=687', 'width=996', 'resizable=0', 'toolbar=0', 'menubar=0', 'location=0', 'directories=0', 'scrollbars=1' ];

	gameWindow = window.open( RDR.play, 'game_window', winAttr.join( ',' ) );

	if( !gameWindow ) {
		jq( document.body ).append( '<div id="popup_blocked" style="width: 600px; height: 500px; background: #FFF; z-index: 999999;"><p>your popup was blocked.</p><p>See that bar that appeared at the top up there? Click that and make an exception for this site.</p></div><div id="blk_alpha"></div>' );
		centerPopup( 'popup_blocked' );
		loadPlayButton();
		gameWindowSpawning = false;
		return false;
	} else {
		gameWindow.focus();
	}

	gameWindowSpawning = false;
}

function callRaceCodes(){
	if( moduleSpawning && moduleSpawning != 'raceCodes' ) {
		return false;
	}

	if( !swfobject.hasFlashPlayerVersion( '10' ) ) {
		jq( window ).attr( 'location', PATH.siteRoot +'/flash-upgrade/' );
		return false;
	}

	jq('body').append('<div id="raceCodesDiv"><div id="flashcontent"></div></div><div id="blk_alpha"></div>');
	jq('#raceCodesDiv').css({
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"600px",
			"height":"500px",
			"z-index":"999999"
		});

		centerPopup('raceCodesDiv');
		whichModule = "registration";

		var flashparams = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			bgcolor: "#FFFFFF",
			base: PATH.cdnRoot + '/1.0/swf/race_codes/',
			wmode: 'transparent'
		};
		var attributes = {
			id:"CarsCodeRedeem"
		};

		swfobject.embedSWF( PATH.swf +'/common/DVC_OS.swf', "flashcontent", 600, 500, "10.0.0","http://a.dolimg.com/swf/dcom/expressInstall.swf", RAMP.flashVars, flashparams, attributes );
		moduleSpawning = false;
}

function helpSwitch(){
	if( helpSwitchAnimating ) {
		return false;
	}

	helpSwitchAnimating = true;
	jq('.q_list a').removeClass('selected');
	jq(this).addClass('selected');
	var index = jq('.q_list a').index(this);
	jq('.help_answer_mod p').each(function(i){
		if(i == index){
			jq(this).fadeIn( 400, function(){ helpSwitchAnimating = false; } );
		}else{
			jq(this).hide();
		}
	});
}
function querySt(name) {
	gy = window.location.search.substring(1).split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == name) {
			return ft[1];
		}
  }
}
var errorMsgs = [];
errorMsgs[1] = 'Unautorized';
errorMsgs[2] = 'We were unable to send your feedback please <a href="/help/contact-us/">click here</a> to try again.';
errorMsgs['default'] = 'We\'re sorry, we are having difficulties with your request.';

function goToLogin() {
	exitMod();
	launchGame();
}

function goToPage( page ) {
	if( RDR[page] ) {
		window.location = RDR[page];
	} else {
		return false;
	}
}

/*
function parentRedirect( page, close ){
	eval( 'var URL = typeof( '+ page +' ) == "string" ? '+ page +' : false;' );

	if( URL ) {
		top.window.location = URL;
		top.window.focus();
	}

	if( close == 'true' ) {
		gameWindow.close();
		window.focus();
	}
}
*/

function getUserTech() {
	var userAgent	= navigator.userAgent.toLowerCase();
	var os			= '';
	var osCheck		= {
		mac:	/mac/.test( userAgent ),
		win:	/win/.test( userAgent ),
		ppc:	/ppc/.test( userAgent ),
		xp:		/(nt 5.1|nt 5.2)/.test( userAgent ),
		vista:	/(nt 6.0)/.test( userAgent ),
		win7:	/(nt 6.1)/.test( userAgent )
	};
	var userTech	= [
		'userAgent='+ navigator.userAgent,
		'browser='+ whichBrs(),
		'browserVersion='+ (userAgent.toLowerCase().match( /.+(?:rv|it|ra|ie|me|ox|on)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		'engineVersion='+ jq.browser.version,
		'resolution='+ screen.width +'x'+ screen.height
	];

	if( osCheck.win ) {
		os = 'Windows';
		if( osCheck.xp ) {
			os += ' XP';
		} else if( osCheck.vista ) {
			os += ' Vista';
		} else if( osCheck.win7 ) {
			os += ' 7';
		}
	} else if( osCheck.mac ) {
		os = 'Mac';
	} else if ( osCheck.ppc ) {
		os = 'Power PC';
	}
	userTech.push( 'os='+ os );

	return userTech.join( '|' );
}

function banRedirect( url ) {
	window.location = url;
}

function getSessionID() {
	if( jq.cookie( 'sessionID' ) ) {
		return jq.cookie( 'sessionID' );
	} else {
		return setSessionID();
	}
}

function setSessionID() {
	var date = new Date();
	var sessionID = date.getTime() +'.'+ Math.floor( Math.random() * 10000001 );

	jq.cookie( 'sessionID', sessionID );

	return sessionID;
}