/*! loadjs: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
(function(w) {
  var loadjs = function(src, cb) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = src;
    script.onload = script.onreadystatechange = function(){

      if(!script.readyState || script.readyState == "loaded"){
        if(cb || typeof cb == "function"){
          cb()        
        }
      }
    }
    head.appendChild(script);
    return script;
  }
  // commonjs
  if (typeof module !== "undefined") {
    module.exports = loadjs;
  } else {
    w.loadjs = loadjs;
  }
}(typeof global !== "undefined" ? global : window));
