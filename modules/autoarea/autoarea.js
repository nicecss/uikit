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
