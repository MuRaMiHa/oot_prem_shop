var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

				(function($){
				     $.fn.extend({
				          center: function (options) {
				               var options =  $.extend({ // Default values
				                    inside:window, // element, center into window
				                    transition: 0, // millisecond, transition time
				                    minX:0, // pixel, minimum left element value
				                    minY:0, // pixel, minimum top element value
				                    withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
				                    vertical:true, // booleen, center vertical
				                    horizontal:true // booleen, center horizontal
				               }, options);
				               return this.each(function() {
				                    var props = {position:'absolute'};
				                    if (options.vertical) {
				                         var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
				                         if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
				                         top = (top > options.minY ? top : options.minY);
				                         $.extend(props, {top: top+'px'});
				                    }
				                    if (options.horizontal) {
				                          var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
				                          if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
				                          left = (left > options.minX ? left : options.minX);
				                          $.extend(props, {left: left+'px'});
				                    }
				                    if (options.transition > 0) $(this).animate(props, options.transition);
				                    else $(this).css(props);
				                    return $(this);
				               });
				          }
				     });
				})(jQuery);
				
$(document).ready(function(){


	// text inputs hints
	$(".text_hint[value!=]")
		.each(function(){this.hint=this.value})
		.bind("focus",function(){if(this.hint==this.value){$(this).attr("value","").removeClass("text_hint")}})
		.bind("blur",function(){if(this.value==""){	$(this).attr("value",this.hint).addClass("text_hint")}})
	
	//
	$(".b-gal .b-gal__item").hover(
		function(){$(this).addClass("hover")},
		function(){$(this).removeClass("hover")})
	
	/*
	$('.b-screenshots li').hover(
		function() { $(this).addClass("hover"); },
		function() { $(this).removeClass("hover"); }
	);*/
	
	//video main		

		$('.b-video-block li').hover(
				function() { $(this).addClass("hover"); },
				function() { $(this).removeClass("hover"); }
			);
    
	
	$('.cluster-change-content').center();
	
    $(window).bind('resize', function() {
        $('.cluster-change-content').center({transition:10});
    });
	
});
$(function(){ new changeServerWidget('promo', 'https://web.archive.org/web/20110211234225/http://game.worldoftanks.ru/registration/ajax/change_server_widget/', 'popup', 'cluster-change-overlay'); })


}
/*
     FILE ARCHIVED ON 23:42:25 Feb 11, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 09:14:38 Aug 28, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 0.187
  PetaboxLoader3.resolve: 23.138
  LoadShardBlock: 1473.772 (3)
  esindex: 0.015
  CDXLines.iter: 22.932 (3)
  load_resource: 74.937
  PetaboxLoader3.datanode: 1499.299 (4)
  captures_list: 1502.944
  exclusion.robots: 0.231
  RedisCDXSource: 0.763
*/