 $.fn.extend({
   scrollTo: function(x) {
     var obj = $('body,html'),
       top = 0;
     if (x != 'gotop') {
       var obe = $(this) || null;
       try {
         top = obe.offset().top;
         if (Object.prototype.toString.call(x) === '[object Number]') {
           top = top + x
         }
         var padding = $('body').css('padding-top');
         if (padding) {
           padding = parseInt(padding);
           top -= padding;
         }
       } catch (err) {
         return;
       }
     }
     obj.animate({ scrollTop: top });
   }
 })
