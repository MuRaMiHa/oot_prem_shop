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

changeServerWidget = function(calling, url, template, el){
   if (url && template && el){
      var cookie = getCookie('csw_'+template);
      var el = jQuery('#'+el);
      if (!cookie){
         jQuery.getJSON(url+'?jsoncallback=?', {'template': template, 'calling': calling}, 
            function(data){
               if (template == 'popup') {
                     setCookie('csw_'+template, true, { expires: 31536000, path: '/', domain: getCookieDomain() });
               }
               if (data.msg) {
                  el.html(data.msg).show();
                  if (template == 'popup') {
                     jQuery('.cluster-change-content').center({vertical:true});
                     jQuery("HTML").addClass("scrolllock");
                     var $body = $(this.ie6 ? document.body : document);
                     var $heightpage = $body.height() + 200;
                     $('.cluster-change-overlay-bg').css({height: $heightpage});
                  }
                  else if (template == 'main') el.addClass('bg-server-' + data.flag);
               }
            }
         );
      }
   }
}

getCookieDomain = function(){
   var arr = document.domain.split('.');
   if (arr.length > 2) arr.splice(0,1);

   return '.'+arr.join('.');
}

changeServerSelectBox= function(calling, url, template, el){
   if (url && template && el){
      var el = jQuery('#'+el);
      jQuery.getJSON(url+'?jsoncallback=?', {'template': template, 'calling': calling},
         function(data){
            if (data.msg) {
               el.html(data.msg).show();
               jQuery.jNice.SelectAdd(el.find('select')[0]);
            }
         }
      );
   }
}

jQuery(window).bind('resize', function() {
    $('.cluster-change-content').center({vertical:true});
});

gotoServer = function(el){
    if (el.value) window.location = el.value;
    return false;
}

getCookie = function(c_name){
   if (document.cookie.length>0){
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1){
         c_start=c_start + c_name.length+1;
         c_end=document.cookie.indexOf(";",c_start);
         if (c_end==-1) c_end=document.cookie.length;
         return unescape(document.cookie.substring(c_start,c_end));
      }
   }
   return "";
}

setCookie = function(name, value, props) {
    props = props || {}
    var exp = props.expires
    if (typeof exp == "number" && exp) {
        var d = new Date()
        d.setTime(d.getTime() + exp*1000)
        exp = props.expires = d
    }
    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }
    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value
    for(var propName in props){
        updatedCookie += "; " + propName
        var propValue = props[propName]
        if(propValue !== true){ updatedCookie += "=" + propValue }
    }
    document.cookie = updatedCookie
}


}
/*
     FILE ARCHIVED ON 12:41:57 Jan 16, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:54:25 Sep 30, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 358.967
  exclusion.robots: 0.128
  exclusion.robots.policy: 0.121
  RedisCDXSource: 8.365
  esindex: 0.008
  LoadShardBlock: 331.095 (3)
  PetaboxLoader3.datanode: 315.678 (4)
  CDXLines.iter: 16.817 (3)
  load_resource: 79.515
  PetaboxLoader3.resolve: 39.845
*/