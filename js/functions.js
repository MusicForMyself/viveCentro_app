(function($){

	"use strict";

	$(function(){


		$('.not_round').buttonMarkup({ corners: false });

		$(document).ready(function(){
			
				$('.cycle-gallery').cycle({
					slides : 'li',
					fx     : 'scrollHorz',
					pager  : '.cycle-pager',
					swipe  : true
				});


			/// FEED ACTIVIDADES //////////////////////////////

			// $('.menu_trigger').on('click', function(){
			// 	if( $('.ui-panel-closed').length > 0 ){
			// 		// Mover boton del menu
			// 		$('.menu_trigger').addClass('open');
			// 		return;
			// 	}
			// 	$('.menu_trigger').removeClass('open');
			// });

			$('#menu_panel').on('panelbeforeopen', function(e,u){
				e.preventDefault();
				$('.menu_trigger').addClass('open');
				$('.the_header').css('position', 'relative');
				console.log('lol catz');
			})
			.on('panelbeforeclose', function(e,u){
				e.preventDefault();
				$('.menu_trigger').removeClass('open');
				console.log('lol catz close');
			});


			
			$('.share').on('click', function(){
				//Desplegar el pop de share
				( !$('.submenu:visible').length > 0 ) ? $('.share').css('background-color' , '#000') : $('.share').css('background-color' , '#EAEAEA');
				$(this).find('.submenu').toggle('fast');
				
			});
			
			var windowHeight =  $(window).height();
			$('#map-canvas').css('height', windowHeight-120);


		});


	});

})(jQuery);
