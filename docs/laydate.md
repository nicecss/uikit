---
title: laydate
tags: 日期组件
---

## 外部js调用

```html
<input id="hello" class="laydate-icon">
<script>
laydate({
  elem: '#hello', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
  event: 'focus' //响应事件。如果没有传入event，则按照默认的click
});
</script>

```

## 图标触发日期

```html

<input id="hello1">
<span class="laydate-icon" onclick="laydate({elem: '#hello1'});"></span>

```

## 自定义日期格式

```html
<div id="test1" class="laydate-icon"></div>
<script>
laydate({
  elem: '#test1',
  format: 'YYYY/MM', // 分隔符可以任意定义，该例子表示只显示年月
  festival: true, //显示节日
  choose: function(datas){ //选择日期完毕的回调
    alert('得到：'+datas);
  }
});
</script>

```

## 日期范围限定在昨天到明天

```html
<div id="test1" class="laydate-icon"></div>
<script>
laydate({
  elem: '#test1',
  format: 'YYYY/MM', // 分隔符可以任意定义，该例子表示只显示年月
  festival: true, //显示节日
  choose: function(datas){ //选择日期完毕的回调
    alert('得到：'+datas);
  }
});
</script>

```

## 日期范围限制

```html

开始日：<li class="laydate-icon" id="start" style="width:200px; margin-right:10px;"></li>
结束日：<li class="laydate-icon" id="end" style="width:200px;"></li>
<script>
var start = {
  elem: '#start',
  format: 'YYYY/MM/DD hh:mm:ss',
  min: laydate.now(), //设定最小日期为当前日期
  max: '2099-06-16 23:59:59', //最大日期
  istime: true,
  istoday: false,
  choose: function(datas){
     end.min = datas; //开始日选好后，重置结束日的最小日期
     end.start = datas //将结束日的初始值设定为开始日
  }
};
var end = {
  elem: '#end',
  format: 'YYYY/MM/DD hh:mm:ss',
  min: laydate.now(),
  max: '2099-06-16 23:59:59',
  istime: true,
  istoday: false,
  choose: function(datas){
    start.max = datas; //结束日选好后，重置开始日的最大日期
  }
};
laydate(start);
laydate(end);
</script>
    

```


