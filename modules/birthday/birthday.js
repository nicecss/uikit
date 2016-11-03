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
