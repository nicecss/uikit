/****
 答题相关JS
****/


// 保存进度 下次答题
$('.js-save-que').on('click', function(){
  //1 提交保存进度
  $('.mo-save-que').modal('open');
})


// 提交试卷
$('.js-submit-que').on('click', function(){
  //1 检测有没有未做题，给于提示。
  //2 提交试卷


  // 检测有没有未做题
  // 如果有返回 true ，没有返回 false
  var haveUnfinished = function(){
    return true;
  }; 

  if(haveUnfinished()) {
    // 有未做题，弹窗提示未做题
    $('.mo-stat-que').modal('open');
  }else{
    nalert("交卷成功")
  }
})