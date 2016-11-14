$.fn.extend({
  autoarea: function() {
    var $this = $(this);
    var autoH = function() {
      $this.height("")
      $this.height($this.prop('scrollHeight') - parseFloat($this.css('padding-top')) - parseFloat($this.css('padding-bottom')))
    }
    $this.on("input keydown", autoH);
    autoH()
  }
})
