<template>
	<view class="content">
		<image class="login-image" src="../../static/ic_wandroid.png" mode="widthFix"></image>
		<input class="login-input" type="text" placeholder="账号" v-model="userName" />
		<input class="login-input" type="text" placeholder="密码" v-model="password" password="true"/>
		<button class="login-btn" type="primary" @tap="login()">登录</button>
		<navigator class="login-register" url="../register/register"><text>去注册</text></navigator>
	</view>
</template>

<script>

export default {
	data() {
		return {
			userName:"",
			password:""
		}
	},
	methods: {
		showToast(text){
			uni.showToast({
					icon:"none",
					title:text
				})
		},
		login(){
			var that = this;
			if(this.userName.trim()==""){
				this.showToast("请输入账号");
				return
			}
			if(this.password.trim()==""){
				this.showToast("请输入密码")
				return
			}

			uni.request({
				header:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
				url:"https://www.wanandroid.com/user/login",
				data:{
					username:this.userName.trim(),
					password:this.password.trim(),
				},
				method:"POST",
				success(e) {

					console.log(e)
					that.showToast(e.data.errorMsg);
					// 登录成功
					if(e.data.errorCode==0){
						uni.setStorage({
							key:"userData",
							data:{
								"id":e.data.data.id,
								"userName":that.userName.trim(),
								"password":that.password.trim()
							}
						})
						uni.switchTab({
							url:"../mine/mine"
						})
					}
				},
				fail(e) {
					console.log(e)
					that.showToast("登录失败")
				}
			})
		}
	}
}
</script>

<style>
.content {
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.login-image {
	width: 200upx;
	height: 200upx;
	margin: 100upx;
}
.login-input {
	width: 80%;
	height: 80upx;
	background: #eeeeee;
	border-radius: 10upx;
	margin: 30upx;
	padding-left: 20upx;
}
.login-btn {
	width: 80%;
	margin-top: 50upx;
}
.login-register {
	font-size: 30upx;
	color: #007aff;
	margin-top: 50upx;
}
</style>
