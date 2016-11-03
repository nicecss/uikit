
import util from '../util/util.js';

var dateUtil = {};

dateUtil.isDate = function(object){
  if(util.getType(object) === 'date'){
    return true;
  }else{
    return false;
  }
};

// @description 是否为闰年
// @param year {num} 可能是年份或者为一个date实例对象
// @return {boolean} 返回值
dateUtil.isLeapYear = function(year){
  if(dateUtil.isDate(year)){
    year = year.getFullYear();
  }
  if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){
    return true;
  }else{
    return false;
  }
};

dateUtil.getDaysOfMonth = function(year, month){
  if(dateUtil.isDate(year)){
    month = year.getMonth()+1;
    year = year.getFullYear();
  }
  return [31, dateUtil.isLeapYear(year)? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month-1];
};

dateUtil.getBeginDayOfMouth = function(year, month){
  if(dateUtil.isDate(year)){
    month = year.getMonth();
    year = year.getFullYear();
  }
  return new Date(year, month-1).getDay();
};

// 传入 date 对象，返回 date 字符串
// dateFormat(new Date(), 'yyyy-MM-dd')
function format(dateObject, format){
  format = format.replace('yyyy', dateObject.getFullYear());
  format = format.replace('MM', dateObject.getMonth() + 1);
  format = format.replace('dd', dateObject.getDate());
  return format;
}

// 传入 date 字符串，返回 Date 日期对象
function parse(dateString){

  if(dateUtil.isDate(dateString)){return dateString};

  if(util.getType(dateString)==='string'){
    return new Date(dateString.toString().replace(/[^0-9]/g," "));
  }

  return null;
}

var calendar = function(date){
  return new calendar.prototype.init(date);
};

calendar.prototype = {
  constructor: calendar,
  length: 0,

  pushStack: function( elems ) {
    // Build a new jQuery matched element set
    var ret = util.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    // Return the newly-formed element set
    return ret;
  },

  toArray: function(){
    if(util.getType(this.rootArguments)==='string'){
      return this.rootArguments.replace(/[^0-9]/g,' ').split(' ');
    }
  },

  eq: function(i){
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
  },

  slice: function(){
    return this;
    // util.merge(this, this.pushStack([].slice.apply(this, arguments)))
  },

  first: function(){
    return this.eq(0);
  },

  last: function(){
    return this.eq(this.length - 1);
  },

  sibling: function( dir ) {
    // return this.constructor(this.year && this.year+dir, this.month && this.month+dir, this.date && this.date+dir);
    
    if(this.rootArguments.length === 1){
      var nowDate = new Date(this.rootArguments[0]);
      nowDate.setFullYear(nowDate.getFullYear() + dir);
      return this.constructor(nowDate.getFullYear())
    }else{
      var nowDate = new Date(this.rootArguments[0] + '.' + this.rootArguments[1]);
      nowDate.setMonth(nowDate.getMonth() + dir);
      var nDate = nowDate.getFullYear();
      var nMonth = nowDate.getMonth()+1;
      return this.constructor(nDate + '.' + nMonth)
    }
  },

  next: function(index){
    return this.sibling(index || 1);
  },

  prev: function(index){
    return this.sibling(-index || -1);
  },

  table: function(){
    var inner = [];
    var result = [];

    if(this.rootArguments.length===1){
      // 年视图
      for(var i=0; i<this.length;i++){
        inner.push('<td><a>'+(+this[i].getMonth()+1)+'</a></td>');
      };

      for(var i=0; i<=this.length;i+=4){
        result += '<tr>' + inner.slice(i, i+4) + '</tr>';
      }

    }else{
      // 月视图
      var firstDay = this.first()[0].getDay(); //第一天星期几
      var lastDay = this.last()[0].getDay();
      var prevDay = this.prev().length;

      // 上个月
      var prevData = [];
      if(firstDay === 0){
        firstDay = 7;
      }
      firstDay = firstDay - 1;
      for(var j=0; j<firstDay;j++){
        prevData.unshift('<td><a class=disabled>'+(prevDay-j)+'</a></td>');
      }

      // 当月
      var nowData = [];
      for(var i=0; i<this.length;i++){
        nowData.push('<td><a>'+this[i].getDate()+'</a></td>');
      };

      // 下个月
      var nextData = [];
      if(lastDay === 0){
        lastDay = 7;
      }
      for(var x=1;x<=7-lastDay;x++){
        nextData.push('<td><a class=disabled>'+x+'</a></td>');
      }

      // 合并上月、当月、下月
      var allData = prevData.concat(nowData.concat(nextData))

      // 按周分割成一行一行的
      for(var y=0; y<=allData.length;y+=7){
        result += '<tr>' + allData.slice(y, y+7) + '</tr>';
      }

      var weekL = allData.length/7;
      var weeks = [];
      for(var y=0; y<weekL; y++){
        weeks[y] = allData.splice(0, 7);
      }
      this.weeks = weeks;
    }
   
    this.value = result.toString().replace(/,/g,'');

    return this;
  }
};

// 初始化函数
// 返回 date日历对象 
// {
//   年:{
//     月:{日,日,日,日,...,日},
//     月:{日,日,日,日,...,日},
//     月:{日,日,日,日,...,日},
//   }
// }
// 支持的调用方法
// date(new Date())
// date(new Date(2016,2))
// date(new Date(2016,2,16))
// date(2016)
// date(2016,2)
// date(2016,2,16)

// date(new Date()).first()
// date(new Date()).last()
// date(new Date()).eq(0)

// 格式转换
// date(new Date()).format(y-n-d)
// date(new Date()).html()

var init = calendar.prototype.init = function(date){
  // 支持 null undefined ""
  this.length = 0;
  // this.splice = [].splice;


  if(!date){
    return this;
  }

  this.rootArguments = date.toString().replace(/[^0-9]/g,' ').split(' ');

  var dateArray = this.rootArguments;

  // 参数为 date(2017)
  if(dateArray.length === 1){

    this.length = 12;

    for(var i=0;i<this.length;i++){
      this[i] = parse(dateArray[0] + '-' + (i+1));
      // this[i] = format(parse(date + ' ' + (i+1)), 'yyyy-MM-dd');
    }

    return this;
  }else if(dateArray.length === 2){

    this.length = dateUtil.getDaysOfMonth(dateArray[0], dateArray[1]);

    for(var i=0; i<=this.length;i++){
      this[i] = parse(dateArray[0] + ' ' + dateArray[1] + ' ' + (i+1));
      // this[i] = format(parse(dateArray[0] + ' ' + dateArray[1] + ' ' + (i+1)), 'yyyy-MM-dd');
    }

    return this;
  }

  return this;
};

init.prototype = calendar.prototype;

$.extend({
  week: function(){
    // console.log(dateUtil.isLeapYear())
  },
  calendar: calendar
})