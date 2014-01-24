(function($){

	"use strict";

	$(function(){

		// GLOBAL FUNCTIONS
		window.goHome = function(){
			window.location = 'home.html';
		}

		window.getUrlVars = function() {
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		        vars[key] = value;
		    });
		    return vars;
		}
		
		
		window.checkFBuser = function (){
			var storage = window.localStorage;
			var user_id = storage.getItem('fb_login_id');

			if( user_id == 'not_logged' || !user_id ){
				
				return false;
			}
			// vivecentroFB.loginFacebookUser();
			return true;
		}

		window.postFavorite = function( user_id, a_post ){

			console.log('User: '+ user_id + ' wants to favorite post: '+ a_post );

			return $.getJSON('http://viveelcentro.mx/agregar-favorito/?user_id='+user_id+'&post_id='+a_post, function(data){
					if( !data ) location.reload();
					console.log(data);
				
			});
		
		}

		$('.not_round').buttonMarkup({ corners: false });

		$(document).ready(function(){
				
			if( $('.cycle-gallery').length > 0 ){
				$('.cycle-gallery').cycle({
					slides : 'li',
					fx     : 'scrollHorz',
					pager  : '.cycle-pager',
					swipe  : true
				});
			}
				
				
			
			$('#menu_panel').on('panelbeforeopen', function(e,u){
				console.log('before open');
				e.preventDefault();
				$('.menu_trigger').addClass('open');
				$('.the_header').css('position', 'relative');
				
			})
			.on('panelbeforeclose', function(e,u){
				console.log('before close');
				e.preventDefault();
				$('.the_header').css('position', 'fixed');
				$('.menu_trigger').removeClass('open');
				
				
			});
			
			$('.share').on('click', function(){
				//Desplegar el pop de share
				( !$('.submenu:visible').length > 0 ) ? $('.share').css('background-color' , '#000') : $('.share').css('background-color' , '#EAEAEA');
				$(this).find('.submenu').toggle('fast');
				
			});
			
			var windowHeight =  $(window).height();
			$('#map-canvas').css('height', windowHeight-120);

			// Login with facebook events
			$('#login_fb').on('click', function(){
				vivecentroFB.loginFacebookUser();
				// goHome();
			});

			$('#not_login_fb').on('click', function(){
				vivecentroFB.save_not_logged();
				goHome();
			});

			// Favorite stuff
			$('.favorite').on('click', function(){

				if ( checkFBuser() ){
					var user_id   = window.localStorage.getItem('fb_login_id');
					var this_post = window.localStorage.getItem('this_post_id');

					var result = postFavorite( user_id, this_post );

					result.done(function (response){
						if( response[0] == 'true' ){
							navigator.notification.alert('Agregado a favoritos');
							return;
						}
						navigator.notification.alert('Ya has agregado esta entrada a favoritos');
						return;
					});
					return;
				}
				navigator.notification.alert('Necesitas estas conectado a Facebook para agregar a favoritos');
				
			});
			console.log('termino la carga del functions');

		});

			
	});

	
	

})(jQuery);
