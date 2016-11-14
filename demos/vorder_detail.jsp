<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie6 ie" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7 ie" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8 ie" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="zh">
<!--<![endif]-->
<%@include file="../newcommon.jsp"%>
<jsp:useBean id="payTime" class="java.util.Date"/>
<jsp:setProperty name="payTime" property="time" value="${vorderInfo.payTime*1000}"/>
<jsp:useBean id="genTime" class="java.util.Date"/>
<jsp:setProperty name="genTime" property="time" value="${vorderInfo.genTime*1000}"/>
<jsp:useBean id="cancelTime" class="java.util.Date"/>
<jsp:setProperty name="cancelTime" property="time" value="${vorderInfo.cancelTime*1000}"/>
<jsp:useBean id="schoolStartTime" class="java.util.Date"/>
<jsp:setProperty name="schoolStartTime" property="time" value="${vorderInfo.schoolStartTime*1000}"/>
<jsp:useBean id="commentTime" class="java.util.Date"/>
<jsp:setProperty name="commentTime" property="time" value="${vorderInfo.commentTime*1000}"/>
<head>
    <meta charset="UTF-8">
    <title>虚拟订单详情</title>
    <!-- Webkit HTML5内核>双核浏览器webkit内核>双核浏览器IE内核>IE标准内核>IE兼容内核 -->
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <style type="text/css">
        .common-table .table-header {
            border-bottom-width: 0px;
        }
        .divform td{
            text-align: center;
            border:1px solid #e2e9f0;
        }
    </style>
</head>

<body>
<div class="common-table common-table-open">
    <div class="table-header table-header table-header-search padding-15 ">
        <span class="text-large text-bold">订单基本信息：</span>
    </div>
    <div class="table-body" style="padding-right: 10px;border-right-width: 0px;">
        <table class="table" frame=void style="border-bottom-width: 0px;">
            <tbody>
            <tr  style="border-bottom: 0px;font-size: 15px;">
                <td>订单号：${vorderInfo.vorderId}</td>
                <c:choose>
                    <c:when test="${vorderInfo.type eq 1}">
                        <td>订单类型：收费会员</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 12}">
                        <td>订单类型：购买服务</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 13}">
                        <td>订单类型：门店预约单</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 14}">
                        <td>订单类型：活动报名</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 15}">
                        <td>订单类型：收费会员专享，会员</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 16}">
                        <td>订单类型：旅游票务，身边</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 17}">
                        <td>订单类型：门票，身边</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 18}">
                        <td>订单类型：充值返券</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 31}">
                        <td>订单类型：成长+ 班课课程</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 32}">
                        <td>订单类型：成长+ 1对1课程</td>
                    </c:when>
                    <c:when test="${vorderInfo.type eq 33}">
                        <td>订单类型：成长+ 视频课程</td>
                    </c:when>
                    <c:otherwise>
                        <td>订单类型：</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.state eq 1}"><td>订单状态：待付款</td></c:when>
                    <c:when test="${vorderInfo.state eq 2}"><td>订单状态：已支付</td></c:when>
                    <c:when test="${vorderInfo.state eq 3}"><td>订单状态：待评价</td></c:when>
                    <c:when test="${vorderInfo.state eq 4}"><td>订单状态：已完成</td></c:when>
                    <c:when test="${vorderInfo.state eq 5}"><td>订单状态：已取消</td></c:when>
                    <c:otherwise>
                        <td>订单状态：</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.genTime ne 0}">
                        <td>订单时间：<fmt:formatDate value="${genTime}" type="date" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    </c:when>
                    <c:otherwise>
                        <td>订单时间：</td>
                    </c:otherwise>
                </c:choose>

            </tr>
            <tr  style="border-bottom: 0px;font-size: 15px;">
                <c:choose>
                    <c:when test="${vorderInfo.state eq 1}"><td>订单来源：特卖APP</td></c:when>
                    <c:when test="${vorderInfo.state eq 2}"><td>订单来源：微信商城</td></c:when>
                    <c:when test="${vorderInfo.state eq 3}"><td>订单来源：人客合一</td></c:when>
                    <c:when test="${vorderInfo.state eq 4}"><td>订单来源：官网</td></c:when>
                    <c:otherwise>
                        <td>订单来源：</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.payTime ne 0}">
                        <td>支付日期：<fmt:formatDate value="${payTime}" type="date" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    </c:when>
                    <c:otherwise>
                        <td>支付日期：</td>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.commentTime ne 0}">
                        <td>评论日期：<fmt:formatDate value="${commentTime}" type="date" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    </c:when>
                    <c:otherwise>
                        <td>评论日期：</td>
                    </c:otherwise>
                </c:choose>

                <c:choose>
                    <c:when test="${vorderInfo.payType eq 1}"><td>支付方式：钱包</td></c:when>
                    <c:when test="${vorderInfo.payType eq 2}"><td>支付方式：支付宝</td></c:when>
                    <c:when test="${vorderInfo.payType eq 3}"><td>支付方式：微信</td></c:when>
                    <c:when test="${vorderInfo.payType eq 4}"><td>支付方式：银联</td></c:when>
                    <c:when test="${vorderInfo.payType eq 5}"><td>支付方式：钱包+支付宝</td></c:when>
                    <c:when test="${vorderInfo.payType eq 6}"><td>支付方式：钱包+微信</td></c:when>
                    <c:when test="${vorderInfo.payType eq 7}"><td>支付方式：钱包+银联</td></c:when>
                    <c:otherwise>
                        <td>支付方式：</td>
                    </c:otherwise>
                </c:choose>
            </tr>
            <tr  style="border-bottom: 0px;font-size: 15px;">
                <c:choose>
                    <c:when test="${vorderInfo.agreeAdjust eq 0}"><td>是否同意调剂：不同意</td></c:when>
                    <c:when test="${vorderInfo.agreeAdjust eq 1}"><td>是否同意调剂：同意</td></c:when>
                    <c:otherwise><td>是否同意调剂：</td></c:otherwise>
                </c:choose>
                <c:if test="${vorderInfo.cancelTime ne 0}">
                    <td >取消日期：<fmt:formatDate value="${cancelTime}" type="date" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                </c:if>
                <c:if test="${vorderInfo.cancelTime eq 0}">
                    <td >取消日期：</td>
                </c:if>

                <td>订单备注：${vorderInfo.userRemark}</td>
                <td >下单门店：${store.storeName}</td>
            </tr>
            <tr>
                <c:choose>
                    <c:when test="${vorderInfo.allowReturn eq 0}"><td>可以退：否</td></c:when>
                    <c:when test="${vorderInfo.allowReturn eq 1}"><td>可以退：是</td></c:when>
                    <c:otherwise><td>可以退：</td></c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.allowDueReturn eq 0}"><td>过期退：否</td></c:when>
                    <c:when test="${vorderInfo.allowDueReturn eq 1}"><td>过期退：是</td></c:when>
                    <c:otherwise><td>过期退：</td></c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${vorderInfo.allowAnytimeReturn eq 0}"><td>随时退：否</td></c:when>
                    <c:when test="${vorderInfo.allowAnytimeReturn eq 1}"><td>随时退：是</td></c:when>
                    <c:otherwise><td>随时退：</td></c:otherwise>
                </c:choose>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="common-table common-table-open margin-top-20">
    <div class="table-header table-header table-header-search padding-15">
        <span class="text-large text-bold">上课人：</span>
    </div>
    <div class="table-body">
        <table class="table">
            <tbody>
            <tr>
                <td style="width: 25%">姓名：${studentInfo.name}</td>
                <td style="width: 25%">手机：${studentInfo.mobile}</td>
                <td style="width: 25%">上课地址：${vorderInfo.schoolAddress}</td>
                <td style="width: 25%"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="common-table common-table-open margin-top-20">
    <div class="table-header table-header table-header-search padding-15">
        <span class="text-large text-bold">联系人：</span>
    </div>
    <div class="table-body">
        <table class="table">
            <tbody>
            <tr>
                <td style="width: 25%">姓名：${contactPersonInfo.name}</td>
                <td style="width: 25%">电话：${contactPersonInfo.mobile}</td>
                <td style="width: 25%">邮箱：${contactPersonInfo.email}</td>
                <td style="width: 25%"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="common-table common-table-open margin-top-20">
    <div class="table-header table-header table-header-search padding-15">
        <span class="text-large text-bold">商品及金额：</span>
    </div>
    <div class="table-body divform">
        <table class="table">
            <tbody>
            <tr>
              <td>商品</td><td>规格</td><td>开课时间</td><td>数量</td><td>商品金额</td><td>优惠券折扣</td><td>支付金额</td><td>实付金额（开票金额）</td>
            </tr>
            <tr>
                <td>${vorderInfo.skuName}</td>
                <td>${vorderInfo.skuName}</td>
                <c:if test="${vorderInfo.schoolStartTime eq 0}">
                    <td></td>
                </c:if>
                <c:if test="${vorderInfo.schoolStartTime ne 0}">
                    <td><fmt:formatDate value="${schoolStartTime}" type="date" pattern="yyyy-MM-dd HH:mm:ss"></fmt:formatDate></td>
                </c:if>
                <td>${vorderInfo.num}</td>
                <td>${vorderInfo.totalPrice}</td>
                <td>${vorderInfo.couponAmt}</td>
                <td>${vorderInfo.totalPay}</td>
                <td>${vorderInfo.actPay}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="common-table common-table-open margin-top-20">
    <div class="table-header table-header table-header-search padding-15">
        <span class="text-large text-bold">消费码：</span><a id="showRefundModal" class="button button-blue button-radius margin-left-10">申请退款</a>
    </div>
    <div class="table-body divform">
        <table class="table">
            <tbody>
            <tr style="border-top: 1px;">
              <td>选择</td><td>消费码</td><td>状态</td><td>出行人</td><td>商品金额</td><td>优惠券折扣</td><td>支付金额</td><td>是否可退</td><td>随时退</td><td>过期退</td><td>核销门店</td>
            </tr>
               <c:forEach var="itempo" items="${itemList}" varStatus="status">
                 <tr>
                   <c:choose>
                       <c:when test="${itempo.item.codeState eq 1}"><td><input type="checkbox" name="vcode" value="${itempo.item.payItemCode}"></td><td>${itempo.item.payItemBarcode}</td><td>未使用</td></c:when>
                       <c:when test="${itempo.item.codeState eq 2}"><td></td><td>${itempo.item.payItemBarcode}</td><td>已使用</td></c:when>
                       <c:when test="${itempo.item.codeState eq 3}"><td></td><td>${itempo.item.payItemBarcode}</td><td>退款申请中</td></c:when>
                       <c:when test="${itempo.item.codeState eq 4}"><td></td><td>${itempo.item.payItemBarcode}</td><td>退款中</td></c:when>
                       <c:when test="${itempo.item.codeState eq 5}"><td></td><td>${itempo.item.payItemBarcode}</td><td>已退款</td></c:when>
                       <c:otherwise><td></td><td></td></c:otherwise>
                   </c:choose>
                   <td>${itempo.personNames}</td>
                   <td>${itempo.item.totalPay}</td>
                   <td>${itempo.item.couponTip}</td>
                   <td>${itempo.item.payPrice}</td>
                   <c:choose>
                       <c:when test="${itempo.item.allowReturn eq 0}"><td>否</td></c:when>
                       <c:when test="${itempo.item.allowReturn eq 1}"><td>是</td></c:when>
                       <c:otherwise><td></td></c:otherwise>
                   </c:choose>
                   <c:choose>
                       <c:when test="${itempo.item.allowAnytimeReturn eq 0}"><td>否</td></c:when>
                       <c:when test="${itempo.item.allowAnytimeReturn eq 1}"><td>是</td></c:when>
                       <c:otherwise><td></td></c:otherwise>
                   </c:choose>
                   <c:choose>
                       <c:when test="${itempo.item.allowDueReturn eq 0}"><td>否</td></c:when>
                       <c:when test="${itempo.item.allowDueReturn eq 1}"><td>是</td></c:when>
                       <c:otherwise><td></td></c:otherwise>
                   </c:choose>
                     <td>${itempo.item.shopName}</td>
                 </tr>
               </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<div class="common-table common-table-open margin-top-20">
    <div class="table-header table-header table-header-search padding-15">
        <span class="text-large text-bold">备注：</span><a id="addRemark" class="button button-blue button-radius margin-left-10" modal=".remark" >添加备注</a>
    </div>
    <div class="table-body divform">
        <table class="table">
            <tbody id="remarkContent">

            </tbody>
        </table>
    </div>
</div>

<div class="margin-top-10 margin-bottom-20">
    <a  href="javascript:window.close();" class="button button-blue button-radius" style="margin-left: 50%">关闭</a>
</div>

<!--备注弹出框-->
<div class="mo-content mo-save-mark bgfff none remark">
    <a class="icon-large icon-large-close" modal-close=""></a>
    <%--<h3 class="f20 margin-bottom-40 margin-top-40">保存成功</h3>--%>
    <a class="margin-bottom-10" style="margin-left: 4%;font-size: 16px">备注内容：</a>
    <div>
        <textarea id="orderRemark" style="height: 200px;width: 370px;margin:3px 0 0 10px"></textarea>
    </div>
    <div class="mo-ok-yes">
        <a  class="button button-border button-green mo-button-left"  modal-close="" >取消</a>
        <a  id ="addRemarkId" class="button button-border button-green mo-button-right" onclick="addRemark();" >确定</a>
    </div>
</div>

<!--退款弹出框-->
<div id="refundDialog" class="mo-content mo-save-mark bgfff none refund">
    <a class="icon-large icon-large-close" modal-close=""></a>
    <%--<h3 class="f20 margin-bottom-40 margin-top-40">保存成功</h3>--%>
    <a class="margin-bottom-10" style="margin-left: 4%;font-size: 16px">退款原因：</a>
    <div>
        <textarea id="returnReason" style="height: 200px;width: 370px;margin:3px 0 0 10px"></textarea>
    </div>
    <div class="mo-ok-yes">
        <a  class="button button-border button-green mo-button-left"  modal-close="" >取消</a>
        <a  id ="ApplyRefund" class="button button-border button-green mo-button-right" >确定</a>
    </div>
</div>

</body>
<!--备注模板 -->
<script id="remarkTpl" type="text/html">
    <tr><td>操作人</td><td>备注</td><td>操作时间</td></tr>
    {{each data as value}}
        <tr>
            <td>{{value.customerserviceName}}</td>
            <td>{{value.orderRemark}}</td>
            <td>{{value.createTime}}</td>
        </tr>
    {{/each}}
</script>

<script>
    $(function () {
        //查询备注
        var orderId = '${vorderInfo.vorderId}';
        var remarkUrl = '${ct}/order/listRemark.do';
        var orderType = '${vorderInfo.type}';
        var paramsRemark = {"orderId":orderId,"orderType":orderType};
        noPageQuery(paramsRemark,remarkUrl,"remarkTpl","remarkContent");
    })



    /**
     * 添加备注
     */
    $("#addRemarkId").click(function () {
        var orderId = '${vorderInfo.vorderId}';
        var orderType = '${vorderInfo.type}';
        var orderRemark = $("#orderRemark").val();
        var paramsAddRemark = {"orderId":orderId,"orderType":orderType,"remark":orderRemark};
        var paramsData = {"orderId":orderId,"orderType":orderType};
        var addRemarkUrl = '${ct}/order/addRemark.do';
        var listUrl = '${ct}/order/listRemark.do';
        var tplId = "remarkTpl";
        var contentId = "remarkContent";
        $.ajax({
            url:addRemarkUrl,
            data:paramsAddRemark,
            dataType:'json',
            cache:false,
            type:'get',
            success:function(data){
                if(undefined != data && data.resultCode == 1){
                    $("[modal-close]").click();
                    $("#orderRemark").val("");
                    noPageQuery(paramsData,listUrl,tplId,contentId);
                }
            }
        });
    });

    /**
     * 申请退款弹出框展示
     */
    $("#showRefundModal").click(function () {
        if($("[name=vcode]").length==0){
            oldAlert("没有可以退款的消费码");
            return false;
        }

        if($("[name=vcode]:checked").length==0){
            oldAlert("请选择需要退款的消费码");
            return false;
        }
        $("#refundDialog").show();
    })

    /**
     * 申请退款
     */
    $("#ApplyRefund").click(function () {
        var vorderId = '${vorderInfo.vorderId}';
        var buyerId = '${vorderInfo.buyerId}';
        var itemSkuid = '${vorderInfo.skuId}';
        var skuName = '${vorderInfo.skuName}';
        var returnReason = $("#returnReason").val();
        var itemIds="";
        $("[name=vcode]:checked").each(function () {
            itemIds+=$(this).val()+",";
        })
        if(itemIds.length > 0){
            itemIds = itemIds.substr(0,itemIds.length-1);
        }
        
        $.ajax({
            url:'${ct}/vorder/batchApplyRefundCodeByID.do',
            data:{
                "vorderId":vorderId,
                "buyerId":buyerId,
                "itemSkuId":itemSkuid,
                "skuName":skuName,
                "returnReason":returnReason,
                "itemIds":itemIds},
            dataType:'json',
            cache:false,
            type:'get',
            success:function(data){
                $("[modal-close]").click();
                parent.location.reload();
            }
        });
    });

    //关闭当前页面
    $("#pagecloseId").click(function(){
        window.close();
    })


</script>
</html>
