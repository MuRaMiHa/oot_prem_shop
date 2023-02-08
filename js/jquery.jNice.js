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

/*
 * jNice
 * version: 1.0 (11.26.08)
 * by Sean Mooney (sean@whitespace-creative.com) 
 * Examples at: http://www.whitespace-creative.com/jquery/jnice/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * To Use: place in the head 
 *  <link href="inc/style/jNice.css" rel="stylesheet" type="text/css" />
 *  <script type="text/javascript" src="inc/js/jquery.jNice.js"></script>
 *
 * And apply the jNice class to the form you want to style
 *
 * To Do: Add textareas, Add File upload
 *
 ******************************************** */
(function($){
	$.fn.jNice = function(options){
		var self = this;
		var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */
		/* Apply document listener */
		$(document).mousedown(checkExternalClick);
		/* each form */
		return this.each(function(){
			$('input:submit, input:reset, input:button', this).each(ButtonAdd);
			$('button').focus(function(){ $(this).addClass('jNiceFocus')}).blur(function(){ $(this).removeClass('jNiceFocus')});
			$('input:text:visible, input:password', this).each(TextAdd);
			/* If this is safari we need to add an extra class */
			if (safari){$('.jNiceInputWrapper').each(function(){$(this).addClass('jNiceSafari').find('input').css('width', $(this).width()+11);});}
			$('input:checkbox', this).each(CheckAdd);
			$('input:radio', this).each(RadioAdd);
			$('select', this).each(function(index){ SelectAdd(this, index); });
			/* Add a new handler for the reset action */
			$(this).bind('reset',function(){var action = function(){ Reset(this); }; window.setTimeout(action, 10); });
			$('.jNiceHidden').css({opacity:0});
		});		
	};/* End the Plugin */

	var Reset = function(form){
		var sel;
		$('.jNiceSelectWrapper select', form).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
		$('a.jNiceCheckbox, a.jNiceRadio', form).removeClass('jNiceChecked');
		$('input:checkbox, input:radio', form).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jNiceChecked');}});
	};

	var RadioAdd = function(){
		var $input = $(this).addClass('jNiceHidden').wrap('<span class="jRadioWrapper jNiceWrapper"></span>');
		var $wrapper = $input.parent();
		var $a = $('<span class="jNiceRadio"></span>');
		$wrapper.prepend($a);
		/* Click Handler */
		$a.click(function(){
				var $input = $(this).addClass('jNiceChecked').siblings('input').attr('checked',true);
				/* uncheck all others of same name */
				$('input:radio[name="'+ $input.attr('name') +'"]').not($input).each(function(){
					$(this).attr('checked',false).siblings('.jNiceRadio').removeClass('jNiceChecked');
				});
				return false;
		});
		$input.click(function(){
			if(this.checked){
				var $input = $(this).siblings('.jNiceRadio').addClass('jNiceChecked').end();
				/* uncheck all others of same name */
				$('input:radio[name="'+ $input.attr('name') +'"]').not($input).each(function(){
					$(this).attr('checked',false).siblings('.jNiceRadio').removeClass('jNiceChecked');
				});
			}
		}).focus(function(){ $a.addClass('jNiceFocus'); }).blur(function(){ $a.removeClass('jNiceFocus'); });

		/* set the default state */
		if (this.checked){ $a.addClass('jNiceChecked'); }
	};

	var CheckAdd = function(){
		var $input = $(this).addClass('jNiceHiddenCheckbox').wrap('<span class="jNiceWrapper"></span>');
		var $wrapper = $input.parent().append('<span class="jNiceCheckbox"></span>');
		
		/* Click Handler */
		var $a = $wrapper.find('.jNiceCheckbox').click(function(){
				var $a = $(this);
				var input = $a.siblings('input')[0];
				if (input.checked===true){
					input.checked = false;
					$a.removeClass('jNiceChecked');
				}
				else {
					input.checked = true;
					$a.addClass('jNiceChecked');
				}
				return false;
		});


		$input.click(function(){
			if(this.checked){ $a.addClass('jNiceChecked'); 	}
			else { $a.removeClass('jNiceChecked'); }
		}).focus(function(){ $a.addClass('jNiceFocus'); }).blur(function(){ $a.removeClass('jNiceFocus'); });
		
		/* set the default state */
		if (this.checked){$('.jNiceCheckbox', $wrapper).addClass('jNiceChecked');}
	};

	var TextAdd = function(){
		var $input = $(this).addClass('jNiceInput').wrap('<div class="jNiceInputWrapper"><div class="jNiceInputInner"></div></div>');
		var $wrapper = $input.parents('.jNiceInputWrapper');
		$input.focus(function(){ 
			$wrapper.addClass('jNiceInputWrapper_hover');
		}).blur(function(){
			$wrapper.removeClass('jNiceInputWrapper_hover');
		});
	};

	var ButtonAdd = function(){
		var value = $(this).attr('value');
		$(this).replaceWith('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +'" value="'+ value +'"><span><span>'+ value +'</span></span>');
	};

	/* Hide all open selects */
	var SelectHide = function(){
			$('.jNiceSelectWrapper ul:visible').hide();
			$('.jNiceSelectWrapper').parents(".jNiceWrapper").css("z-index","100");
			$('.jNiceSelectWrapper').parents(".jNiceWrapper").parents().filter('dd').removeAttr("style");
	};

	/* Check for an external click */
	var checkExternalClick = function(event) {
		if ($(event.target).parents('.jNiceSelectWrapper').length === 0) { SelectHide(); }
	};

	var SelectAdd = function(element, index){
		var $select = $(element);
		index = index || $select.css('zIndex')*1;
		index = (index) ? index : 0;
		/* First thing we do is Wrap it */
		$select.wrap($('<div class="jNiceWrapper"></div>').css({zIndex: 100-index}));
		var width = $select.width();
		$select.addClass('jNiceHidden').after('<div class="jNiceSelectWrapper"><div><span class="jNiceSelectText"></span><span class="jNiceSelectOpen"></span></div><ul></ul></div>');
		var $wrapper = $(element).siblings('.jNiceSelectWrapper').css({width: width +'px'});
		$('.jNiceSelectText, .jNiceSelectWrapper ul', $wrapper).width( width - $('.jNiceSelectOpen', $wrapper).width());
		/* IF IE 6 */
		if ($.browser.msie && jQuery.browser.version < 7) {
			$select.after($('<iframe src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" tabIndex="-1" frameborder="0"></iframe>').css({ height: $select.height()+4 +'px' }));
		}
		/* Now we add the options */
		SelectUpdate(element);
		/* Apply the click handler to the Open */
		$('div', $wrapper).click(function(){
			var $ul = $(this).siblings('ul');
			if ($ul.css('display')=='none'){ 
				SelectHide();
				$(this).parents(".jNiceWrapper").css("z-index","101");
				$(this).parents(".jNiceWrapper").parents().filter('dd').css("z-index","101");
			} /* Check if box is already open to still allow toggle, but close all other selects */
			else {
				$(this).parents(".jNiceWrapper").css("z-index","100");
				$(this).parents(".jNiceWrapper").parents().filter('dd').removeAttr("style");
				}
			$ul.toggle();
			//var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top); 
			//$ul.scrollTop = offSet;
			return false;
		});
		/* Add the key listener */
		$select.keydown(function(e){
			var selectedIndex = this.selectedIndex;
			switch(e.keyCode){
				case 40: /* Down */
					if (selectedIndex < this.options.length - 1){ selectedIndex+=1; }
					break;
				case 38: /* Up */
					if (selectedIndex > 0){ selectedIndex-=1; }
					break;
				default:
					return;
					break;
			}
			$('ul a', $wrapper).removeClass('selected').eq(selectedIndex).addClass('selected');
			$('span:eq(0)', $wrapper).html($('option:eq('+ selectedIndex +')', $select).attr('selected', 'selected').text());
			return false;
		}).focus(function(){ $wrapper.addClass('jNiceFocus'); }).blur(function(){ $wrapper.removeClass('jNiceFocus'); });
	};

	var SelectUpdate = function(element){
		var $select = $(element);
		var $wrapper = $select.siblings('.jNiceSelectWrapper');
		var $ul = $wrapper.find('ul').find('li').remove().end().hide();
		
		var $optgroup = $('optgroup', $select);
		var $optgroup_make = false;
		var $optgroup_select_index = 0;
		$($optgroup).each(function(i){
			$ul.append('<li class="option-group">'+ this.label +'</li>');
			$optgroup_make = true;
			$('option', this).each(function(i){
				$ul.append('<li class="option-group-item"><a href="javascript: void(0);" index="'+ $optgroup_select_index +'">'+ this.text +'</a></li>');
				$optgroup_select_index = $optgroup_select_index + 1;
			});
		});
		
		if ($optgroup_make==false){
			$('option', $select).each(function(i){
				$ul.append('<li><a href="javascript: void(0);" index="'+ i +'"><i class="'+ $(this).attr("class") +'"></i>'+ this.text +'</a></li>');
			});
		}
		/* Add click handler to the a */
		$ul.find('a').click(function(){
			$('a.selected', $wrapper).removeClass('selected');
			$(this).addClass('selected');	
			/* Fire the onchange event */
			if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
			$select[0].selectedIndex = $(this).attr('index');
			$('span:eq(0)', $wrapper).html($(this).html());
			$ul.hide();
			return false;
		});
		/* Set the defalut */
		$('a:eq('+ $select[0].selectedIndex +')', $ul).click();
	};

	var SelectRemove = function(element){
		var zIndex = $(element).siblings('.jNiceSelectWrapper').css('zIndex');
		$(element).css({zIndex: zIndex}).removeClass('jNiceHidden');
		$(element).siblings('.jNiceSelectWrapper').remove();
	};

	/* Utilities */
	$.jNice = {
			SelectAdd : function(element, index){ 	SelectAdd(element, index); },
			SelectRemove : function(element){ SelectRemove(element); },
			SelectUpdate : function(element){ SelectUpdate(element); }
	};/* End Utilities */

	/* Automatically apply to any forms with class jNice */
	$(function(){$('.jNice').jNice();});
	
})(jQuery);



}
/*
     FILE ARCHIVED ON 12:41:53 Jan 16, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:54:21 Sep 30, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 105.465
  exclusion.robots: 0.095
  exclusion.robots.policy: 0.085
  RedisCDXSource: 3.021
  esindex: 0.006
  LoadShardBlock: 77.474 (3)
  PetaboxLoader3.datanode: 75.891 (4)
  CDXLines.iter: 21.545 (3)
  load_resource: 124.581
  PetaboxLoader3.resolve: 48.954
*/