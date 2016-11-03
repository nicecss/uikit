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
