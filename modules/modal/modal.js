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
