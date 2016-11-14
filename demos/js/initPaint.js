/****
手写输入
*****/
;
(function() {

  var init = function() {
    var images = [
      'images/book-1.jpg',
      'images/demo-question-img1.jpg'
    ];

    var $paintDom = $('#fh-wpaint')

    function saveImg(image) {
      var _this = this;

      _this._displayStatus('保存成功');
      // 保存图片流程
      // 1 上传图片到服务器，图片格式是 data:image/png;base64
      // 2 服务器处理图片，并返回JSON,包含图片地址。
      //   {
      //     img: 'images/***.jpg'
      //   }
      // 3 拿到图片做一些事情

      // $.ajax({
      //   type: 'POST',
      //   url: '/test/upload.php',
      //   data: { image: image },
      //   success: function(resp) {

      //     // internal function for displaying status messages in the canvas
      //     _this._displayStatus('保存成功');

      //     // doesn't have to be json, can be anything
      //     // returned from server after upload as long
      //     // as it contains the path to the image url
      //     // or a base64 encoded png, either will work
      //     resp = $.parseJSON(resp);

      //     // update images array / object or whatever
      //     // is being used to keep track of the images
      //     // can store path or base64 here (but path is better since it's much smaller)
      //     images.push(resp.img);

      //     // do something with the image
      //   }
      // });
    }

    function loadImgBg() {

      // internal function for displaying background images modal
      // where images is an array of images (base64 or url path)
      // NOTE: that if you can't see the bg image changing it's probably
      // becasue the foregroud image is not transparent.
      // 载入背景图片，images 是地址数组
      this._showFileModal('bg', images);
    }

    function loadImgFg() {

      // internal function for displaying foreground images modal
      // where images is an array of images (base64 or url path)
      this._showFileModal('fg', images);
    }

    

    // 宽度100%
    // $(window).on('resize', function() {
    //   $('#fh-wpaint').css({
    //     width: $('#fh-wpaint').parent('.tab-paint').width(),
    //     height: $('#fh-wpaint').parent('.tab-paint').height()
    //   }).wPaint('resize');
    // });

    commonNavOver();

    window.getPaintData = function(){
      var imageData = $paintDom.wPaint("image");
      return imageData;
    }
    window.setPaintWidth = function(w){
      $paintDom.width(w).wPaint('resize');
    }
    window.setPaintHeight = function(h){
      $paintDom.height(h).wPaint('resize');
      commonNavOver();
    }

    // init wPaint
    $paintDom.wPaint({
      menuOffsetLeft: 0,
      menuOffsetTop: -50,
      path: 'js/wPaint-2.5.0/',
      lineWidth: '3', // starting line width
      fillStyle: '#000', // starting fill style
      strokeStyle: '#99FF00', // start stroke style
      saveImg: saveImg,
      loadImgBg: loadImgBg,
      loadImgFg: loadImgFg
    });
  }

  if (typeof $.fn.wPaint === 'function') {
    // init()
  } else {
    loads(handWriteFiles, init);
  }


})();
