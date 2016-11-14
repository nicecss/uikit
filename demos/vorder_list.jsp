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
<head>
	<meta charset="UTF-8">
	<title>虚拟订单列表</title>
	<!-- Webkit HTML5内核>双核浏览器webkit内核>双核浏览器IE内核>IE标准内核>IE兼容内核 -->
	<meta name="renderer" content="webkit|ie-stand|ie-comp">
	<meta name="force-rendering" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>

<body>
<div class="common-content clear">
	<form id="vorderForm">
	<div class="page-center">
		<div class="common-main">
			<div class="common-table common-table-open">
				<input type="hidden" name="pageNum" />
				<div class="table-header table-header table-header-search">
					<div>
						<div class="inline margin-right-20">
							<span class="margin-right-5 margin-left-5 align-middle-text">订单号：</span>
							<input type="text" id="vorderId" class="input margin-right-15">
						</div>
						<div class="inline margin-right-20">
							<span class="margin-right-5 margin-left-5 align-middle-text">下单人手机：</span>
							<input type="text" id="buyerMobile" class="input margin-right-15" >
						</div>
						<label class="select margin-right-15">
							<select id="state">
								<option value="">订单状态</option>
								<option value="1">待付款</option>
								<option value="2">已支付</option>
								<option value="3">待评价</option>
								<option value="4">已完成</option>
								<option value="5">已取消</option>
							</select>
							<i></i>


						</label>

					</div>
					<div class="margin-left-5">
						<div class="inline margin-right-20">
							<span class="margin-right-5 margin-left-5 align-middle-text">skuId：</span>
							<input type="text" id="skuId" class="input margin-right-15" >
						</div>
						<div class="inline margin-right-20">
							<span class="margin-right-5 margin-left-5 align-middle-text">购买人手机：</span>
							<input type="text" id="buyerUid" class="input margin-right-15" >
						</div>
						<label class="select margin-right-15">
							<select id="type">
								<option value="">订单类型</option>
								<option value="1">收费会员</option>
								<option value="12">购买服务</option>
								<option value="13">门店预约单</option>
								<option value="14">活动报名</option>
								<option value="15">收费会员专享，会员</option>
								<option value="16">旅游票务，身边</option>
								<option value="17">门票，身边</option>
								<option value="18">充值返券</option>
								<option value="31">成长+ 班课课程</option>
								<option value="32">成长+ 1对1课程</option>
								<option value="33">成长+ 视频课程</option>
							</select>
							<i></i>
						</label>

					</div>
					<div>
						<div class="inline margin-right-20">
							<span class="margin-right-5 margin-left-5 align-middle-text">下单时间：</span>
							<label class="date">
								<input id="genStartTime" type="text" onclick="laydate()">
								<i></i>
							</label>
							<span class="margin-right-5 margin-left-5 align-middle-text">至</span>
							<label class="date">
								<input id="genEndTime" type="text" onclick="laydate()">
								<i></i>
							</label>
						</div>
						<label class="select margin-right-15">
							<select id="sourceId">
								<option value="">订单来源</option>
								<option value="1">特卖APP</option>
								<option value="2">微信商城</option>
								<option value="3">人客合一</option>
								<option value="4">官网</option>
							</select>
							<i></i>
						</label>
						<a id="queryId" class="button button-blue button-radius margin-bottom-15">查询</a>
					</div>
				</div>
				<div class="table-body">
					<table class="table" style="border-top-width: 1px;">
						<thead style="color:#FF44AA" class="">
						<tr>
							<th width="120">订单号</th>
							<th width="250">商品名称</th>
							<th width="200">订单金额</th>
							<th width="170">下单时间</th>
							<th width="200">支付时间</th>
							<th width="200">订单状态</th>
							<th width="200">订单类型</th>
							<th width="200">订单来源</th>
							<th width="120">操作</th>
						</tr>
						</thead>
						<tbody id="content">


						</tbody>
					</table>
					<div id="pageContent" class="page page-right margin-top-20 margin-bottom-20">

					</div>
				</div>
			</div>
		</div>
	</div>
	</form>
</div>


</body>
<script>
	$(function (){
		//初始化页面
		$("#queryId").click();

		/**
		 * 查询列表
		 */
		$("#queryId").click(function () {
			$("#vorderForm").validate();
			var vorderId = $("#vorderId").val();
			var payerMobile =$("#payerMobile").val();
			var buyerMobile =$("#buyerMobile").val();
			var skuId = $("#skuId").val();
			var state =$("#state option:selected").val();
			var type =$("#type option:selected").val();
			var sourseId =$("#sourceId option:selected").val();
			var payStartTime =$("#payStartTime").val();
			var payEndTime =$("#payEndTime").val();

			var url = '${ct}/vorder/queryVOrderList.do';
			var paramsData = {
				pageNum:1,
				pageSize:10,
				vorderId:vorderId,
				buyerMobile:buyerMobile,
				payerMobile:payerMobile,
				skuId:skuId,
				state:state,
				type:type,
				sourseId:sourseId,
				payStartTime:payStartTime,
				payEndTime:payEndTime
			};
			pageQuery(paramsData,url);
		})
	})
</script>

<!--订单列表模板 -->
<script id="voderlist" type="text/html">
	{{each tradeList as value}}
	<tr>
		<td>{{value.vorderId}}</td>
		<td>{{value.skuName}}</td>
		<td>{{value.totalPay}}</td>
		<!--订单生成时间 -->
		{{if value.genTime != 0}}
			<td>{{value.genTime | dataFormat:'yy-mm-dd'}}</td>
		{{else}}
		<td></td>
		{{/if}}
		<!--支付时间 -->
		{{if value.payTime != 0}}
		<td>{{value.payTime | dataFormat:'yy-mm-dd'}}</td>
		{{else}}
		<td></td>
		{{/if}}

		<!--订单状态-->
		{{if value.state == 1}}
		<td>待付款</td>
		{{else if value.state == 2}}
		<td>已支付</td>
		{{else if value.state == 3}}
		<td>待评价</td>
		{{else if value.state == 4}}
		<td>已完成</td>
		{{else if value.state == 5}}
		<td>已取消</td>
		{{else}}
		<td></td>
		{{/if}}
		<!--订单类型-->
		{{if value.type == 1}}
		<td>收费会员</td>
		{{else if value.type == 12}}
		<td>购买服务</td>
		{{else if value.type == 13}}
		<td>门店预约单</td>
		{{else if value.type == 14}}
		<td>活动报名</td>
		{{else if value.type == 15}}
		<td>收费会员专享，会员</td>
		{{else if value.type == 16}}
		<td>旅游票务，身边</td>
		{{else if value.type == 17}}
		<td>门票，身边</td>
		{{else if value.type == 18}}
		<td>充值返券</td>
		{{else if value.type == 31}}
		<td>成长+ 班课课程</td>
		{{else if value.type == 32}}
		<td>成长+ 1对1课程</td>
		{{else if value.type == 33}}
		<td>成长+ 视频课程</td>
		{{else}}
		<td></td>
		{{/if}}

		<!--订单来源-->
		{{if value.sourceId == 1}}
		<td>特卖APP</td>
		{{else if value.type == 2}}
		<td>微信商城</td>
		{{else if value.type == 3}}
		<td>人客合一</td>
		{{else if value.type == 4}}
		<td>官网</td>
		{{else}}
		<td></td>
		{{/if}}
		<td>
			<a class="button button-small button-blue"  href="queryVOrderDetail.do?vorderId={{value.vorderId}}" target="_blank">详情</a>
		</td>
	</tr>
	{{/each}}
</script>
</html>
