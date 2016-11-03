(function () {
   /*
    * select plugin, 2016
    *
    */

   (function(w, $) {

     var pluginName = "select",
       initSelector = ".select select",
       omitSelector = "",
       cl = {
         select: "custom-" + pluginName,
         text: "label-text",
         btn: "btn-" + pluginName
       };

     $.fn[pluginName] = function() {

       return this.each(function() {
         var $s = $(this),
           $sc = $s.attr('class'),
           $p = $s.parent().addClass(cl.select).addClass($sc);
         $s.removeAttr('class')

         /* check if opacity value matches what's in the CSS to limit the
          * enhancement to browsers that support opacity in the same way
          * (otherwise the select may only partially enhance and be unusable) */

         // Note that jQuery polyfills opacity in IE8
         if ($s.css("opacity") >= 0.001) {
           var $l = $s.prev().addClass(cl.text),
             getSelectValue = function() {
               if($s[0].options.length>0){
                 var $index = $s[0].selectedIndex;
                 if($index<0){$index=0}
                 return $s[0].options[$index].innerHTML;
               }else{
                 return "";
               }
             },
             $btn = $("<span class='" + cl.btn + "'>" + getSelectValue() + "</span>");

           $s
             .before($btn)
             .on("change", function() {
               $btn.html(getSelectValue());
             })
             // .on("focus", function() {
             //   $p.addClass("btn-focus");
             // })
             // .on("blur", function() {
             //   $p.removeClass("btn-focus");
             // });

         } else {
           $s.css("opacity", "1");
         };
       });
     };

     // auto-init
     $(function() {
       // $(initSelector)[pluginName]();
     });

   }(undefined, jQuery));

   ;(function(){
     $(function(){
       $('[tip]').each(function(){
         $(this).html('?').on('mouseenter',function(){
           $(this).html('?<span class=tip-content>'+ $(this).attr('tip') +'</span>').find('.tip-content').css({'left':($(this).offset().left) - ($(this).find('.tip-content').width()/2)+2,'top':$(this).offset().top-($(this).find('.tip-content').height())-12})
         })
       })
     })
   })()

   $.fn.extend({
     banner: function() {
       var banners = $(this);
       banners.each(function() {
         var $banner = $(this);
         var $items = $banner.find('.banner-item');
         var $length = $items.length;
         var $imgs = $banner.find('.banner-item-img');
         var $texts = $banner.find('.banner-item-text');
         var $textsInner = $texts.find('.banner-item-text-inner');
         var $ctrl = $banner.find(".ctrl");
         var $ctrls = $banner.find('.ctrl-i');
         var $navsPrev = $banner.find('.navs-prev');
         var $navsNext = $banner.find('.navs-next');
         var $index = new Array($length);
         var $start = 0;
         var $time = 5000; //切换时间
         var $animateTime = 1000;
         var $animateDelay = 600;
         var $ctrlW = $ctrl.width();
         var $ctrlsOneW = $ctrls.first().outerWidth(true);
         var $ctrlN = Math.round($ctrlW / $ctrlsOneW);
         var $ctrlsF = $ctrls.first();
         var $nums = $banner.find('.nums');
         var $tid;

         function init() {
           autoIndex($start);

           $imgs.css('opacity', 0);
           $texts.css({ 'opacity': 0 });
           $textsInner.css({ 'width': 0 });

           $imgs.eq($start).animate({ 'opacity': 1 }, 1500)
           $texts.eq($start).animate({ 'opacity': 1 }, 1500)
           $textsInner.eq($start).delay($animateDelay).animate({ 'width': '100%' }, 1500);

           $items.eq($start).addClass('now')
           $ctrls.eq($start).addClass('now');

         }

         function autoIndex(index) {
           index = index % $length

           if (index < 0) {
             index = $length + index;
           }
           $index.pop()
           $index.unshift(index);
           $start = index;
         }

         function switchBannerOfIndex() {
           $items.eq($index[0]).addClass('now');

           $imgs.eq($index[1]).stop().animate({
             opacity: 0
           }, $animateTime, function() {
             $items.eq($index[1]).removeClass('now')
           });

           $imgs.eq($index[0]).stop().animate({
             opacity: 1
           }, $animateTime);

           $texts.eq($index[1]).stop().css({ 'opacity': 0 })
           $texts.eq($index[0]).addClass('now').stop().animate({
             opacity: 1
           }, $animateTime);

           $texts.eq($index[1]).stop().css({ 'opacity': 0 })
           $texts.eq($index[0]).addClass('now').stop().animate({
             opacity: 1
           }, $animateTime);

           $textsInner.eq($index[1]).stop().css({ 'width': 0 })
           $textsInner.eq($index[0]).addClass('now').stop().delay($animateDelay).animate({
             width: '100%'
           }, $animateTime);

           $ctrls.eq($index[1]).removeClass('now');
           $ctrls.eq($index[0]).addClass('now');

         }

         function switchBanner(str) {
           switch (str) {
             case "next":
               autoIndex(++$start)
               switchBannerOfIndex();
               break;
             case "prev":
               autoIndex(--$start)
               switchBannerOfIndex();
               break;
             default:
               autoIndex(str)
               switchBannerOfIndex()
               break;
           }
           if ($banner.hasClass("banner-preview")) {
             checkboxPreview()
           }
         }

         function checkboxPreview() {
           var nowCtrl = $ctrls.eq($start)
           var page = Math.floor($start / $ctrlN);
           $ctrlsF.animate({
             "margin-left": $ctrlW * page * -1
           })
           $nums.text(parseInt($start) + 1 + "/" + $ctrls.length)
         }

         function auto() {
           $tid = setInterval(function() {
             switchBanner('next')
           }, $time)

         }
         $banner.on('mouseenter', function() {
           clearInterval($tid)
         })
         $banner.on('mouseleave', function() {
           auto()
         })

         $ctrls.on('click', function() {
           switchBanner($(this).index())
         })
         $navsPrev.on('click', function() {
           switchBanner("prev")
         })
         $navsNext.on('click', function() {
           switchBanner("next")
         })



         init();
         auto()

       })
     }
   })

   $.fn.extend({
     scrollHook: function(callback) {
       var hooks = $(this);
       var timeStart = new Date();
       var timeEnd;
       var timeInterval = 10;
       var scrollStart = $(window).scrollTop();
       var scrollEnd = $(window).scrollTop();
       var screenW = $(window).width();
       var screenH = $(window).height();
       var animateDelayPX = 100;

       $(document).on('ready scroll', function(event) {

         timeEnd = new Date();
         if (event.type == 'ready') {
           timeEnd = timeStart.getTime() + timeInterval;

           hooks.each(function() {
             if (!$(this).hasClass('each-animation')) {
               $(this).addClass('have-animation');
             }
           })
         }

         if (timeEnd - timeStart >= timeInterval) {
           // 滚动事件执行
           timeStart = timeEnd;
           scrollEnd = $(window).scrollTop();

           hooks.each(function() {
             if (scrollEnd > $(this).offset().top - screenH + animateDelayPX) {
               if ($(this).hasClass('each-animation')) {
                 $(this).addClass('now-each-animation')
               } else {
                 $(this).addClass('have-animation now-animation')
               }

             }
             callback && callback($(this))
           });
         }
       })
     }
   })

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

   /**
    
    @Name : layDate v1.1 日期控件
    @Author: 贤心
    @Date: 2014-06-25
    @QQ群：176047195
    @Site：http://sentsin.com/layui/laydate
    
    */

   ;!function(win){

   //全局配置，如果采用默认均不需要改动
   var config =  {
       path: '', //laydate所在路径
       defSkin: 'mj', //初始化皮肤
       format: 'YYYY-MM-DD', //日期格式
       min: '1900-01-01 00:00:00', //最小日期
       max: '2099-12-31 23:59:59', //最大日期
       isv: false
   };

   var Dates = {}, doc = document, creat = 'createElement', byid = 'getElementById', tags = 'getElementsByTagName';
   var as = ['laydate_box', 'laydate_void', 'laydate_click', 'LayDateSkin', 'skins/', '/laydate.css'];


   //主接口
   win.laydate = function(options){
       options = options || {};
       try{
           as.event = win.event ? win.event : laydate.caller.arguments[0];
       } catch(e){};
       Dates.run(options);
       return laydate;
   };

   laydate.v = '1.1';

   //获取组件存放路径
   Dates.getPath = (function(){
       var js = document.scripts, jsPath = js[js.length - 1].src;
       return config.path ? config.path : jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
   }());

   Dates.use = function(lib, id){
       var link = doc[creat]('link');
       link.type = 'text/css';
       link.rel = 'stylesheet';
       link.href = Dates.getPath + lib + as[5];
       id && (link.id = id);
       doc[tags]('head')[0].appendChild(link);
       link = null;
   };

   Dates.trim = function(str){
       str = str || '';
       return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
   };

   //补齐数位
   Dates.digit = function(num){
       return num < 10 ? '0' + (num|0) : num;
   };

   Dates.stopmp = function(e){
       e = e || win.event;
       e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
       return this;
   };

   Dates.each = function(arr, fn){
       var i = 0, len = arr.length;
       for(; i < len; i++){
           if(fn(i, arr[i]) === false){
               break
           }
       }
   };

   Dates.hasClass = function(elem, cls){
       elem = elem || {};
       return new RegExp('\\b' + cls +'\\b').test(elem.className);
   };

   Dates.addClass = function(elem, cls){
       elem = elem || {};
       Dates.hasClass(elem, cls) || (elem.className += ' ' + cls);
       elem.className = Dates.trim(elem.className);
       return this;
   };

   Dates.removeClass = function(elem, cls) {
       elem = elem || {};
       if (Dates.hasClass(elem, cls)) {
           var reg = new RegExp('\\b' + cls +'\\b');
           elem.className = elem.className.replace(reg, '');
       }
       return this;
   };

   //清除css属性
   Dates.removeCssAttr = function(elem, attr){
       var s = elem.style;
       if(s.removeProperty){
           s.removeProperty(attr);
       } else {
           s.removeAttribute(attr);
       }
   };

   //显示隐藏
   Dates.shde = function(elem, type){
       elem.style.display = type ? 'none' : 'block';
   };

   //简易选择器
   Dates.query = function(node){
       if(node && node.nodeType === 1){
           if(node.tagName.toLowerCase() !== 'input'){
               throw new Error('选择器elem错误');
           }
           return node;
       }

       var node = (Dates.trim(node)).split(' '), elemId = doc[byid](node[0].substr(1)), arr;
       if(!elemId){
           return;
       } else if(!node[1]){
           return elemId;
       } else if(/^\./.test(node[1])){
           var find, child = node[1].substr(1), exp = new RegExp('\\b' + child +'\\b');
           arr = []
           find = doc.getElementsByClassName ? elemId.getElementsByClassName(child) : elemId[tags]('*');
           Dates.each(find, function(ii, that){
               exp.test(that.className) && arr.push(that); 
           });
           return arr[0] ? arr : '';
       } else {
           arr = elemId[tags](node[1]);
           return arr[0] ? elemId[tags](node[1]) : '';
       }
   };

   //事件监听器
   Dates.on = function(elem, even, fn){
       elem.attachEvent ? elem.attachEvent('on'+ even, function(){
           fn.call(elem, win.even);
       }) : elem.addEventListener(even, fn, false);
       return Dates;
   };

   //阻断mouseup
   Dates.stopMosup = function(evt, elem){
       if(evt !== 'mouseup'){
           Dates.on(elem, 'mouseup', function(ev){
               Dates.stopmp(ev);
           });
       }
   };

   Dates.run = function(options){
       var S = Dates.query, elem, devt, even = as.event, target;
       try {
           target = even.target || even.srcElement || {};
       } catch(e){
           target = {};
       }
       elem = options.elem ? S(options.elem) : target;
       if(even && target.tagName){
           if(!elem || elem === Dates.elem){
               return;
           }
           Dates.stopMosup(even.type, elem);
           Dates.stopmp(even);
           Dates.view(elem, options);
           Dates.reshow();
       } else {
           devt = options.event || 'click';
           Dates.each((elem.length|0) > 0 ? elem : [elem], function(ii, that){
               Dates.stopMosup(devt, that);
               Dates.on(that, devt, function(ev){
                   Dates.stopmp(ev);
                   if(that !== Dates.elem){
                       Dates.view(that, options);
                       Dates.reshow();
                   }
               });
           });
       }
   };

   Dates.scroll = function(type){
       type = type ? 'scrollLeft' : 'scrollTop';
       return doc.body[type] | doc.documentElement[type];
   };

   Dates.winarea = function(type){
       return document.documentElement[type ? 'clientWidth' : 'clientHeight']
   };

   //判断闰年
   Dates.isleap = function(year){
       return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
   };

   //检测是否在有效期
   Dates.checkVoid = function(YY, MM, DD){
       var back = [];
       YY = YY|0;
       MM = MM|0;
       DD = DD|0;
       if(YY < Dates.mins[0]){
           back = ['y'];
       } else if(YY > Dates.maxs[0]){
           back = ['y', 1];
       } else if(YY >= Dates.mins[0] && YY <= Dates.maxs[0]){
           if(YY == Dates.mins[0]){
               if(MM < Dates.mins[1]){
                   back = ['m'];
               } else if(MM == Dates.mins[1]){
                   if(DD < Dates.mins[2]){
                       back = ['d'];
                   }
               }
           }
           if(YY == Dates.maxs[0]){
               if(MM > Dates.maxs[1]){
                   back = ['m', 1];
               } else if(MM == Dates.maxs[1]){
                   if(DD > Dates.maxs[2]){
                       back = ['d', 1];
                   }
               }
           }
       }
       return back;
   };

   //时分秒的有效检测
   Dates.timeVoid = function(times, index){
       if(Dates.ymd[1]+1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]){
           if(index === 0 && (times < Dates.mins[3])){
               return 1;
           } else if(index === 1 && times < Dates.mins[4]){
               return 1;
           } else if(index === 2 && times < Dates.mins[5]){
               return 1;
           }
       } else if(Dates.ymd[1]+1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]){
           if(index === 0 && times > Dates.maxs[3]){
               return 1;
           } else if(index === 1 && times > Dates.maxs[4]){
               return 1;
           } else if(index === 2 && times > Dates.maxs[5]){
               return 1;
           }
       }
       if(times > (index ? 59 : 23)){
           return 1;
       }
   };

   //检测日期是否合法
   Dates.check = function(){
       var reg = Dates.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,'\\d+\\').replace(/\\$/g, '');
       var exp = new RegExp(reg), value = Dates.elem[as.elemv];
       var arr = value.match(/\d+/g) || [], isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);
       if(value.replace(/\s/g, '') !== ''){
           if(!exp.test(value)){
               Dates.elem[as.elemv] = '';
               Dates.msg('日期不符合格式，请重新选择。');
               return 1;
           } else if(isvoid[0]){
               Dates.elem[as.elemv] = '';
               Dates.msg('日期不在有效期内，请重新选择。');
               return 1;
           } else {
               isvoid.value = Dates.elem[as.elemv].match(exp).join();
               arr = isvoid.value.match(/\d+/g);
               if(arr[1] < 1){
                   arr[1] = 1;
                   isvoid.auto = 1;
               } else if(arr[1] > 12){
                   arr[1] = 12;
                   isvoid.auto = 1;
               } else if(arr[1].length < 2){
                   isvoid.auto = 1;
               }
               if(arr[2] < 1){
                   arr[2] = 1;
                   isvoid.auto = 1;
               } else if(arr[2] > Dates.months[(arr[1]|0)-1]){
                   arr[2] = 31;
                   isvoid.auto = 1;
               } else if(arr[2].length < 2){
                   isvoid.auto = 1;
               }
               if(arr.length > 3){
                   if(Dates.timeVoid(arr[3], 0)){
                       isvoid.auto = 1;
                   };
                   if(Dates.timeVoid(arr[4], 1)){
                       isvoid.auto = 1;
                   };
                   if(Dates.timeVoid(arr[5], 2)){
                       isvoid.auto = 1;
                   };
               }
               if(isvoid.auto){
                   Dates.creation([arr[0], arr[1]|0, arr[2]|0], 1);
               } else if(isvoid.value !== Dates.elem[as.elemv]){
                   Dates.elem[as.elemv] = isvoid.value;
               }
           }
       }
   };

   //生成日期
   Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   Dates.viewDate = function(Y, M, D){
       var S = Dates.query, log = {}, De = new Date();
       Y < (Dates.mins[0]|0) && (Y = (Dates.mins[0]|0));
       Y > (Dates.maxs[0]|0) && (Y = (Dates.maxs[0]|0));
       
       De.setFullYear(Y, M, D);
       log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];
       
       Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;
       
       De.setFullYear(log.ymd[0], log.ymd[1], 1);
       log.FDay = De.getDay();
       
       log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
       log.NDay = 1;
       
       //渲染日
       Dates.each(as.tds, function(i, elem){
           var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
           elem.className = '';
           if(i < log.FDay){
               elem.innerHTML = DD = i + log.PDay;
               Dates.addClass(elem, 'laydate_nothis');
               MM === 1 && (YY -= 1);
               MM = MM === 1 ? 12 : MM - 1; 
           } else if(i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]){
               elem.innerHTML = DD = i  - log.FDay + 1;
               if(i - log.FDay + 1 === log.ymd[2]){
                   Dates.addClass(elem, as[2]);
                   log.thisDay = elem;
               }
           } else {
               elem.innerHTML = DD = log.NDay++;
               Dates.addClass(elem, 'laydate_nothis');
               MM === 12 && (YY += 1);
               MM = MM === 12 ? 1 : MM + 1; 
           }
          
           if(Dates.checkVoid(YY, MM, DD)[0]){
               Dates.addClass(elem, as[1]);
           }
           
           Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
           elem.setAttribute('y', YY);
           elem.setAttribute('m', MM);
           elem.setAttribute('d', DD);
           YY = MM = DD = null;
       });
       
       Dates.valid = !Dates.hasClass(log.thisDay, as[1]);
       Dates.ymd = log.ymd;
       
       //锁定年月
       as.year.value = Dates.ymd[0] + '年';
       as.month.value = Dates.digit(Dates.ymd[1] + 1) + '月';
       
       //定位月
       Dates.each(as.mms, function(i, elem){
           var getCheck = Dates.checkVoid(Dates.ymd[0], (elem.getAttribute('m')|0) + 1);
           if(getCheck[0] === 'y' || getCheck[0] === 'm'){
               Dates.addClass(elem, as[1]);
           } else {
               Dates.removeClass(elem, as[1]);
           }
           Dates.removeClass(elem, as[2]);
           getCheck = null
       });
       Dates.addClass(as.mms[Dates.ymd[1]], as[2]);
       
       //定位时分秒
       log.times = [
           Dates.inymd[3]|0 || 0, 
           Dates.inymd[4]|0 || 0, 
           Dates.inymd[5]|0 || 0
       ];
       Dates.each(new Array(3), function(i){
           Dates.hmsin[i].value = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i+3]|0 : log.times[i]|0);
       });
       
       //确定按钮状态
       Dates[Dates.valid ? 'removeClass' : 'addClass'](as.ok, as[1]);
   };

   //节日
   Dates.festival = function(td, md){
       var str;
       switch(md){
           case '1.1':
               str = '元旦';
           break;
           case '3.8':
               str = '妇女';
           break;
           case '4.5':
               str = '清明';
           break;
           case '5.1':
               str = '劳动';
           break;
           case '6.1':
               str = '儿童';
           break;
           case '9.10':
               str = '教师';
           break;
           case '10.1':
               str = '国庆';
           break;
       };
       str && (td.innerHTML = str);
       str = null;
   };

   //生成年列表
   Dates.viewYears = function(YY){
       var S = Dates.query, str = '';
       Dates.each(new Array(14), function(i){
           if(i === 7) {
               str += '<li '+ (parseInt(as.year.value) === YY ? 'class="'+ as[2] +'"' : '') +' y="'+ YY +'">'+ YY +'年</li>';
           } else {
               str += '<li y="'+ (YY-7+i) +'">'+ (YY-7+i) +'年</li>';
           }
       }); 
       S('#laydate_ys').innerHTML = str;
       Dates.each(S('#laydate_ys li'), function(i, elem){
           if(Dates.checkVoid(elem.getAttribute('y'))[0] === 'y'){
               Dates.addClass(elem, as[1]);
           } else {
               Dates.on(elem, 'click', function(ev){
                   Dates.stopmp(ev).reshow();
                   Dates.viewDate(this.getAttribute('y')|0, Dates.ymd[1], Dates.ymd[2]);
               });
           }
       });
   };

   //初始化面板数据
   Dates.initDate = function(){
       var S = Dates.query, log = {}, De = new Date();
       var ymd = Dates.elem[as.elemv].match(/\d+/g) || [];
       if(ymd.length < 3){
           ymd = Dates.options.start.match(/\d+/g) || [];
           if(ymd.length < 3){
               ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
           }
       }
       Dates.inymd = ymd;
       Dates.viewDate(ymd[0], ymd[1]-1, ymd[2]);
   };

   //是否显示零件
   Dates.iswrite = function(){
       var S = Dates.query, log = {
           time: S('#laydate_hms')
       };
       Dates.shde(log.time, !Dates.options.istime);
       Dates.shde(as.oclear, !('isclear' in Dates.options ? Dates.options.isclear : 1));
       Dates.shde(as.otoday, !('istoday' in Dates.options ? Dates.options.istoday : 1));
       Dates.shde(as.ok, !('issure' in Dates.options ? Dates.options.issure : 1));
   };

   //方位辨别
   Dates.orien = function(obj, pos){
       var tops, rect = Dates.elem.getBoundingClientRect();
       obj.style.left = rect.left + (pos ? 0 : Dates.scroll(1)) + 'px';
       if(rect.bottom + obj.offsetHeight/1.5 <= Dates.winarea()){
           tops = rect.bottom - 1;         
       } else {
           tops = rect.top > obj.offsetHeight/1.5 ? rect.top - obj.offsetHeight + 1 : Dates.winarea() - obj.offsetHeight;
       }
       obj.style.top = tops + (pos ? 0 : Dates.scroll()) + 'px';
   };

   //吸附定位
   Dates.follow = function(obj){
       if(Dates.options.fixed){
           obj.style.position = 'fixed';
           Dates.orien(obj, 1);
       } else {
           obj.style.position = 'absolute';
           Dates.orien(obj);
       }
   };

   //生成表格
   Dates.viewtb = (function(){
       var tr, view = [], weeks = [ '日', '一', '二', '三', '四', '五', '六'];
       var log = {}, table = doc[creat]('table'), thead = doc[creat]('thead');
       thead.appendChild(doc[creat]('tr'));
       log.creath = function(i){
           var th = doc[creat]('th');
           th.innerHTML = weeks[i];
           thead[tags]('tr')[0].appendChild(th);
           th = null;
       };
       
       Dates.each(new Array(6), function(i){
           view.push([]);
           tr = table.insertRow(0);
           Dates.each(new Array(7), function(j){
               view[i][j] = 0;
               i === 0 && log.creath(j);
               tr.insertCell(j);
           });
       });
       
       table.insertBefore(thead, table.children[0]); 
       table.id = table.className = 'laydate_table';
       tr = view = null;
       return table.outerHTML.toLowerCase();
   }());

   //渲染控件骨架
   Dates.view = function(elem, options){
       var S = Dates.query, div, log = {};
       options = options || elem;

       Dates.elem = elem;
       Dates.options = options;
       Dates.options.format || (Dates.options.format = config.format);
       Dates.options.start = Dates.options.start || '';
       Dates.mm = log.mm = [Dates.options.min || config.min, Dates.options.max || config.max];
       Dates.mins = log.mm[0].match(/\d+/g);
       Dates.maxs = log.mm[1].match(/\d+/g);
       
       as.elemv = /textarea|input/.test(Dates.elem.tagName.toLocaleLowerCase()) ? 'value' : 'innerHTML';
          
       if(!Dates.box){
           div = doc[creat]('div');
           div.id = as[0];
           div.className = as[0];
           div.style.cssText = 'position: absolute;';
           div.setAttribute('name', 'laydate-v'+ laydate.v);
           
           div.innerHTML =  log.html = '<div class="laydate_top">'
             +'<div class="laydate_ym laydate_y" id="laydate_YY">'
               +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
               +'<input id="laydate_y" readonly><label></label>'
               +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
               +'<div class="laydate_yms">'
                 +'<a class="laydate_tab laydate_chtop"><cite></cite></a>'
                 +'<ul id="laydate_ys"></ul>'
                 +'<a class="laydate_tab laydate_chdown"><cite></cite></a>'
               +'</div>'
             +'</div>'
             +'<div class="laydate_ym laydate_m" id="laydate_MM">'
               +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
               +'<input id="laydate_m" readonly><label></label>'
               +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
               +'<div class="laydate_yms" id="laydate_ms">'+ function(){
                   var str = '';
                   Dates.each(new Array(12), function(i){
                       str += '<span m="'+ i +'">'+ Dates.digit(i+1) +'月</span>';
                   });
                   return str;
               }() +'</div>'
             +'</div>'
           +'</div>'
           
           + Dates.viewtb
           
           +'<div class="laydate_bottom">'
             +'<ul id="laydate_hms">'
               +'<li class="laydate_sj">时间</li>'
               +'<li><input readonly>:</li>'
               +'<li><input readonly>:</li>'
               +'<li><input readonly></li>'
             +'</ul>'
             +'<div class="laydate_time" id="laydate_time"></div>'
             +'<div class="laydate_btn">'
               +'<a id="laydate_clear">清空</a>'
               +'<a id="laydate_today">今天</a>'
               +'<a id="laydate_ok">确认</a>'
             +'</div>'
             +(config.isv ? '<a href="http://sentsin.com/layui/laydate/" class="laydate_v" target="_blank">laydate-v'+ laydate.v +'</a>' : '')
           +'</div>';
           doc.body.appendChild(div); 
           Dates.box = S('#'+as[0]);        
           Dates.events();
           div = null;
       } else {
           Dates.shde(Dates.box);
       }
       Dates.follow(Dates.box);
       options.zIndex ? Dates.box.style.zIndex = options.zIndex : Dates.removeCssAttr(Dates.box, 'z-index');
       Dates.stopMosup('click', Dates.box);
       
       Dates.initDate();
       Dates.iswrite();
       Dates.check();
   };

   //隐藏内部弹出元素
   Dates.reshow = function(){
       Dates.each(Dates.query('#'+ as[0] +' .laydate_show'), function(i, elem){
           Dates.removeClass(elem, 'laydate_show');
       });
       return this;
   };

   //关闭控件
   Dates.close = function(){
       Dates.reshow();
       Dates.shde(Dates.query('#'+ as[0]), 1);
       Dates.elem = null;
   };

   //转换日期格式
   Dates.parse = function(ymd, hms, format){
       ymd = ymd.concat(hms);
       format = format || (Dates.options ? Dates.options.format : config.format);
       return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index){
           ymd.index = ++ymd.index|0;
           return Dates.digit(ymd[ymd.index]);
       });     
   };

   //返回最终日期
   Dates.creation = function(ymd, hide){
       var S = Dates.query, hms = Dates.hmsin;
       var getDates = Dates.parse(ymd, [hms[0].value, hms[1].value, hms[2].value]);
       Dates.elem[as.elemv] = getDates;
       if(!hide){
           Dates.close();
           typeof Dates.options.choose === 'function' && Dates.options.choose(getDates); 
       }
   };

   //事件
   Dates.events = function(){
       var S = Dates.query, log = {
           box: '#'+as[0]
       };
       
       Dates.addClass(doc.body, 'laydate_body');
       
       as.tds = S('#laydate_table td');
       as.mms = S('#laydate_ms span');
       as.year = S('#laydate_y');
       as.month = S('#laydate_m');

       //显示更多年月
       Dates.each(S(log.box + ' .laydate_ym'), function(i, elem){
           Dates.on(elem, 'click', function(ev){
               Dates.stopmp(ev).reshow();
               Dates.addClass(this[tags]('div')[0], 'laydate_show');
               if(!i){
                   log.YY = parseInt(as.year.value);
                   Dates.viewYears(log.YY);
               }
           });
       });
       
       Dates.on(S(log.box), 'click', function(){
           Dates.reshow();
       });
       
       //切换年
       log.tabYear = function(type){  
           if(type === 0){
               Dates.ymd[0]--;
           } else if(type === 1) {
               Dates.ymd[0]++;
           } else if(type === 2) {
               log.YY -= 14;
           } else {
               log.YY += 14;
           }
           if(type < 2){
               Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
               Dates.reshow();
           } else {
               Dates.viewYears(log.YY);
           }
       };
       Dates.each(S('#laydate_YY .laydate_tab'), function(i, elem){
           Dates.on(elem, 'click', function(ev){
               Dates.stopmp(ev);
               log.tabYear(i);
           });
       });
       
       
       //切换月
       log.tabMonth = function(type){
           if(type){
               Dates.ymd[1]++;
               if(Dates.ymd[1] === 12){
                   Dates.ymd[0]++;
                   Dates.ymd[1] = 0;
               }            
           } else {
               Dates.ymd[1]--;
               if(Dates.ymd[1] === -1){
                   Dates.ymd[0]--;
                   Dates.ymd[1] = 11;
               }
           }
           Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
       };
       Dates.each(S('#laydate_MM .laydate_tab'), function(i, elem){
           Dates.on(elem, 'click', function(ev){
               Dates.stopmp(ev).reshow();
               log.tabMonth(i);
           });
       });
       
       //选择月
       Dates.each(S('#laydate_ms span'), function(i, elem){
           Dates.on(elem, 'click', function(ev){
               Dates.stopmp(ev).reshow();
               if(!Dates.hasClass(this, as[1])){
                   Dates.viewDate(Dates.ymd[0], this.getAttribute('m')|0, Dates.ymd[2]);
               }
           });
       });
       
       //选择日
       Dates.each(S('#laydate_table td'), function(i, elem){
           Dates.on(elem, 'click', function(ev){
               if(!Dates.hasClass(this, as[1])){
                   Dates.stopmp(ev);
                   Dates.creation([this.getAttribute('y')|0, this.getAttribute('m')|0, this.getAttribute('d')|0]);
               }
           });
       });
       
       //清空
       as.oclear = S('#laydate_clear');
       Dates.on(as.oclear, 'click', function(){
           Dates.elem[as.elemv] = '';
           Dates.close();
       });
       
       //今天
       as.otoday = S('#laydate_today');
       Dates.on(as.otoday, 'click', function(){
           var now = new Date();
           Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
       });
       
       //确认
       as.ok = S('#laydate_ok');
       Dates.on(as.ok, 'click', function(){
           if(Dates.valid){
               Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
           }
       });
       
       //选择时分秒
       log.times = S('#laydate_time');
       Dates.hmsin = log.hmsin = S('#laydate_hms input');
       log.hmss = ['小时', '分钟', '秒数'];
       log.hmsarr = [];
       
       //生成时分秒或警告信息
       Dates.msg = function(i, title){
           var str = '<div class="laydte_hsmtex">'+ (title || '提示') +'<span>×</span></div>';
           if(typeof i === 'string'){
               str += '<p>'+ i +'</p>';
               Dates.shde(S('#'+as[0]));
               Dates.removeClass(log.times, 'laydate_time1').addClass(log.times, 'laydate_msg');
           } else {
               if(!log.hmsarr[i]){
                   str += '<div id="laydate_hmsno" class="laydate_hmsno">';
                   Dates.each(new Array(i === 0 ? 24 : 60), function(i){
                       str += '<span>'+ i +'</span>';
                   });
                   str += '</div>'
                   log.hmsarr[i] = str;
               } else {
                   str = log.hmsarr[i];
               }
               Dates.removeClass(log.times, 'laydate_msg');
               Dates[i=== 0 ? 'removeClass' : 'addClass'](log.times, 'laydate_time1');
           }
           Dates.addClass(log.times, 'laydate_show');
           log.times.innerHTML = str;
       };
       
       log.hmson = function(input, index){
           var span = S('#laydate_hmsno span'), set = Dates.valid ? null : 1;
           Dates.each(span, function(i, elem){
               if(set){
                   Dates.addClass(elem, as[1]);
               } else if(Dates.timeVoid(i, index)){
                   Dates.addClass(elem, as[1]);
               } else {
                   Dates.on(elem, 'click', function(ev){
                       if(!Dates.hasClass(this, as[1])){
                           input.value = Dates.digit(this.innerHTML|0);
                       }
                   });
               } 
           });
           Dates.addClass(span[input.value|0], 'laydate_click');
       };
       
       //展开选择
       Dates.each(log.hmsin, function(i, elem){
           Dates.on(elem, 'click', function(ev){
               Dates.stopmp(ev).reshow();
               Dates.msg(i, log.hmss[i]);
               log.hmson(this, i);
           });
       });
       
       Dates.on(doc, 'mouseup', function(){
           var box = S('#'+as[0]);
           if(box && box.style.display !== 'none'){
               Dates.check() || Dates.close();
           }
       }).on(doc, 'keydown', function(event){
           event = event || win.event;
           var codes = event.keyCode;

           //如果在日期显示的时候按回车
           if(codes === 13 && Dates.elem){
               Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
           }
       });
   };

   Dates.init = (function(){
       // Dates.use('need');
       // Dates.use(as[4] + config.defSkin, as[3]);
       // Dates.skinLink = Dates.query('#'+as[3]);
   }());

   //重置定位
   laydate.reset = function(){
       (Dates.box && Dates.elem) && Dates.follow(Dates.box);
   };

   //返回指定日期
   laydate.now = function(timestamp, format){
       var De = new Date((timestamp|0) ? function(tamp){
           return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
       }(parseInt(timestamp)) : +new Date);
       return Dates.parse(
           [De.getFullYear(), De.getMonth()+1, De.getDate()],
           [De.getHours(), De.getMinutes(), De.getSeconds()],
           format
       );
   };

   //皮肤选择
   laydate.skin = function(lib){
       Dates.skinLink.href = Dates.getPath + as[4] + lib + as[5];
   };

   }(window);

   $.fn.extend({
     maxtext: function() {
       var maxtexts = $(this);
       maxtexts.each(function(index, el) {
         var inputDiv = $(el),
           inputLabel = $(inputDiv.attr('max-for')),
           label = inputDiv.attr('max-text'),
           maxNum = label.replace(/^(.+)?\{/, '').replace(/\}(.+)?/, ""),
           changeInput;
         inputLabel.text(label.replace(/\{[0-9]+\}/,maxNum));
         inputDiv.attr('uiinit', 'true')
         inputDiv.on('input keydown', function() {
           inputLabel.text("正在输入...")

           clearTimeout(changeInput);
           changeInput = setTimeout(function() {
             var inputed = inputDiv.val().length,
               surplus = maxNum - inputed;
             if (surplus>0) {
               // 可以输入
               inputLabel.text('剩余' + surplus + '字')
             } else {
               // 大于限制字数，不可输入
               inputDiv.val(inputDiv.val().substring(0, maxNum));
               inputLabel.text('剩余0字');
             }
           }, 700)

         })
       })
     }
   })

   $.fn.extend({
     autoarea: function() {
       var $this = $(this);
       $this.on("input keydown", function() {
         var area = this;
         $(this).height("")
         $(this).height($(this).prop('scrollHeight') - parseFloat($(this).css('padding-top')) - parseFloat($(this).css('padding-bottom')))
       })
     }
   })

   $.fn.extend({
     autonone: function(){
       $(this).on('click', function(){
         var selector = $(this).attr('none');
         $(selector).addClass('none')
       })
     },
     autoshow: function(){
       $(this).on('click', function(){
         var selector = $(this).attr('show');
         $(selector).removeClass('none')
       })
     }
   })

   $.fn.extend({
     modal: function(config) {
       var moc = '';
       var bg = $('.mo');
       var offsetTop = 220;

       switch (config) {
         case "open":
         open(this);
         break;
         case "close":
         close(this);
         break;
         default:
         init();
         break;
       };

       function init(selector) {
         if (bg.length <= 0) {
           bg = $("<div>").addClass('mo none');
           $('body').append(bg);
         };
         $(selector).find('[modal-close]').off('click').on('click', function(){
           close(selector);
         });
         bg.off('click').on('click', function(){
           close(selector);
         })

       }

       function close(selector) {
         $(selector).addClass('none');
         if($('.mo-content').not('.none').length == 0){
           bg.addClass('none');
         }
       }

       function open(selector) {
         init(selector);
         moc = $(selector);
         moc.removeClass('none');
         var cssTop = (($(window).height() - moc.outerHeight()) / 2); // top 算法
         if (cssTop >= offsetTop) {
           cssTop = offsetTop
         }
         moc.css({
           'top': 0,
           'margin-left': -parseInt(moc.outerWidth() / 2)
         })
         moc.animate({
           'top': cssTop
         }, 200);
         bg.removeClass('none')
       }
     }
   })

   /*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
   !function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();

   !function(){
     this.multiline = function(s){
       return s.toString()
               .replace(/^[^\/]+\/\*/, '')
               .replace(/\*\/[^\/]+$/, '')
               .replace(/^!?/, '') // YUI
               .replace(/^(\s*@preserve)?/, '') // uglify-js
     }
   }();

   $.extend({
     birthday: function(options) {
       var defaults = {
         YearSelector: "#sel_year",
         MonthSelector: "#sel_month",
         DaySelector: "#sel_day",
         FirstText: "--",
         FirstValue: 0,
         StartYear: 1949
       };
       var opts = $.extend({}, defaults, options);
       var $YearSelector = $(opts.YearSelector);
       var $MonthSelector = $(opts.MonthSelector);
       var $DaySelector = $(opts.DaySelector);
       var $StartYear = opts.StartYear
       var FirstText = opts.FirstText;
       var FirstValue = opts.FirstValue;

       // 初始化
       var str = "<option value=\"" + FirstValue + "\">" + FirstText + "</option>";
       $YearSelector.html(str);
       $MonthSelector.html(str);
       $DaySelector.html(str);

       // 年份列表
       var yearNow = new Date().getFullYear();
       var yearSel = $YearSelector.attr("rel");
       for (var i = yearNow; i >= $StartYear; i--) {
         var sed = yearSel == i ? "selected" : "";
         var yearStr = "<option value=\"" + i + "\" " + sed + ">" + i + "</option>";
         $YearSelector.append(yearStr);
       }

       // 月份列表
       // 月列表(仅当选择了年月)
       function BuildMonth() {
         if ($YearSelector.val() == 0 || $MonthSelector.val() != 0) {
           // 未选择年份
           $DaySelector.html(str);
         } else {
           var monthSel = $MonthSelector.attr("rel");

           // 渲染
           $MonthSelector.html(str);
           for (var i = 1; i <= 12; i++) {
             var sed = monthSel == i ? "selected" : "";
             var monthStr = "<option value=\"" + i + "\" " + sed + ">" + i + "</option>";
             $MonthSelector.append(monthStr);
           }

         }

       }

       // 日列表(仅当选择了年月)
       function BuildDay() {
         if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) {
           // 未选择年份或者月份
           $DaySelector.html(str);
         } else {
           var year = parseInt($YearSelector.val());
           var month = parseInt($MonthSelector.val());
           var day = parseInt($DaySelector.val())
           var dayCount = 0;
           switch (month) {
             case 1:
             case 3:
             case 5:
             case 7:
             case 8:
             case 10:
             case 12:
               dayCount = 31;
               break;
             case 4:
             case 6:
             case 9:
             case 11:
               dayCount = 30;
               break;
             case 2:
               dayCount = 28;
               if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
                 dayCount = 29;
               }
               break;
             default:
               break;
           }


           // 渲染
           var daySel = $DaySelector.attr("rel");
           $DaySelector.html(str);
           for (var i = 1; i <= dayCount; i++) {
             var sed = daySel == i ? "selected" : "";
             var dayStr = "<option value=\"" + i + "\" " + sed + ">" + i + "</option>";
             $DaySelector.append(dayStr);
           }

           // 调整值
           if (day <= dayCount) {
             $DaySelector.val(day);
             $DaySelector.prev('.btn-select').html(day)
           } else {
             $DaySelector.prev('.btn-select').html('日')
           }


         }
       }
       $MonthSelector.change(function() {
         BuildDay();
       });
       $YearSelector.change(function() {
         BuildMonth();
         BuildDay();
       });
       if ($DaySelector.attr("rel") != "") {
         BuildDay();
       }
     }
   });

   /*! loadjs: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
   (function(w) {
     var loadjs = function(src, cb) {
       var head = document.getElementsByTagName("head")[0];
       var script = document.createElement("script");
       script.setAttribute("type", "text/javascript");
       script.src = src;
       script.onload = script.onreadystatechange = function(){

         if(!script.readyState || script.readyState == "loaded"){
           if(cb || typeof cb == "function"){
             cb()        
           }
         }
       }
       head.appendChild(script);
       return script;
     }
     // commonjs
     if (typeof module !== "undefined") {
       module.exports = loadjs;
     } else {
       w.loadjs = loadjs;
     }
   }(typeof global !== "undefined" ? global : window));

   /*
    * IDValidator.js v1.2.0
    * 中国身份证号验证 Chinese Personal ID Card Validation
    * Author: mc@mc-zone.me
    * E-mail: mc@mc-zone.me
    * Released under the MIT license
    */

   ;(function(factory){

       var isWindow = ( typeof window !== 'undefined'?true:false );
       var global = ( isWindow ? window : this );

       var instance = function(){ return factory(isWindow,global); };

       // AMD / RequireJS
       if (typeof define !== 'undefined' && define.amd) {
           define('IDValidator', [], instance );
       }
       // CMD / Seajs 
       else if (typeof define === "function" && define.cmd) {
           define( function(require, exports, module) {
               module.exports = factory(isWindow,global);
           });
       }
       // CommonJS
       else if (typeof module !== 'undefined' && module.exports) {
           module.exports = factory(isWindow,global);
       }
       else {
           global.IDValidator = factory(isWindow,global);
       }

   })(function(isWindow,global){

        var param = {
           error:{
               longNumber:'长数字存在精度问题，请使用字符串传值！ Long number is not allowed, because the precision of the Number In JavaScript.'
           }
        };

        var util = {
           checkArg:function(id){              
                var argType = (typeof id);

                switch( argType ){
                    case 'number':
                        //long number not allowed
                        id = id.toString();    
                        if( id.length > 15 ){
                            this.error(param.error.longNumber);
                            return false;
                        }
                        break;    
                    case 'string':
                        break;
                    default:
                        return false;
                }

                id = id.toUpperCase();

                var code = null;
                if( id.length === 18 ){
                    //18位
                    code = {
                        body : id.slice(0,17),
                        checkBit : id.slice(-1),
                        type : 18
                    };
                }else if( id.length === 15 ){
                    //15位
                    code = {
                        body : id,
                        type : 15
                    };
                }else{
                    return false;
                }

                return code;
           }
           //地址码检查
           ,checkAddr:function(addr,GB2260){
               var addrInfo = this.getAddrInfo(addr,GB2260);
               return ( addrInfo === false ? false : true );
           }
           //取得地址码信息
           ,getAddrInfo:function(addr,GB2260){
             GB2260 = GB2260 || null;
             //查询GB/T2260,没有引入GB2260时略过
             if( GB2260 === null ){
                 return addr;
             }
             if( !GB2260.hasOwnProperty(addr) ){
                 //考虑标准不全的情况，搜索不到时向上搜索
                 var tmpAddr;
                 tmpAddr = addr.slice(0,4) + '00';
                 if( !GB2260.hasOwnProperty(tmpAddr) ){
                     tmpAddr = addr.slice(0,2) + '0000';
                     if( !GB2260.hasOwnProperty(tmpAddr) ){
                         return false;
                     }else{
                         return GB2260[tmpAddr] + '未知地区';
                     }
                 }else{
                     return GB2260[tmpAddr] + '未知地区';
                 }
             }else{
                 return GB2260[addr];
             }
           }
           //生日码检查
           ,checkBirth:function(birth){
               var year, month, day;
             if( birth.length == 8 ){
                 year  = parseInt( birth.slice(0,4),10 );
                 month = parseInt( birth.slice(4,6),10 );
                 day   = parseInt( birth.slice(-2),10 );
             }else if( birth.length == 6 ){
                 year  = parseInt( '19' + birth.slice(0,2),10 );
                 month = parseInt( birth.slice(2,4),10 );
                 day   = parseInt( birth.slice(-2),10 );
             }else{
                 return false;
             }
             // TODO 是否需要判断年份
             /*
             if( year<1800 ){
                 return false;
             }
             */
             //TODO 按月份检测
             if( month > 12 || month === 0 || day > 31 || day === 0 ){
                 return false;
             }

             return true;
           }
           //顺序码检查
           ,checkOrder:function(order){
             //暂无需检测

             return true;
           }
           //加权
           ,weight:function(t){
             return Math.pow(2,t-1)%11;
           }
           //随机整数
           ,rand:function(max,min){
               min = min || 1;
               return Math.round( Math.random() * (max-min) ) + min;
           }
           //数字补位
           ,str_pad:function(str,len,chr,right){
               str = str.toString();
               len = len || 2;
               chr = chr || '0';
               right = right || false;
               if( str.length >= len ){
                   return str;
               }else{
                   for( var i=0,j=len-str.length;i<j;i++ ){
                       if( right ){
                           str = str+chr;
                       }else{
                           str = chr+str;
                       }
                   }
                   return str;
               }
           }
           //抛错
           ,error:function(msg){
               var e = new Error();
               e.message = 'IDValidator: ' + msg;
               throw e;
           }
        };

        var _IDValidator = function(GB2260){
            if( typeof GB2260 !== "undefined" ){
                this.GB2260 = GB2260;
            }
            //建立cache
            this.cache = {};
        };

        _IDValidator.prototype = {

            isValid:function(id){
                var GB2260 = this.GB2260 || null;
                var code = util.checkArg(id);
                if( code === false ){
                    return false;              
                }
                //查询cache
                if( this.cache.hasOwnProperty(id) && typeof this.cache[id].valid !== 'undefined' ){
                    return this.cache[id].valid;
                }else{
                    if( !this.cache.hasOwnProperty(id) ){
                       this.cache[id] = {};
                    }
                }

                var addr = code.body.slice(0,6);
                var birth = ( code.type === 18 ? code.body.slice(6,14) : code.body.slice(6,12) );
                var order = code.body.slice(-3);

                if( !( util.checkAddr(addr,GB2260) && util.checkBirth(birth) && util.checkOrder(order) ) ) {
                    this.cache[id].valid = false;
                    return false;
                }

                //15位不含校验码，到此已结束
                if( code.type === 15 ){
                    this.cache[id].valid = true;
                    return true;
                }

                /* 校验位部分 */
                
                //位置加权
                var posWeight = [];
                for(var i=18;i>1;i--){
                    var wei = util.weight(i);
                    posWeight[i] = wei;
                }

                //累加body部分与位置加权的积
                var bodySum = 0;
                var bodyArr = code.body.split('');
                for(var j=0;j<bodyArr.length;j++){
                    bodySum += ( parseInt( bodyArr[j],10 ) * posWeight[18 - j] );
                }

                //得出校验码
                var checkBit = 12 - ( bodySum % 11 );
                if( checkBit == 10 ){
                    checkBit = 'X';
                }else if( checkBit>10 ){
                    checkBit = checkBit%11;
                }
                checkBit = ( typeof checkBit === 'number'?checkBit.toString():checkBit );

                //检查校验码
                if( checkBit !== code.checkBit ){
                    this.cache[id].valid = false;
                    return false;
                }else{
                    this.cache[id].valid = true;
                    return true;
                }

            }

            //分析详细信息
            ,getInfo:function(id){
                var GB2260 = this.GB2260 || null;
                //号码必须有效
                if( this.isValid(id) === false ){
                    return false;
                }
                //TODO 复用此部分
                var code = util.checkArg(id);

                //查询cache
                //到此时通过isValid已经有了cache记录
                if( typeof this.cache[id].info !== 'undefined' ){
                    return this.cache[id].info;
                }

                var addr = code.body.slice(0,6);
                var birth = ( code.type === 18 ? code.body.slice(6,14) : code.body.slice(6,12) );
                var order = code.body.slice(-3);

                var info = {};
                info.addrCode = addr;
                if( GB2260 !== null ){
                    info.addr = util.getAddrInfo(addr,GB2260);
                }
                info.birth = ( code.type === 18 ? (
                               ([birth.slice(0,4),birth.slice(4,6),birth.slice(-2)]).join('-') ) :
                               (['19'+birth.slice(0,2),birth.slice(2,4),birth.slice(-2)]).join('-') 
                             );
                info.sex = (order%2===0?0:1);
                info.length = code.type;
                if( code.type === 18 ){
                    info.checkBit = code.checkBit;
                }

                //记录cache
                this.cache[id].info = info;

                return info;
            }

            //仿造一个号
            ,makeID:function( isFifteen ){
                var GB2260 = this.GB2260 || null;

                //地址码
                var addr = null;
                if( GB2260 !== null ){
                    var loopCnt = 0;
                    while( addr === null ){
                        //防止死循环
                        if( loopCnt>10 ){
                            addr = 110101;
                            break;
                        }
                        var prov = util.str_pad( util.rand( 50 ), 2, '0' );
                        var city = util.str_pad( util.rand( 20 ), 2, '0' );
                        var area = util.str_pad( util.rand( 20 ), 2, '0' );
                        var addrTest = [prov,city,area].join('');
                        if( GB2260[addrTest] ){
                            addr = addrTest;
                            break;
                        }
                    }
                }else{
                    addr = 110101;
                }

                //出生年
                var yr = util.str_pad( util.rand( 99,50 ), 2, '0' );
                var mo = util.str_pad( util.rand( 12,1 ), 2, '0' );
                var da = util.str_pad( util.rand( 28,1 ), 2, '0' );
                if( isFifteen ){
                    return addr + yr + mo + da + util.str_pad( util.rand( 999,1 ),3,'1' );
                }

                yr = '19' + yr;
                var body = addr + yr + mo + da + util.str_pad( util.rand( 999,1 ),3,'1' );

                //位置加权
                var posWeight = [];
                for(var i=18;i>1;i--){
                    var wei = util.weight(i);
                    posWeight[i] = wei;
                }

                //累加body部分与位置加权的积
                var bodySum = 0;
                var bodyArr = body.split('');
                for(var j=0;j<bodyArr.length;j++){
                    bodySum += ( parseInt( bodyArr[j],10 ) * posWeight[18 - j] );
                }

                //得出校验码
                var checkBit = 12 - ( bodySum % 11 );
                if( checkBit == 10 ){
                    checkBit = 'X';
                }else if( checkBit>10 ){
                    checkBit = checkBit%11;
                }
                checkBit = ( typeof checkBit === 'number'?checkBit.toString():checkBit );

                return (body + checkBit);
            }

       };//_IDValidator

       return _IDValidator;

   });

   var util = {};

   util.getType = function(obj){
     return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
   };

   util.each = function(array, call){
     if(!array){
       return null;
     }
     var length = array.length || 0;
   };

   util.merge = function( first, second ) {
     var len = +second.length,
       j = 0,
       i = first.length;

     for ( ; j < len; j++ ) {
       first[ i++ ] = second[ j ];
     }

     first.length = i;

     return first;
   };

   var dateUtil = {};

   dateUtil.isDate = function(object){
     if(util.getType(object) === 'date'){
       return true;
     }else{
       return false;
     }
   };

   // @description 是否为闰年
   // @param year {num} 可能是年份或者为一个date实例对象
   // @return {boolean} 返回值
   dateUtil.isLeapYear = function(year){
     if(dateUtil.isDate(year)){
       year = year.getFullYear();
     }
     if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){
       return true;
     }else{
       return false;
     }
   };

   dateUtil.getDaysOfMonth = function(year, month){
     if(dateUtil.isDate(year)){
       month = year.getMonth()+1;
       year = year.getFullYear();
     }
     return [31, dateUtil.isLeapYear(year)? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month-1];
   };

   dateUtil.getBeginDayOfMouth = function(year, month){
     if(dateUtil.isDate(year)){
       month = year.getMonth();
       year = year.getFullYear();
     }
     return new Date(year, month-1).getDay();
   };

   // 传入 date 字符串，返回 Date 日期对象
   function parse(dateString){

     if(dateUtil.isDate(dateString)){return dateString};

     if(util.getType(dateString)==='string'){
       return new Date(dateString.toString().replace(/[^0-9]/g," "));
     }

     return null;
   }

   var calendar = function(date){
     return new calendar.prototype.init(date);
   };

   calendar.prototype = {
     constructor: calendar,
     length: 0,

     pushStack: function( elems ) {
       // Build a new jQuery matched element set
       var ret = util.merge( this.constructor(), elems );

       // Add the old object onto the stack (as a reference)
       ret.prevObject = this;

       // Return the newly-formed element set
       return ret;
     },

     toArray: function(){
       if(util.getType(this.rootArguments)==='string'){
         return this.rootArguments.replace(/[^0-9]/g,' ').split(' ');
       }
     },

     eq: function(i){
       var len = this.length,
         j = +i + ( i < 0 ? len : 0 );
       return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
     },

     slice: function(){
       return this;
       // util.merge(this, this.pushStack([].slice.apply(this, arguments)))
     },

     first: function(){
       return this.eq(0);
     },

     last: function(){
       return this.eq(this.length - 1);
     },

     sibling: function( dir ) {
       // return this.constructor(this.year && this.year+dir, this.month && this.month+dir, this.date && this.date+dir);
       
       if(this.rootArguments.length === 1){
         var nowDate = new Date(this.rootArguments[0]);
         nowDate.setFullYear(nowDate.getFullYear() + dir);
         return this.constructor(nowDate.getFullYear())
       }else{
         var nowDate = new Date(this.rootArguments[0] + '.' + this.rootArguments[1]);
         nowDate.setMonth(nowDate.getMonth() + dir);
         var nDate = nowDate.getFullYear();
         var nMonth = nowDate.getMonth()+1;
         return this.constructor(nDate + '.' + nMonth)
       }
     },

     next: function(index){
       return this.sibling(index || 1);
     },

     prev: function(index){
       return this.sibling(-index || -1);
     },

     table: function(){
       var inner = [];
       var result = [];

       if(this.rootArguments.length===1){
         // 年视图
         for(var i=0; i<this.length;i++){
           inner.push('<td><a>'+(+this[i].getMonth()+1)+'</a></td>');
         };

         for(var i=0; i<=this.length;i+=4){
           result += '<tr>' + inner.slice(i, i+4) + '</tr>';
         }

       }else{
         // 月视图
         var firstDay = this.first()[0].getDay(); //第一天星期几
         var lastDay = this.last()[0].getDay();
         var prevDay = this.prev().length;

         // 上个月
         var prevData = [];
         if(firstDay === 0){
           firstDay = 7;
         }
         firstDay = firstDay - 1;
         for(var j=0; j<firstDay;j++){
           prevData.unshift('<td><a class=disabled>'+(prevDay-j)+'</a></td>');
         }

         // 当月
         var nowData = [];
         for(var i=0; i<this.length;i++){
           nowData.push('<td><a>'+this[i].getDate()+'</a></td>');
         };

         // 下个月
         var nextData = [];
         if(lastDay === 0){
           lastDay = 7;
         }
         for(var x=1;x<=7-lastDay;x++){
           nextData.push('<td><a class=disabled>'+x+'</a></td>');
         }

         // 合并上月、当月、下月
         var allData = prevData.concat(nowData.concat(nextData))

         // 按周分割成一行一行的
         for(var y=0; y<=allData.length;y+=7){
           result += '<tr>' + allData.slice(y, y+7) + '</tr>';
         }

         var weekL = allData.length/7;
         var weeks = [];
         for(var y=0; y<weekL; y++){
           weeks[y] = allData.splice(0, 7);
         }
         this.weeks = weeks;
       }
      
       this.value = result.toString().replace(/,/g,'');

       return this;
     }
   };

   // 初始化函数
   // 返回 date日历对象 
   // {
   //   年:{
   //     月:{日,日,日,日,...,日},
   //     月:{日,日,日,日,...,日},
   //     月:{日,日,日,日,...,日},
   //   }
   // }
   // 支持的调用方法
   // date(new Date())
   // date(new Date(2016,2))
   // date(new Date(2016,2,16))
   // date(2016)
   // date(2016,2)
   // date(2016,2,16)

   // date(new Date()).first()
   // date(new Date()).last()
   // date(new Date()).eq(0)

   // 格式转换
   // date(new Date()).format(y-n-d)
   // date(new Date()).html()

   var init = calendar.prototype.init = function(date){
     // 支持 null undefined ""
     this.length = 0;
     // this.splice = [].splice;


     if(!date){
       return this;
     }

     this.rootArguments = date.toString().replace(/[^0-9]/g,' ').split(' ');

     var dateArray = this.rootArguments;

     // 参数为 date(2017)
     if(dateArray.length === 1){

       this.length = 12;

       for(var i=0;i<this.length;i++){
         this[i] = parse(dateArray[0] + '-' + (i+1));
         // this[i] = format(parse(date + ' ' + (i+1)), 'yyyy-MM-dd');
       }

       return this;
     }else if(dateArray.length === 2){

       this.length = dateUtil.getDaysOfMonth(dateArray[0], dateArray[1]);

       for(var i=0; i<=this.length;i++){
         this[i] = parse(dateArray[0] + ' ' + dateArray[1] + ' ' + (i+1));
         // this[i] = format(parse(dateArray[0] + ' ' + dateArray[1] + ' ' + (i+1)), 'yyyy-MM-dd');
       }

       return this;
     }

     return this;
   };

   init.prototype = calendar.prototype;

   $.extend({
     week: function(){
       // console.log(dateUtil.isLeapYear())
     },
     calendar: calendar
   })

   $.extend({
     // 修复 placeholder
     placeholder: function() {
       var supportPlaceHolderInput = document.createElement('input');
       var supportPlaceHolder = 'placeholder' in supportPlaceHolderInput;
       var supportPlaceHolderElement = 'input textarea'
       if (!supportPlaceHolder) {
         // 不支持 placeholder 修复代码
         var elements = $('[placeholder]');
         elements.each(function(i, e) {
           console.log(2)
           var name = e.nodeName.toLocaleLowerCase()
           var need = supportPlaceHolderElement.indexOf(name) >= 0;
           if (need) {
             var ele = $(e)
             var place = ele.attr('placeholder');
             var textele = $('<b class="support-place-holder-text">' + place + '</b>')
             var outele = $('<cite class="support-place-holder"></cite>')
             textele.addClass(e.className)
             ele.wrap(outele)
             ele.on('input keydown', function() {
               textele.addClass('none')
             });
             textele.on('click', function() {
               ele.focus()
             })
             ele.on('blur', function() {
               if (ele.val().length === 0) {
                 textele.removeClass('none')
               }
             })
             ele.after(textele)
           }
         })
       }
     }
   })

}());