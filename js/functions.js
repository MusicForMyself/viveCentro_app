(function($){

	"use strict";

	$(function(){

		var storage = window.localStorage;

		/**
		 * Get the url variables
		 *
		 * @method getUrlVars
		 * @return {Array} vars Returns the GET variables
		 */
		window.getUrlVars = function() {
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		        vars[key] = value;
		    });
		    return vars;
		}


		/**
		 * Add new favorite to the database
		 *
		 * @method postFavorite
		 * @return {Boolean} Returns true on success
		 */
		window.postFavorite = function( user_id, a_post ){

			console.log('User: '+ user_id + ' wants to favorite post: '+ a_post );

			return $.getJSON('http://viveelcentro.mx/agregar-favorito/?user_id='+user_id+'&post_id='+a_post, function(data){
					if( !data ) location.reload();
					console.log(data);
				
			});
		
		}

		/**
		 * Callback function for getArchiveFeed
		 *
		 * @param {String} url API/feed url
		 * @method getSingleCallback
		 * @return {html} Renders the html to the page
		 */
		window.getSingleCallback = function(json){
			console.log(json);
			if( !json ) location.reload();

			$.each(json, function(key, value){
				
				value.imagenes = ( value.imagenes === 'http://viveelcentro.mx/wp-includes/images/crystal/default.png' ) ? 'images/noimg.jpg' : value.imagenes;

				$('.map_link').attr( 'href', 'map.html?id='+value.ID );

				//Content Recorrido
				$('.recorrido_single').append(
					'<img src="'+value.imagenes+'" alt="'+value.autor+'"> <div class="info_container"> <h3>'+value.titulo+'</h3> <h4>'+value.autor+'</h4> <p>'+value.contenido+'</p> </div>'); 

				lugares_array = value.lugares;
				// console.log(value.lugares[0].ID);
				
				lugares_array_JSON = JSON.stringify( lugares_array );
				storage.setItem('this_post_id', this_recorrido);
				
				var lugares_html =[];

				for( i = 0; i< lugares_array.length; i++ ){


					this_object = lugares_array[i];

					image_url = this_object.imagen_lugar;
					title     = this_object.lugar;
					lugar_id  = this_object.ID;

					// var title_parts = title.split("<!--:-->");

					// title = title_parts[1].substring(10);

					if( image_url == 'http://viveelcentro.mx/wp-includes/images/crystal/default.png' ){
						image_url = 'images/noimg.jpg'
					}
					var this_recorrido = value.ID,
						this_descripcion = i;

					lugares_html += '<article class="each_lugar" data-role="none"> <a href="lugar-single.html?id='+lugar_id+'&recorrido='+this_recorrido+'&descripcion='+this_descripcion+'" rel="external"> <img src="'+image_url+'" alt="'+title+'"> <div class="info_container"> <h3>'+title+'</h3></div></a></article>';
				}

				//Lugares del recorrido
				$('.lugares_container').append( lugares_html ); 
				var storage = window.localStorage;

				storage.removeItem('local_lugares_array' );
				storage.setItem('local_lugares_array', lugares_array_JSON );
			});		
		}

		/**
		 * Callback function for getArchiveFeed
		 *
		 * @param {String} url API/feed url
		 * @method getArchiveCallback
		 * @return {html} Renders the html to the page
		 */
		window.getArchiveCallback = function(json){
			
			if( !json ) location.reload();
			$.each(json, function(key, value){

				value.imagenes = ( value.imagenes === 'http://viveelcentro.mx/wp-includes/images/crystal/default.png' ) ? 'images/noimg.jpg' : value.imagenes;

			$('.lugares_container').append('<article class="each_lugar" data-role="none"><a href="lugar-single.html?id='+value.ID+'" rel="external"> <img src="'+value.imagenes+'" alt="'+value.titulo+'"> <div class="info_container"> <h3>'+value.titulo+'</h3> </div> </a> </article>'); });		
		}


		window.function_caller = function(a_function, json){
			a_function(json);
		}

		/**
		 * Gets the archive feed of a given post-type
		 *
		 * @param {String} url API/feed url
		 * @method getArchiveFeed
		 * @return {json} Returns json object containing posts
		 */
		window.getFeed = function( url, callback ){
			
			$.getJSON(url)
			  .done(function(json){
  
			  	function_caller(callback, json);
			  });
		}


		$(document).ready(function(){

			/**
			 * Facebook login actions
			 */
			$('#login_fb').on('click', function(){
				FB_util.loginFacebookUser();
			});

			$('#not_login_fb').on('click', function(){
				FB_util.save_not_logged();
			});


			/**
			 * Favorites actions
			 */
			$('.favorite').on('click', function(){

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
				
				navigator.notification.alert('Necesitas estas conectado a Facebook para agregar a favoritos');
				
			});

			/**
			 * Sharing actions
			 */
			$('.share').on('click', function(){
				//Desplegar el pop de share
				( !$('.submenu:visible').length > 0 ) ? $('.share').css('background-color' , '#000') : $('.share').css('background-color' , '#EAEAEA');
				$(this).find('.submenu').toggle('fast');
				
			});

			/**
			 * Cycle init
			 */
			if( $('.cycle-gallery').length > 0 ){
				$('.cycle-gallery').cycle({
					slides : 'li',
					fx     : 'scrollHorz',
					pager  : '.cycle-pager',
					swipe  : true
				});
			}
				
			/**
			 * Side panel actions
			 */
			$('#menu_panel').on('panelbeforeopen', function(e,u){
				e.preventDefault();
				$("html, body").animate({ scrollTop : '0px' }, 'fast');
				$('html, body').on( "touchmove", false);
				$('.menu_trigger').addClass('open');
				$('.the_header').css({
					'position' : 'relative',
					'top' : 0,
					'left' : 0,
				});
				
			})
			.on('panelbeforeclose', function(e,u){
				e.preventDefault();
				$('html, body').off( "touchmove");
				$('.the_header').css('position', 'fixed');
				$('.menu_trigger').removeClass('open');
				
			});
			
			/**
			 * Style @Overrides
			 */
			$('.not_round').buttonMarkup({ corners: false });
			var is_user_id = window.localStorage.getItem('fb_login_id');
			if( is_user_id === 'not_logged' ){
				$('.only_users').addClass('ui-disabled');
			}

			var windowHeight =  $(window).height();
			$('#map-canvas').css('height', windowHeight-120);


		});

			
	});
	

})(jQuery);
