---
title: idcard
tags: idcard.uikit
---

##idcard

```html
  <form action="javascript:;" class="form margin-left-40 margin-top-50" isvalid id="reg_form">
  <input type="hidden" name="avatar" id="avatar">
  <fieldset class="margin-bottom-20">
    <label class="f-label text-large text">昵称：</label>
    <input type="text" class="input input-larger" placeholder="" data-rule-required="true" data-msg-required="请输入昵称" name="username" data-rule-nickname="true"></fieldset>
  <fieldset class="margin-bottom-20">
    <label class="f-label text-large text">密码：</label>
    <input type="password" class="input input-larger" placeholder="" name="password" data-rule-space="true" data-rule-minlength=6 data-rule-required="true" data-msg-required="请输入密码"></fieldset>
  <fieldset class="margin-bottom-20">
    <label class="f-label text-large text">确认密码：</label>
    <input type="password" class="input input-larger" placeholder="" name="password2" equalTo="[name=password]" data-rule-required="true" data-msg-required="请再次输入密码"></fieldset>
  <fieldset class="margin-bottom-20">
    <label class="f-label text-large text">手机号码：</label>
    <input type="text" class="input input-larger" placeholder="" name="mobile" data-rule-phone="true" data-rule-required="true" data-msg-required="请输入手机号码" id="mobile"></fieldset>
  <fieldset class="yzm margin-bottom-20">
    <label class="f-label text-large text">验证码：</label>
    <input type="text" class="input input-larger" placeholder="" name="mobile_code" data-rule-required="true" data-msg-required="请输入验证码">
    <a class="button button-large" id="yzmbtn" yzm-time="60">发送验证码</a>
    <label for="mobile_code" class="label-error"></label>
  </fieldset>
  <fieldset class="margin-bottom-20">
    <label class="f-label text-large text">电子邮箱：</label>
    <input type="text" class="input input-larger" placeholder="" name="email" data-msg-required="请输入邮箱" data-rule-email='true' data-rule-required="true"></fieldset>
  <fieldset class="text-large margin-bottom-20 reg-more">
    <a none="#js-show" show="#js-loginmore,#js-none" id="js-show">高级选项</a>
    <a none="#js-none,#js-loginmore" show="#js-show" class="none" id="js-none">收起选项</a></fieldset>
  <div class="none" id="js-loginmore">
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">姓名：</label>
      <input type="text" class="input input-larger" placeholder="" data-rule-fullname="true" name="truename" data-msg-required="请输入姓名"></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">性别：</label>
      <label class="radio radio-larger margin-right-10">
        <input type="radio" name="gender" value="1">
        <i>
        </i>
        <span class="text-large">男</span></label>
      <label class="radio radio-larger">
        <input type="radio" name="gender" value="2">
        <i>
        </i>
        <span class="text-large">女</span></label>
    </fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">出生年月：</label>
      <label class="select select-larger  margin-right-15">
        <select name="birthyear" id="sel_year">
          <option value="0">年</option></select>
        <i class="icon icon-down"></i>
      </label>
      <label class="select select-larger select-icon">
        <select name="birthmonth" id="sel_month" data-msg-required="请选择生日">
          <option value="0">月</option></select>
        <i class="icon icon-down"></i>
      </label>
    </fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">身份证号：</label>
      <input type="text" class="input input-larger" placeholder="" name="IDcard" data-msg-required="请输入身份证号" data-rule-idcardsexdate="{sex:'gender',date:'birthyear birthmonth'}"></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">头像上传：</label>
      <div class="align-top inline">
        <a id="cktool" modal=".modal-head" class="sprite sprite-cktool"></a>
        <div class="u-imgout change-head none">
          <a modal=".modal-head">
            <img></a>
        </div>
      </div>
    </fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">通信地址：</label>
      <input type="text" class="input input-larger" placeholder="" name="address" data-msg-required="请输入通信地址" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">毕业院校：</label>
      <input type="text" class="input input-larger" placeholder="" name="graduated_school" data-msg-required="请输入毕业院校" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">专业：</label>
      <input type="text" class="input input-larger" placeholder="" name="profession" data-msg-required="请输入专业" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">学历：</label>
      <input type="text" class="input input-larger" placeholder="" name="educational" data-msg-required="请输入学历" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">学位：</label>
      <input type="text" class="input input-larger" placeholder="" name="degree" data-msg-required="请输入学位" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">单位：</label>
      <input type="text" class="input input-larger" placeholder="" name="unit" data-msg-required="请输入单位" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">学校机构：</label>
      <input type="text" class="input input-larger" placeholder="" name="organization" data-msg-required="请输入学校机构" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">研究领域：</label>
      <input type="text" class="input input-larger" placeholder="" name="research" data-msg-required="请输入研究领域" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">职务：</label>
      <input type="text" class="input input-larger" placeholder="" name="position" data-msg-required="请输入职务" data-rule-maxlength=50></fieldset>
    <fieldset class="margin-bottom-20">
      <label class="f-label text-large text">职称：</label>
      <input type="text" class="input input-larger" placeholder="" name="job_title" data-msg-required="请输入职称" data-rule-maxlength=50></fieldset>
  </div>
  <fieldset>
    <label class="f-label"></label>
    <a onclick1="do_submit()" onsuccess=do_submit class="button button-blue button-larger button-boxer" submit-button>注册</a></fieldset>
  <input type="hidden" name="user_type" value="2">
 </form>
```



