!function(){
  this.multiline = function(s){
    return s.toString()
            .replace(/^[^\/]+\/\*/, '')
            .replace(/\*\/[^\/]+$/, '')
            .replace(/^!?/, '') // YUI
            .replace(/^(\s*@preserve)?/, '') // uglify-js
  }
}();

