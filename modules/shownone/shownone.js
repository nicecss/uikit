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