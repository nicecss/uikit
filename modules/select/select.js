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
