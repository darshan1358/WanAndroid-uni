<template>
	<view>
		<view @tap="loginOut()">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginOut(){
				uni.request({
					url: 'https://www.wanandroid.com/user/logout/json',
					method: 'GET',
					data: {},
					success: res => {
						uni.setStorage({
							key:"userData",
							data:"",
							success() {
								uni.switchTab({
									url:"../mine/mine"
								})
							}
						})
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
