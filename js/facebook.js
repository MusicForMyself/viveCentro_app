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
			auth_public: encodeURI('zHi7M-0mUv5Pe9kN6SV_hifGj6g'),
			user_id: '',
			profile_name: ''
		},
		storage: window.localStorage,
		home_url: 'home.html'
	};

	/**
	 * Get user public profile and user_id
	 *
	 * @method getUser
	 * @return {Boolean} Returns true on success
	 */
	FB_util.getUser = function () {
		
		OAuth.popup('facebook', function(error, result) {
			if( error ) {
				console.log('Hubo un error');
				return false;
			}
			
			result.get('/me').done(function(data) {
				FB_util.Settings.user_id = data.id;
				FB_util.Settings.profile_name = data.username;
				console.log(data.id);
				FB_util.save_logged_data();
				return true;
			});
			
		});	
	};


	/**
	 * Opens dialog to login user 
	 *
	 * @method loginFacebookUser
	 * @return {Boolean} Returns true on success
	 */
	FB_util.loginFacebookUser = function () {
		
		OAuth.popup('facebook', function(error, result) {
			if( error ){
				FB_util.save_not_logged();
				return false;
			}
			FB_util.getUser();
			// FB_util.save_logged_data();  
			return true;
		});	
	};


	/**
	 * Saves the user_id after a facebook login
	 *
	 * @method save_logged_data
	 * @param {Int} useR_id Facebook User ID
	 */
	FB_util.save_logged_data = function(){
		FB_util.storage.setItem('fb_login_id', FB_util.Settings.user_id);
		FB_util.checkLogin( FB_util.home_url, false);
	}

	/**
	 * Saves 'not_logged' if the user cancelled login
	 *
	 * @method save_not_logged
	 */
	FB_util.save_not_logged = function(){
		FB_util.storage.setItem('fb_login_id', 'not_logged');
		FB_util.checkLogin( FB_util.home_url, false);
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
		FB_util.checkLogin( FB_util.home_url, false)
	};

	//Initiate this stuff when device is ready
	document.addEventListener('deviceready', FB_util.init , false);

	//Activate :active state
	document.addEventListener('touchstart', function() {}, false);

})(jQuery);