package com.disney.disneyxd.hud
{
	import com.disney.base.*;
	
	import flash.utils.*;
	
	/**
	*   A string table
	*   @author StringTableCreator- automatically generated, do not edit
	*/
	public class HudStringTable extends BaseObject
	{
		public var LOGIN_CAPS:String;
		public var REGISTER_CAPS:String;
		public var USERNAME_CAPS:String;
		public var PASSWORD_CAPS:String;
		public var SUBMIT_CAPS:String;
		public var REGISTRATION_COPY:String;
		public var COMMUNITY:String;
		public var MY_PAGE:String;
		public var PLAYER_LOBBY:String;
		public var ADVENTURES:String;
		public var MY_FRIENDS:String;
		public var FAVORITES:String;
		public var REWARDS:String;
		public var CHAT_WITH_ME:String;
		public var VIEW_MY_PROFILE:String;
		public var XD_POINTS:String;
		public var TROPHIES:String;
		public var TRUE_FRIEND_MAKER:String;
		public var ADD_ME_AS_A_FRIEND:String;
		public var YOU_JUST_GOT_A_NEW_REWARD:String;
		public var CLICK_HERE_TO_SEE_YOUR_REWARD:String;
		public var JOIN_NOW:String;
		public var DETAILS:String;
		public var ALL:String;
		public var MINE:String;
		public var DONE:String;
		public var LIFETIME_POINTS:String;
		public var PROFILE_CAPS:String;
		public var LOGOUT_CANCEL_CAPS:String;
		public var LOGOUT_YES_CAPS:String;
		public var ARE_YOU_SURE:String;
		public var DAYS_LEFT:String;
		public var REWARDS_EARNED:String;
		public var EDIT_MY_AVATAR:String;
		public var OK:String;
		public var REG_IN_PROGRESS_1:String;
		public var REG_IN_PROGRESS_2:String;
		public var REG_IN_PROGRESS_3:String;
		public var REG_IN_PROGRESS_4:String;
		public var REG_APPROVED_2:String;
		public var REG_APPROVED_3:String;
		public var REG_APPROVED_4:String;
		public var REG_DENIED_1:String;
		public var REG_DENIED_2:String;
		public var LOGIN_FAILED:String;
		public var ACCEPT_FRIEND_REQUEST:String;
		public var DECLINE_FRIEND_REQUEST:String;
		public var WELCOME_BACK:String;
		
		public function HudStringTable(bytes:ByteArray)
		{
			assert(bytes != null && bytes.length != 0, "No bytes to make string table from")
			bytes.position = 0;
			
			var lines:Array = bytes.readMultiByte(bytes.length, "unicode").replace(/\r/g, "").split("\n");
			assert(lines.length >= 48, "Expected at least 48 lines, got " + lines.length);
			LOGIN_CAPS = lines[0];
			REGISTER_CAPS = lines[1];
			USERNAME_CAPS = lines[2];
			PASSWORD_CAPS = lines[3];
			SUBMIT_CAPS = lines[4];
			REGISTRATION_COPY = lines[5];
			COMMUNITY = lines[6];
			MY_PAGE = lines[7];
			PLAYER_LOBBY = lines[8];
			ADVENTURES = lines[9];
			MY_FRIENDS = lines[10];
			FAVORITES = lines[11];
			REWARDS = lines[12];
			CHAT_WITH_ME = lines[13];
			VIEW_MY_PROFILE = lines[14];
			XD_POINTS = lines[15];
			TROPHIES = lines[16];
			TRUE_FRIEND_MAKER = lines[17];
			ADD_ME_AS_A_FRIEND = lines[18];
			YOU_JUST_GOT_A_NEW_REWARD = lines[19];
			CLICK_HERE_TO_SEE_YOUR_REWARD = lines[20];
			JOIN_NOW = lines[21];
			DETAILS = lines[22];
			ALL = lines[23];
			MINE = lines[24];
			DONE = lines[25];
			LIFETIME_POINTS = lines[26];
			PROFILE_CAPS = lines[27];
			LOGOUT_CANCEL_CAPS = lines[28];
			LOGOUT_YES_CAPS = lines[29];
			ARE_YOU_SURE = lines[30];
			DAYS_LEFT = lines[31];
			REWARDS_EARNED = lines[32];
			EDIT_MY_AVATAR = lines[33];
			OK = lines[34];
			REG_IN_PROGRESS_1 = lines[35];
			REG_IN_PROGRESS_2 = lines[36];
			REG_IN_PROGRESS_3 = lines[37];
			REG_IN_PROGRESS_4 = lines[38];
			REG_APPROVED_2 = lines[39];
			REG_APPROVED_3 = lines[40];
			REG_APPROVED_4 = lines[41];
			REG_DENIED_1 = lines[42];
			REG_DENIED_2 = lines[43];
			LOGIN_FAILED = lines[44];
			ACCEPT_FRIEND_REQUEST = lines[45];
			DECLINE_FRIEND_REQUEST = lines[46];
			WELCOME_BACK = lines[47];
		}
	}
}
