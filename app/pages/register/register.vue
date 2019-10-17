<template>
	<view class="content">
		<image class="login-image" src="../../static/ic_wandroid.png" mode="widthFix"></image>
		<input class="login-input" type="text" placeholder="账号" v-model="userName" />
		<input class="login-input" type="text" placeholder="密码" v-model="password" />
		<input class="login-input" type="text" placeholder="确认密码" v-model="confirmPw" />
		<button class="login-btn" type="primary" @tap="register()">注册</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userName:"",
			password:"",
			confirmPw:""
		}
	},
	methods: {
		showToast(text){
			uni.showToast({
					icon:"none",
					title:text
				})
		},
		register(){
			if(this.userName.trim()==""){
				this.showToast("请输入账号");
				return
			}
			if(this.password.trim()==""){
				this.showToast("请输入密码")
				return
			}
			if(this.confirmPw.trim()==""){
				this.showToast("请输入确认密码")
				return
			}
			if(this.password.trim()!=this.confirmPw.trim()){
				this.showToast("请确认密码输入正确")
				return
			}
			var that = this;
			uni.request({
				header:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}, 
				url:"https://www.wanandroid.com/user/register",
				method:"POST",
				data:{
					repassword:this.confirmPw.trim(),
					password:this.password.trim(),
					username:this.userName.trim()
				},
				success(e) {
					console.log(e);
				
					//注册成功
					if(e.data.errorCode==0){
						uni.redirectTo({
							url:"../login/login"
						})
					}else{
						that.showToast(e.data.errorMsg);
					}
				},
				fail() {
					that.showToast("注册失败");
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
	margin-top: 30upx;
}
</style>
