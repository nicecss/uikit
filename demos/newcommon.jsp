<%@ page import="com.haiziwang.pop.util.PropertiesUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:set var="ct" value="${pageContext.request.contextPath}"/>
<%
  /**
   * 公用页面
   */
  //sso接口服务地址
  String ssoSite = PropertiesUtils.getProperty("sso_site");
  //应用编码
  String appCode = PropertiesUtils.getProperty("app_code");

  response.setHeader("Pragma", "No-Cache");
  response.setDateHeader("Expires", 0);
  response.setHeader("Cache-Control", "no-Cache");
%>
<link href="${ct}/static/assets/popui/css/ui.css" rel="stylesheet" type="text/css"/>
<link href="${ct}/static/assets/popui/css/app.css" rel="stylesheet" type="text/css"/>
<script src="${ct}/static/assets/popui/js/jquery-1.12.4.min.js"></script>
<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
<script src="${ct}/static/assets/popui/js/ui.js"></script>
<script src="${ct}/static/assets/popui/js/app.js"></script>
<script src="${ct}/static/js/common.js" type="text/javascript"></script>
<script src="${ct}/static/js/base64.js" type="text/javascript"></script>
<script src="${ct}/static/js/plugin/json2.js" type="text/javascript"></script>

<script>
  /*****获取cookie*****/
  function getcookie(cookiename) {
  	var cookiestring = document.cookie;
  	var c ="";
  	var start = cookiestring.indexOf(cookiename+'=');
  	if (start == -1) {
  		return "";
  	}
  	start += cookiename.length + 1;
  	var end = cookiestring.indexOf(";", start);
  	if (end == -1) {
  		//unescape(cookiestring.substring(start));
  		c= cookiestring.substring(start);
  	}
  	else
  	{
  	    c= cookiestring.substring(start, end);
  	}
  	 return c;
  }

  /**
   * init resource control
   */
  function initRCL() {
	  var $data_resource = $("[data-resource]");
    $data_resource.hide();
    var userId = window.Base64.decode(getCookie("siteUserId"));
    //loadShortUserFromSSO();
    loadResourceForUser({userId:userId});
    /**
     * 加载sso 用户信息
     */
    function loadShortUserFromSSO() {
      var apiUrl = "<%=ssoSite%>/sso-web/checkuser/checkLogin.do";
      var params = {appCode: "<%=appCode%>"};
      var success = function (result) {
        $.GLOBAL_USER = result.data['shortUser'];
        loadResourceForUser(result.data['shortUser']);
      };
      loadFromDomain(apiUrl, params, success);
    }

    /**
     * 加载用户资源列表
     * @param user 用户
     */
    function loadResourceForUser(user) {
      var siteToken = window.Base64.encode(getcookie("siteToken"));
      var apiUrl = "<%=ssoSite%>/sso-web/checkuser/getResList.do";
      var params = {userId: user.userId, appCode: "<%=appCode%>",siteToken:siteToken};
      var success = function (result) {
        $.GLOBAL_RESOURCE_LIST = result.data;
        controlResource();
      };
      loadFromDomain(apiUrl, params, success);
    }

    /**
     * 控制资源显示
     */
    function controlResource() {
      $data_resource.each(function () {
        var $this = $(this);
        var dataResourceArr = $this.attr("data-resource").split(",");
        for (var i = 0; i < dataResourceArr.length; i++) {
          if ($.hasPermission(dataResourceArr[i])) {
            $this.show();
            break;
          }
        }
      });
    }

    /**
     * 从域加载数据
     * @param apiUrl
     * @param apiParams
     * @param callback
     */
    function loadFromDomain(apiUrl, apiParams, callback) {
      var api = {url: apiUrl, params: apiParams};
      var timestamp=Math.round(new Date().getTime()/1000);
      $.ajax({
        url: "${ct}/domain.api",
        data: {api: JSON.stringify(api),
        	   timestamp: timestamp	
        },
        success: function (result) {
          if (!result.success) {
            alert({content:"[" + result.errorCode + "]" + result.msg});
            return;
          }
          if (callback)callback(result);
        },
        error: function () {
        	alert({content: "数据加载失败！"});
        }
      });
    }
    
    
  }

  $(function () {
    //初始化参数
    var global = {
      //全局资源
      GLOBAL_RESOURCE_LIST: [],
      //全局用户
      GLOBAL_USER: {'userName':'pop','loginName':'test'},
      /**
       * 获取资源列表
       */
      getResourceList: function () {
        return this.GLOBAL_RESOURCE_LIST;
      },
      /**
       * 获取用户
       */
      getUser: function () {
        return this.GLOBAL_USER;
      },
      /**
       * 检查是否有权限
       */
      hasPermission: function (resourceId) {
          var resource_list = this.getResourceList();
          for (var i = 0; i < resource_list.length; i++) {
	          if (resourceId == resource_list[i].name) {
	            return true;
	          }
	        } 
        return false; 
      }
    };
    $.extend(global);
    //资源显示控制
    initRCL();
  });
</script>

<!--分页模板-->
<script id="pageTpl" type="text/html">
    <a class="page-prev" href="javascript:goPage('prev', '{{paramsData}}','{{url}}','{{page.totalPage}}');"><i></i></a>
    {{each page.pageList as crupagenum}}
    {{if page.pageNum==crupagenum}}
    <a href="javascript:pageQuery('{{paramsData}}','{{url}}','{{crupagenum}}')" class="now" >{{crupagenum}}</a>
    {{else}}
    <a href="javascript:pageQuery('{{paramsData}}','{{url}}','{{crupagenum}}')" id="pg">{{crupagenum}}</a>
    {{/if}}
    {{/each}}
    <a class="page-next" href="javascript:goPage('next','{{paramsData}}' ,'{{url}}','{{page.totalPage}}');"><i></i></a>
    <a><input id="confirmPageId" class="input input-smaller" type="text"></a>
    <a class="page-next" href="javascript:confirmPage('{{paramsData}}','{{url}}')">确定</a>
</script>

<!--分页controller-->
<script>
    function pageQuery(paramsData,url,pageNum){
        if("" != paramsData && undefined != paramsData){
            if(typeof (paramsData) == "object"){
                if(undefined == paramsData.pageNum){
                    paramsData['pageNum'] = pageNum;
                }else{
                    paramsData.pageNum = pageNum;
                }
            }else{
                paramsData = eval('(' + paramsData + ')');
                if(undefined == paramsData.pageNum){
                    paramsData['pageNum'] = pageNum;
                }else{
                    paramsData.pageNum = pageNum;
                }
            }

        }else{
            paramsData = {"pageNum":pageNum};
        }

        $.ajax({
            url:url,
            data:paramsData,
            dataType:'json',
            cache:false,
            type:'get',
            success:function(data){
                if(undefined != data){
                    data['paramsData'] = JSON.stringify(paramsData);
                    data['url'] = url;
                }
                var html = template('voderlist', data);
                document.getElementById('content').innerHTML = html;
                var pagehtml = template("pageTpl",data);
                document.getElementById('pageContent').innerHTML = pagehtml;
            }
        });
    }

    function goPage(ctrl,paramsData,url,totalPage) {
        $now = parseInt($('.page .now').text());
        switch (ctrl) {
            case 'next':
                    if($now == parseInt(totalPage)){
                        break;
                    }
                pageQuery(paramsData,url,$now+1);
                break;
            case 'prev':
                if($now === 1){
                    break
                }
                pageQuery(paramsData,url,$now-1);
                break;
        }
    }

    function confirmPage(paramsData,url) {
        var confirmPagenum = $("#confirmPageId").val();
        if(undefined == confirmPagenum || "" == $.trim(confirmPagenum)){
            alert("请输入正确的页码");
            return;
        }else{
            pageQuery(paramsData,url,confirmPagenum);
        }

    }

//    template.helper('dataFormat',function(data, format)({
//        return 2
//    })


    template.helper('dataFormat', function(data, format){
        var date = new Date();
        date.setTime(data*1000);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
//        return [year,month,day].map(formatNumber).join("-") + ' ' +[hour,minute,second].map(formatNumber).join(":");
        return [year,month,day].map(formatNumber).join("-");
    })

    function formatNumber(n){
        n = n.toString();
        return n[1] ? n:'0'+n
    }

    <!--不带分页查询-->
    function noPageQuery(paramsData,url,tplId,contentId){
        $.ajax({
            url:url,
            data:paramsData,
            dataType:'json',
            cache:false,
            type:'get',
            success:function(data){
                if(undefined != data){
                    data['paramsData'] = JSON.stringify(paramsData);
                    data['url'] = url;
                }
                var html = template(tplId, data);
                document.getElementById(contentId).innerHTML = html;
            }
        });
    }

    //处理退单列表中的订单类型展示
    template.helper('vorderType', function(data){
        debugger;
        var vorderId = data.toString();
        var vorderType = vorderId.substring(0,2);
        var vorderTypeDesc = "";
        if(vorderType == "1"){
            vorderTypeDesc = "收费会员";
        }else if(vorderType == "12"){
            vorderTypeDesc = "购买服务";
        }else if(vorderType == "13"){
            vorderTypeDesc = "门店预约单";
        }else if(vorderType == "14"){
            vorderTypeDesc = "活动报名";
        }else if(vorderType == "15"){
            vorderTypeDesc = "收费会员专享，会员";
        }else if(vorderType == "16"){
            vorderTypeDesc = "旅游票务，身边";
        }else if(vorderType == "17"){
            vorderTypeDesc = "门票，身边";
        }else if(vorderType == "18") {
            vorderTypeDesc = "充值返券";
        }else if(vorderType == "31") {
            vorderTypeDesc = "成长+ 班课课程";
        }else if(vorderType == "32") {
            vorderTypeDesc = "成长+ 1对1课程";
        }else if(vorderType == "33") {
            vorderTypeDesc = "成长+ 视频课程";
        }

        return vorderTypeDesc;
    })
</script>
