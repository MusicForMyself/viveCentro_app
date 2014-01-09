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

			$('.menu_trigger').on('click', function(){
				if( $('.ui-panel-closed').length > 0 ){
					// Mover boton del menu
					$('.menu_trigger').addClass('open');
					return;
				}
				$('.menu_trigger').removeClass('open');
			});
			


		});


	});

})(jQuery);
