/**************************************************
	  __                _                 _
	 / _| __ _  ___ ___| |__   ___   ___ | | __
	| |_ / _` |/ __/ _ \ '_ \ / _ \ / _ \| |/ /
	|  _| (_| | (_|  __/ |_) | (_) | (_) |   <
	|_|  \__,_|\___\___|_.__/ \___/ \___/|_|\_\

	Author: John Falcon
	Description: Helper library to achieve Facebook login with Oauth.io
	Requires: oauth.js

 **************************************************/



(function($){

	"use strict";

	window.FB_util = {
		Settings: {
			auth_public: 'zHi7M-0mUv5Pe9kN6SV_hifGj6g'
		},
		storage: window.localStorage
	};


	/**
	 * Checks if the user has authorized the app and is logged in 
	 * then it redirects to a URL
	 *
	 * @method checkLogin
	 * @param {String} url Callback url
	 * @param {Boolean} [force=false] Force login to redirect
	 * @return {Boolean} Returns true on success
	 */
	FB_util.loginFacebookUser = function () {

		console.log('entro al loginFacebookUser');
		
		OAuth.popup('facebook', function(error, result) {
			if( error ){
				save_not_logged();
				return false;
			}
			FB_util.save_logged_data( result.id );
			return true;
		});	
	};

	/**
	 * Saves the user_id after a facebook login
	 *
	 * @method save_logged_data
	 * @param {Int} useR_id Facebook User ID
	 */
	FB_util.save_logged_data = function(user_id){
		FB_util.storage.setItem('fb_login_id', user_id);
	}

	/**
	 * Saves 'not_logged' if the user cancelled login
	 *
	 * @method save_not_logged
	 */
	FB_util.save_not_logged = function(){
		FB_util.storage.setItem('fb_login_id', 'not_logged');
	}


	/**
	 * Checks if the user has authorized the app and is logged in 
	 * then it redirects to a URL
	 *
	 * @method checkLogin
	 * @param {String} url Callback url
	 * @param {Boolean} [force=false] Force login to redirect
	 * @return {Boolean} Returns true on success
	 */
	FB_util.checkLogin = function(url, force){

		var login_id = FB_util.storage.getItem('fb_login_id');
		
		if( login_id ){
			console.log('Hay login id');
			window.location = url;
			return true;
		}
		//Do something if user is not logged in
		//
	};

	/*
	 * Oauth init 
	 *
	 * @method init
	 */
	FB_util.init = function () {
		console.log('Inicializando Oauth');
		OAuth.initialize(FB_util.Settings.auth_public);
		FB_util.checkLogin('home.html', false)
	};

	//Initiate this stuff when device is ready
	document.addEventListener('deviceready', FB_util.init , false);

	//Activate :active state
	document.addEventListener('touchstart', function() {}, false);

})(jQuery);