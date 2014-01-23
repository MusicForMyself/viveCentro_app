/**************************************************
	  __                _                 _
	 / _| __ _  ___ ___| |__   ___   ___ | | __
	| |_ / _` |/ __/ _ \ '_ \ / _ \ / _ \| |/ /
	|  _| (_| | (_|  __/ |_) | (_) | (_) |   <
	|_|  \__,_|\___\___|_.__/ \___/ \___/|_|\_\

 **************************************************/



(function($){

	"use strict";

	$(function(){


		window.vivecentroFB = {
			Settings: {
				appId: '348321661974739',
				oauth : true
			},
			Scope: { scope: 'email, publish_actions' },
			Friends: {},
			MoreFirends: [],
			countFriends: 0
		};



	// INTEGRACION API FACEBOOK //////////////////////////////////////////////////////////



		$.ajaxSetup({ cache: true }); // Set default values for future Ajax requests.


		vivecentroFB.loginCallback = function (response) {
			
			if (response.status === 'connected') {
				
				$('body').removeClass('no-facebook');
				vivecentroFB.save_login_data();
			} else if (response.status == 'not_authorized') {
				
				$('body').addClass('no-facebook');
				vivecentroFB.save_not_logged();

			}
		};


		vivecentroFB.loginFacebookUser = function (){
			FB.login( vivecentroFB.loginCallback, vivecentroFB.Scope );

		};


		vivecentroFB.getUserProfilePicture = function (friend) {


			FB.api("/"+friend.facebook_id+"/?fields=name,username,picture",  function (response) {

				var userName     = response.name,
					profileUrl   = 'https://www.facebook.com/'+response.username,
					coverPicture = response.picture.data.url;

				var link = $('<a></a>',{
					href: profileUrl,
					title: userName,
					target: '_blank'
				});

				$('<img />',{
					src: coverPicture,
					class: 'user'
				}).appendTo(link);

				link.appendTo('.usuarios');

			});
		};

		// Functions
		vivecentroFB.save_login_data = function () {
			FB.api('/me', function(response) {
    
				var storage = window.localStorage;
				var user_ID = response.id;
				storage.setItem('fb_login_id', user_ID );
				
				console.log('Good to see you, ' + response.name + '.');
				if( typeof(on_index)!== 'undefined' && window.localStorage.getItem('fb_login_id') ){
					goHome();
				}
			});
		}

		vivecentroFB.save_not_logged = function(){
			var storage = window.localStorage;
			var user_ID = 'not_logged';
			storage.setItem('fb_login_id', user_ID );
		}


		vivecentroFB.addHiddenFriend = function (friend) {
			FB.api("/"+friend.facebook_id+"/?fields=name,username,picture",  function (response) {

				var userName     = response.name,
					profileUrl   = 'https://www.facebook.com/'+response.username,
					coverPicture = response.picture.data.url;

				vivecentroFB.MoreFirends.push({
					name: userName,
					url: profileUrl,
					picture: coverPicture
				});

			});
		};


		vivecentroFB.checkFriendsPosts = function (friends, post_id){

			$.get(ajax_url, {
				friends: friends,
				post_id: post_id,
				action: 'get_friends_posts'
			}, 'json')

			.done(function (data) {

				var json = JSON.parse(data);

				if( json.length > 0){
					$('.loading').show();
					$('.leyeron').show();
				}

				$.each(json, function (index, friend) {
					if ( ++vivecentroFB.countFriends > 5 ) {
						$('#more_friends').show();
						vivecentroFB.addHiddenFriend( friend );
					} else {
						vivecentroFB.getUserProfilePicture( friend );
					}


				});

			});
		};


		vivecentroFB.showFiendsWhoReadThisPost = function (friends, post_id) {

			var countFriends = friends.length;

			if( countFriends > 100 ){
				var friendChunks = json_split(friends, 100);
				$.each(friendChunks, function (index, chunk) {
					vivecentroFB.checkFriendsPosts(chunk, post_id);
				});
			} else {
				vivecentroFB.checkFriendsPosts(friends, post_id);
			}

		};


		vivecentroFB.getUserFriends = function(){
			FB.api('/me/friends',function(response) {
				if( ! response.data) {
					return false;
				}

				vivecentroFB.Friends = $.map(response.data, function (friend, index) {
					return friend.id;
				});
				vivecentroFB.showFiendsWhoReadThisPost(
					vivecentroFB.Friends,
					$('.titulo_single').data('post_id')
				);
			});
		};


		vivecentroFB.getLoginStatusCallback = function (response){
			
			if (response.status === 'connected') { // mostrar contenido exclusivo para usuarios que autorizaron
				
				console.log('esta conectao');
				if( typeof(on_index)!== 'undefined' && window.localStorage.getItem('fb_login_id') ){
					goHome();
				}
				$('body').removeClass('no-facebook');
			} else {

				console.log('esta desconectao');
				$('body').addClass('no-facebook');
			}
		};


		vivecentroFB.init = function () {
			$.getScript(
				'https://connect.facebook.net/es_ES/all.js'
			).done(function () {
				FB.init( vivecentroFB.Settings );
				FB.getLoginStatus( vivecentroFB.getLoginStatusCallback );
			});
		};


		$(document).ready(function(){
			vivecentroFB.init();
		});

		

	});

})(jQuery);