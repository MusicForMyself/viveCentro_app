(function($){

	"use strict";

	$(function(){


		$('.not_round').buttonMarkup({ corners: false });

		$(document).ready(function(){
			setTimeout(function(){
				$('.cycle-gallery').cycle({
					slides : 'li',
					fx     : 'scrollHorz',
					pager  : '.cycle-pager',
					swipe  : true
				});
				// console.log('lol');
			}, 1000);
			

			/// FEED ACTIVIDADES //////////////////////////////

			

			

			




		});


	});

})(jQuery);
