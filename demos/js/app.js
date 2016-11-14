var supportAnimation = false;
// 高度无缝动画方法
var funTransitionHeight = function(element, time) { // time, 数值，可缺省
  if (typeof window.getComputedStyle == "undefined") return;

  var height = window.getComputedStyle(element).height;

  element.style.transition = "none"; // 本行2015-05-20新增，mac Safari下，貌似auto也会触发transition, 故要none下~

  element.style.height = "auto";
  var targetHeight = window.getComputedStyle(element).height;
  element.style.height = height;
  element.offsetWidth = element.offsetWidth;
  if (time) element.style.transition = "height " + time + "ms";
  element.style.height = targetHeight;
};

/**
 * 简单封装异步或同步加载资源
 */
window.loads = window.loads || function(_urls, callMyFun, async) {
  var _lds = {
    js: function(_url, callback) {
      var _scipt = document.createElement("script");
      _scipt.setAttribute("type", "text/javascript");
      _scipt.setAttribute("src", _url);
      document.getElementsByTagName("head")[0].appendChild(_scipt);
      if (navigator.userAgent.indexOf("IE") >= 0) {
        _scipt.onreadystatechange = function() {
          if (_scipt && (_scipt.readyState == "loaded" || _scipt.readyState == "complete")) {
            _scipt.onreadystatechange = null;
            callback ? callback() : '';
          }
        };
      } else {
        _scipt.onload = function() {
          _scipt.onload = null;
          // console.log('js加载完成')
          callback ? callback() : '';
        };
      }
    },
    css: function(_url, callback) {
      var _head = document.getElementsByTagName('head')[0],
        _link = document.createElement('link');
      _link.setAttribute("type", "text/css");
      _link.setAttribute("rel", "stylesheet");
      _link.setAttribute("href", _url);
      _head.appendChild(_link);

      _link.onload = function() {
        _head.onload = null;
        // console.log('css加载完成')
        callback ? callback() : '';
      };
    }
  };
  var index = 0,
    asyncNum = 0;
  if (_urls && _urls.length > 0) {
    load(_urls[index]);
  }

  function load(_url) {
    _lds[_url.indexOf('css!') == 0 ? "css" : "js"]((function(_url) {
      return _url.replace(/css!|js!/g, '');
    })(_url), function() {
      if (!async) {
        ++index == _urls.length ? callMyFun() : load(_urls[index])
      } else {
        if (++asyncNum == _urls.length) {
          callMyFun();
        }
      }
    });
    if (async && ++index != _urls.length) {
      load(_urls[index])
    }
  }
}


// 插件
// 富文本依赖
var editorFiles = [
  'js!js/ueditor/ueditor.config.js',
  'js!js/ueditor/ueditor.min.js',
  'js!js/ueditor/lang/zh-cn/zh-cn.js',
  'js!js/ueditor/kityformula-plugin/addKityFormulaDialog.js',
  'js!js/ueditor/kityformula-plugin/getKfContent.js',
  'js!js/ueditor/kityformula-plugin/defaultFilterFix.js',
]

// 手写输入依赖
var handWriteFiles = [
  "css!js/wPaint-2.5.0/lib/wColorPicker.min.css",
  "css!js/wPaint-2.5.0/wPaint.min.css",
  "js!js/wPaint-2.5.0/lib/jquery.ui.core.1.10.3.min.js",
  "js!js/wPaint-2.5.0/lib/jquery.ui.widget.1.10.3.min.js",
  "js!js/wPaint-2.5.0/lib/jquery.ui.mouse.1.10.3.min.js",
  "js!js/wPaint-2.5.0/lib/jquery.ui.draggable.1.10.3.min.js",
  "js!js/wPaint-2.5.0/lib/wColorPicker.min.js",
  "js!js/wPaint-2.5.0/wPaint.min.js",
  "js!js/wPaint-2.5.0/plugins/main/wPaint.menu.main.min.js",
  "js!js/wPaint-2.5.0/plugins/text/wPaint.menu.text.min.js",
  "js!js/wPaint-2.5.0/plugins/shapes/wPaint.menu.main.shapes.min.js",
  "js!js/wPaint-2.5.0/plugins/file/wPaint.menu.main.file.min.js",
  "js!js/wPaint-2.5.0/wPaint.lang.cn.js"
]

// 验证依赖
var VALIDATE_URL = "/js/jquery-validation-1.13.1/dist/jquery.validate.min.js";

// 更改select
$(function() {

  // 支持 animation 吗
  if ('animation' in document.body.style) {
    $('body').addClass('animation');
    supportAnimation = true;
  }

  $(".select select")['select']();
  $('[none]').autonone();
  $('[show]').autoshow();
  $('[autoarea]').autoarea();

  $("[modal]").on('click', function() {
    var selector = $(this).attr('modal');
    $(selector).modal('open')
  })

  var $body = $('body');
  var $win = $(window);

  // 修复 placeholder
  $.placeholder()

  // 页脚居底
  function commonFooterOnBottom() {
    var commonFooter = $('.footer-on-bottom');
    var onBottomofFooter = $('.js-footer-on-bottom');
    var onBottomofFooterH = $win.height() - commonFooter.offset().top - commonFooter.outerHeight();

    if (onBottomofFooter.length == 0) {
      onBottomofFooter = $('<div class="js-footer-on-bottom">');
    }
    onBottomofFooter.css({
      width: '100%',
      height: onBottomofFooterH
    });
    if (onBottomofFooterH > 0) {
      commonFooter.before(onBottomofFooter);
    }
  }
  if ($('.footer-on-bottom').length > 0) {
    commonFooterOnBottom()
  }
  window.commonFooterOnBottom = commonFooterOnBottom;

  // 左菜单满屏
  function commonNavOver() {
    var commonNav = $('.common-nav');
    if (commonNav.length > 0) {
      commonNav.height('auto')
      var docH = $(document).height();
      var commonNavH = commonNav.height();
      var commonHeaderH = $('.common-header').height();

      if (commonNavH < docH - commonHeaderH) {
        commonNav.height(docH - commonHeaderH);
      }
    }
  }
  commonNavOver();
  window.commonNavOver = commonNavOver;
  window.onload = commonNavOver;

  // 切换左菜单宽度
  $('.switch-common-nav').on('click', function() {
    $('body').toggleClass('common-nav-min');
  })


  $('.js-toggle-table').on('click', function() {
    $(this).parents('.common-table').toggleClass('common-table-open');
  });

  $('[toggle-show]').on('click', function() {
    $($(this).attr('[toggle-show]')).toggleClass('none');
  });

  $('.someone-answer .toggle-show, .js-close-my-answer').on('click', function() {
    $(this).parents('.someone-answer').toggleClass('toggle-show-open');
  })

  $('.js-toggle-parents').on('click', function() {
    $(this).parents('.js-toggle').toggleClass('js-toggle-none');
  });

  // 登录页页脚居底，内容居中显示
  function loginFooterAndContent() {
    var content = $('.page-login');
    var footer = $('.common-footer');
    content.height('')
    var cacheContentH = content.height()
    var contentH = $win.height() - footer.outerHeight();

    $('.page-login').nextAll('.js-footer-on-bottom').hide()
    if (contentH > cacheContentH) {
      content.height(contentH)
    }
  }
  if ($('.page-login').length > 0) {
    loginFooterAndContent()
  }

  loginFooterAndContent();

  $(window).on('resize', function() {
    if ($('.page-login').length > 0) {
      loginFooterAndContent()
    }
    commonNavOver();
  })

  var notSupportHtml = '<div class="not-support">\
          <a class="not-support-close"></a>\
          <div class="not-support-bg"></div>\
          <h3>图表功能暂不支持您的浏览器，建议使用以下浏览器访问</h3>\
          <ul>\
          <li class="ie"><i></i>IE8 或 IE8以上浏览器 <a href="http://ie.microsoft.com" target="_blank">下载</a></li>\
          <li class="firefox"><i></i>Firefox <a href="http://www.firefox.com.cn/download/" target="_blank">下载</a></li>\
          <li class="chrome"><i></i>Chrome <a href="http://down.tech.sina.com.cn/page/40975.html" target="_blank">下载</a></li>\
          <li class="i360"><i></i>360浏览器 <a href="http://se.360.cn" target="_blank">下载</a></li>\
          </ul>\
          </div>';
  if ($('html').hasClass('ie6') || $('html').hasClass('ie7')) {
    if (typeof echarts === 'object') {
      setTimeout(function() {
        $('.crumbs').after(notSupportHtml)
        $('.not-support').animate({
            height: '110px'
          }, 1000)
          // 不支持显示浏览器提示
        $('.not-support-close').click(function() {
          $('.not-support').hide();
        })
      }, 300)
    }
  };


  // 设置验证默认规则
  $.setValidator = function() {
    $.validator.setDefaults({
      errorClass: "label-error",
      focusCleanup: false,
      focusInvalid: false,
      invalidHandler: function(event, validator) {
        var errorsLength = validator.numberOfInvalids();
        if (errorsLength > 0) {
          // 定位到错误元素
          var firsterror = validator.errorList[0].element;
          // $(firsterror).scrollTo(-80);
        }
      },
      // 自定义opation错误样式
      errorPlacement: function(error, element) {
        var nodeName = element.prop("nodeName").toLocaleLowerCase();
        if (nodeName != "select") {
          element.after(error);
        } else {
          error.insertAfter(element.parent());
        }
      }
    });
    $.validator.methods.email = function(value, element) {
      return this.optional(element) || /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
    };
    $.validator.methods.idcardsexdate = function(value, element) {
      if (this.optional(element)) {
        return true;
      } else {
        var dataObj = strToJson($(element).data('rule-idcardsexdate'));
        var nsex = dataObj.sex;
        var nyear = dataObj.date.split(' ')[0]
        var nmonth = dataObj.date.split(' ')[1]

        var sex = parseInt($('[name=' + nsex + ']:checked').val())
        var year = parseInt($('[name=' + nyear + ']').val())
        var month = parseInt($('[name=' + nmonth + ']').val())

        var idcard = new IDValidator()

        if (idcard.isValid(value)) {
          var idcardObj = idcard.getInfo(value);

          if (idcardObj.length === 18) {
            var resultSex, resultDate, resultMonth;
            resultSex = sex && sex == idcardObj.sex || sex == idcardObj.sex + 2; // 性别
            resultYear = !year || year == idcardObj.birth.split('-')[0]; // 年份
            resultMonth = !month || month == idcardObj.birth.split('-')[1]; // 月份

            return resultSex && resultYear && resultMonth;
          } else {
            return false;
          }

        } else {
          return false;
        }
      }
    };
    $.validator.methods.telephone = function(value, element) {
      return this.optional(element) || /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(1)\d{10}$)/.test(value)
    }
    $.validator.methods.phone = function(value, element) {
      return this.optional(element) || /^[1][3|4|5|7|8|9][0-9]{9}$/.test(value)
    }
    $.validator.methods.space = function(value, element) {
      return this.optional(element) || /^[^\s]+$/.test(value)
    }
    $.validator.methods.fullname = function(value, element) {
      return this.optional(element) || /^[\u4E00-\u9FA5]{2,4}$/.test(value)
    }
    $.validator.methods.nickname = function(value, element) {
      return this.optional(element) || /^[a-zA-Z_]+[a-zA-Z0-9_]+$/.test(value)
    }
    $.extend($.validator.messages, {
      required: "这是必填字段",
      remote: "请修正此字段",
      email: "请输入有效的电子邮件地址",
      url: "请输入有效的网址",
      date: "请输入有效的日期",
      dateISO: "请输入有效的日期 (YYYY-MM-DD)",
      number: "请输入有效的数字",
      digits: "只能输入数字",
      creditcard: "请输入有效的信用卡号码",
      equalTo: "你的输入不相同",
      extension: "请输入有效的后缀",
      maxlength: $.validator.format("最多可以输入 {0} 个字符"),
      minlength: $.validator.format("最少要输入 {0} 个字符"),
      rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
      range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
      max: $.validator.format("请输入不大于 {0} 的数值"),
      min: $.validator.format("请输入不小于 {0} 的数值"),
      idcardsexdate: '请输入有效身份证号',
      telephone: '请输入有效联系电话',
      phone: '请输入有效手机号码',
      space: '不能包含空格',
      fullname: '请输入真实名称',
      nickname: '可包含英文、数字、下划线，不能以数字开头'
    });
    $.setValidator = function() {};
  };
  if ($.validator) {
    $.setValidator();
  }




  if ($('[isvalid]').length > 0) {
    loadjs(VALIDATE_URL, function() {
      $.setValidator();

      $('[isvalid]').validate({
        // debug:true
      });
      $('[submit-button]').on('click', function() {

        var pass = $(this).parents('form').valid();
        if (pass) {
          var callback = $(this).parents('form').find('[onsuccess]').attr('onsuccess');
          callback = window[callback]
          callback();
        }
        return false;
      })
    });
  }


  // 修复 placeholder
  var supportPlaceHolderInput = document.createElement('input');
  var supportPlaceHolder = 'placeholder' in supportPlaceHolderInput;
  var supportPlaceHolderElement = 'input textarea'
  if (!supportPlaceHolder) {
    // 不支持placeholder修复代码
    var elements = $('[placeholder]');
    elements.each(function(i, e) {
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

  // nalert
  window.nalert = function(msg) {
    var ele = false;
    if (!ele) {
      ele = document.createElement('div')
      ele.id = "nalert";
      document.body.insertBefore(ele, document.body.childNodes[0])
    };
    ele.innerHTML = msg;
    ele.className = "";
    var clearTime = setTimeout(function() {
      $(ele).remove()
    }, 2000)
  }

  //tab
  $('.js-tabheader a').on('click', function() {
    $(this).parents('.js-tabheader').find('a').removeClass('now')
    $(this).addClass('now')
  })

  // 初始化富文本框
  window.initEditor = function(ueId, callback,i) {
    if (typeof UE === 'object') {
      init(ueId, callback,i)
    } else {
      loads(editorFiles, function() {
        init(ueId, callback,i)
      });
    }

    function init(ueId, callback,i) {
      var ue = UE.getEditor(ueId);
      ue.ready(function() {
        commonNavOver();
        callback(i)
      })
    }
  }
  window.getEditorObj = function(ueId) {
    return UE.getEditor(ueId);
  }
  window.getEditorContent = function(ueId) {
    return getEditorObj(ueId).getContent()
  }
  window.setEditorContent = function(ueId, content) {
    getEditorObj(ueId).setContent(content)
  }

  window.initPaint = function(wpId, callback, saveCallback) {
    var config = {
      menuOffsetLeft: 0,
      menuOffsetTop: -50,
      path: 'js/wPaint-2.5.0/',
      lineWidth: '3', // starting line width
      fillStyle: '#000', // starting fill style
      strokeStyle: '#99FF00' // start stroke style
        // saveImg: saveImg,
        // loadImgBg: loadImgBg,
        // loadImgFg: loadImgFg
    }
    if (saveCallback) {
      $.extend(config, {
        saveImg: saveCallback
      })
    }

    if (!!$.fn.wPaint) {
      (function() { init(wpId, callback) })()
    } else {
      loads(handWriteFiles, function() {
        init(wpId, callback)
      });
    }


    config.saveImg = saveCallback



    function init(wpId, callback) {
      var $paintDom = $('#' + wpId);
      $paintDom.wPaint(config);
      commonNavOver()
      callback && callback()
    }
  }

  window.getPaintObj = function(wpId) {
    return $('#' + wpId);
  }
  window.getPaintContent = function(wpId) {
    return getPaintObj(wpId).wPaint("image");
  }
  window.setPaintContent = function(wpId, src) {
    getPaintObj(wpId).wPaint("image", src)
  }
  window.clearPaintContent = function(wpId) {
    getPaintObj(wpId).wPaint("clear")
  }
  window.setPaintWidth = function(wpId, w) {
    getPaintObj(wpId).width(w).wPaint('resize');
  }
  window.setPaintHeight = function(wpId, h) {
    getPaintObj(wpId).height(h).wPaint('resize');
    commonNavOver();
  }

  window.renderHtml=function(url, data){
    $.get(url, function(res){
      var render = template.compile(res);
      $('.common-main').html(render(data));
      commonNavOver()
    })
  };

  $('.u-menu').on('click', 'a', function(){
    $('.u-menu a.now').removeClass('now');
    $(this).addClass('now');
  });

})

// 答题卡
function togglebox() {
  var $dom = $(".answer-content");
  var a = $dom.height();
  var t = -a - 10;
  // var t1 = -a + 30;
  $dom.css({
    'top': t,
    'left': 'auto'
  })
  $dom.toggle()
}

var _move = false;
var _x, _y;

$(document).ready(function() {
  var $dom = $(".answer-content");
  var $domP = $dom.parent();
  var $darg = $("#drag");
  var mixTop, maxTop;

  $("#drag h3").mousedown(function(e) {
    _move = true;
    _x = e.pageX - parseInt($("#drag").css("left"));
    _y = e.pageY - parseInt($("#drag").css("top"));

    mixTop = mixTop || ($darg.offset().top + $darg.height() + 10) * -1;
    maxTop = maxTop || ($darg.height() + 10) * -1 + $(document).height() + mixTop;

  });
  $(document).on('mousemove', function(e) {
    if (_move) {
      var x = e.pageX - _x;
      var y = e.pageY - _y;
      var dargLeft = $darg.offset().left
      var dargTop = $darg.offset().Top
      var dargW = $darg.width();

      var minLeft = ($('.common-nav').width() + 20) * -1;
      var maxLeft = 230 + $domP.width() - $darg.width();


      x<minLeft && (x=minLeft), 
      x>maxLeft && (x=maxLeft), 
      y<mixTop && (y=mixTop),
      y>maxTop && (y=maxTop);

      $("#drag").css({ top: y, left: x });
    }
  })

  $(document).on('mouseup mouseleave',function() {
    _move = false;
  });
});
