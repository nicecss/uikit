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
