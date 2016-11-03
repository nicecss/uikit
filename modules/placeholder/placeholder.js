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
