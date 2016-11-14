/*
 * 工具函数
 *
 */
function toolUser(data, prefix) {
  return {
    data: [{
      value: data[prefix + '_student'],
      name: '老师'
    }, {
      value: data[prefix + '_teacher'],
      name: '学生'
    }]
  }
}

// 设置本月用户
function setUsersMonth(data) {
  var result = {
    series: [toolUser(data, 'total'), toolUser(data, 'active'), toolUser(data, 'add')]
  }
  var $dataH2 = $('.data-num h2');
  $dataH2.eq(0).text(data.total) //总用户
  $dataH2.eq(1).text(data.active) //活跃用户
  $dataH2.eq(2).text(data.add) //新增用户

  var $dataR = $('.users-month-data .data-o .data-r');
  // $dataR.eq(0).find('h3 strong').text(data.total)
  $dataR.eq(0).find('.data-r-s .t strong').text(data.total_teacher)
  $dataR.eq(0).find('.data-r-s .s strong').text(data.total_student)

  // $dataR.eq(1).find('h3 strong').text(data.active)
  $dataR.eq(1).find('.data-r-s .t strong').text(data.active_teacher)
  $dataR.eq(1).find('.data-r-s .s strong').text(data.active_student)

  // $dataR.eq(2).find('h3 strong').text(data.add)
  $dataR.eq(2).find('.data-r-s .t strong').text(data.add_teacher)
  $dataR.eq(2).find('.data-r-s .s strong').text(data.add_student)
  return result;
}

// 设置用户数据
function setUsersNumber(data) {
  var result = {
    xAxis: [{
      data: data.xsis
    }],
    series: [{
      name: '老师',
      data: data.teacher
    }, {
      name: '学生',
      data: data.student
    }]
  }
  return result;
}

// 设置互动数据
function setInteractMonth(data) {
  $('.interact-maxnum').html('<span>最多课时 / '+data.maxSubject+'</span>'+data.maxSum)
  var result = {
    xAxis: [{
      data: data.xsis
    }],
    series: [{
      data: data.ysis
    }]
  }
  return result;
}

// 设置资源统计详情
function setResourceUsage(data) {
  $('.resource-maxnum').html('<span>共</span>'+data.total)
  var result = [];
  var legend = []
  var i = 0;
  $.each(data.list, function(k) {
    result[i] = {}
    result[i]['value'] = parseFloat(this);
    result[i]['name'] = k;
    legend[i] = k;
    i++;
  });
  result = {
    series: [{
      data: result
    }],
    legend: {
      data: legend
    }
  }
  return result;
}

// 设置登录统计
function setLoginMonth(data){
  var result = {
    series: [{
      data: data.teacher,
      name: '老师'
    },{
      data: data.student,
      name: '学生'
    }],
    xAxis: [{
      data: data.xsis
    }]
  };
  return result;
}

var legendStyle = {
  data: ['老师', '学生'],
  // x: 'right',
  top: 20,
  right: 20,
  itemWidth: 11,
  itemHeight: 11,
  itemGap: 18,
  textStyle: {
    'color': '#A9A9A9',
    'fontSize': 12
  },
  icon: 'roundRect',
  selectedMode: false
}

/*
 * 初始化画布
 *
 */

var usersMonth = document.getElementById('users-month') && echarts.init(document.getElementById('users-month'), 'mj'); // 本月用户
var usersNumber = document.getElementById('users-number') && echarts.init(document.getElementById('users-number'), 'mj'); // 用户总数
var interactMonth = document.getElementById('interact-month') && echarts.init(document.getElementById('interact-month'), 'mj'); // 本月互动课时
var resourceUsage = document.getElementById('resource-usage') && echarts.init(document.getElementById('resource-usage'), 'mj'); // 资源使用统计
var loginMonth = document.getElementById('login-month') && echarts.init(document.getElementById('login-month'), 'mj'); // 本月登录统计

// 本月用户
var usersMonthOption = {
  title: {
    text: '本月用户',
    left: 25,
    top: 15
  },
  tooltip: {
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: legendStyle,
  color: ['#57ABFB', '#1FD9A3'],
  series: [{
    name: '总用户',
    type: 'pie',
    center: ['115', '160'],
    data: [],
    radius: ['64', '70'],
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        show: false,
        position: 'center'
      }
    }
  }, {
    name: '活跃用户',
    type: 'pie',
    center: ['290', '160'],
    data: [],
    radius: ['64', '70'],
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        show: false,
        position: 'center'
      }
    }
  }, {
    name: '新增用户',
    type: 'pie',
    center: ['465', '160'],
    data: [],
    radius: ['64', '70'],
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        show: false,
        position: 'center'
      }
    }
  }]
}

// 用户总数
var usersNumberOption = {
  color: ['#57ABFB', '#1FD9A3'],
  title: {
    text: '用户总数',
    top: 15
  },
  tooltip: {
    trigger: 'axis',
    formatter: "{b}<br />{a0}：{c0}<br /> {a1}：{c1}"
  },
  legend: legendStyle,
  grid: {
    left: 20,
    right: 20,
    bottom: 30,
    top: 80,
    containLabel: true,
  },
  itemStyle: {
    normal: {
      opacity: 0
    }
  },
  lineStyle: {
    normal: {
      opacity: 0
    }
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: '老师',
    type: 'line',
    z: 1,
    areaStyle: {
      normal: {
        opacity: 0.8
      }
    },
    data: [],

  }, {
    name: '学生',
    type: 'line',
    z: 0,
    areaStyle: { normal: { opacity: 1 } },
    data: []
  }]
}

// 互动课时
var interactMonthOption = {
  color: ['#C17BF7'],
  title: {
    text: '本月互动课时',
    top: 15,
    left: 25
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: "{a} <br/>{b}: {c}",
  },
  grid: {
    left: 30,
    right: 30,
    bottom: 30,
    top: 80,
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: '直接访问',
    type: 'bar',
    barWidth: '10',
    data: [],
    itemStyle: {
      normal: {
        barBorderRadius: 2
      }
    }
  }]
};

// 资源使用统计
var resourceUsageOption = {
  title: {
    text: '资源使用统计',
    left: 25,
    top: 15
  },
  tooltip: {
    formatter: "{b} {c}",
    show: false
  },
  legend: {
    data: [],
    x: 'center',
    bottom: 20,
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 25,
    textStyle: {
      'color': '#A9A9A9',
      'fontSize': 12
    },
    icon: 'circle',
    selectedMode: false
  },
  color: ['#36BDF6', '#5D9BE9', '#1FD9A3', '#EBDE08', '#FBCF97', '#D7D7D7'],
  series: [{
    type: 'pie',
    center: ['50%', '48%'],
    data: [],
    radius: ['40', '85'],
    labelLine: {
      normal: {
        show: false,
        length: 20,
        length2: 20,
        lineStyle: {
          color: '#bbb'
        }
      },
      emphasis: {
        show: true

      }
    },
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: true,
        formatter: '{b} {c}',
        textStyle: {
          color: '#333',
          fontSize: 18
        }
      }
    }
  }]
}

// 本月登录统计
var loginMonthOption = {
  color: ['#57ABFB', '#1FD9A3'],
  title: {
    text: '本月登录统计',
    top: 15,
    left: 20
  },
  tooltip: {
    trigger: 'axis',
    formatter: "{b}<br />{a0}：{c0}<br /> {a1}：{c1}"
  },
  legend: legendStyle,
  grid: {
    left: 20,
    right: 30,
    bottom: 30,
    top: 80,
    containLabel: true,
  },
  // itemStyle: {
  //   normal: {
  //     opacity: 0
  //   }
  // },
  // lineStyle: {
  //   normal: {
  //     opacity: 0
  //   }
  // },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: '老师',
    type: 'line',
    z: 1,
    areaStyle: {
      normal: {
        opacity:0
      }
    },
    data: [],

  }, {
    name: '学生',
    type: 'line',
    z: 0,
    areaStyle: { normal: { opacity: 0 } },
    data: []
  }]
}
