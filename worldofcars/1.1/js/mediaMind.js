var MMD = {};

MMD.getSessionID = function() {
	if( jQuery.cookie( 'sessionID' ) ) {
		return jQuery.cookie( 'sessionID' );
	} else {
		return this.setSessionID();
	}
};

MMD.setSessionID = function() {
	var date = new Date();
	var sessionID = date.getTime() +'.'+ Math.floor( Math.random() * 10000001 );

	jQuery.cookie( 'sessionID', sessionID );

	return sessionID;
};