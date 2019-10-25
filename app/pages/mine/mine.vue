<template>
	<view class="content">
		<view class="status-bar"></view>
		<view class="mine-top">
			<image class="top-image" src="../../static/ic_account.png"></image>
			<text class="top-text" @tap="toLogin()">{{ userName == undefined ? '去登录' : userName }}</text>
		</view>

		<view class="list-content">
			<view class="list-item" v-for="(item, index) in listData" :key="index" @tap="onClickItem(index)">
				<view class="list-text">{{ item }}</view>
				<view class="list-integral">
					<view class="list-integral" v-if="integral!=''&&index==0">
					<view class="integral-title">当前积分：</view>
					<view class="integral-num">{{integral}}</view>
				</view>
				<image class="list-icon" src="../../static/ic_right.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			integral:"",
			userName: '去登录',
			listData: ['我的积分', '我的收藏', '待办清单', '系统设置']
		};
	},
	onShow() {
		var that = this;
		var userData = uni.getStorage({
			key: 'userData',
			success(res) {
				console.log('userData==' + JSON.stringify(res));
				that.userName = res.data.userName;
				console.log('that.userName=' + that.userName);
			}
		});

		uni.request({
			url: 'https://www.wanandroid.com/lg/coin/userinfo/json',
			success(res) {
				console.log('res==' + JSON.stringify(res));
				that.integral = res.data.data.coinCount;
			}
		});
	},
	methods: {
		onClickItem(index) {
			var userData = uni.getStorageSync('userData');
			switch (index) {
				case 0:
					if (userData != null && userData != '') {
						uni.navigateTo({
							url: '../integral/integral?integral='+this.integral
						});
					} else {
						uni.navigateTo({
							url: '../login/login'
						});
					}
					break;
				case 1:
					if (userData != null && userData != '') {
						uni.navigateTo({
							url: '../favorite/favorite'
						});
					} else {
						uni.navigateTo({
							url: '../login/login'
						});
					}
					break;
				case 2:
				if (userData != null && userData != '') {
					uni.navigateTo({
						url: '../todo/todo'
					});
				} else {
					uni.navigateTo({
						url: '../login/login'
					});
				}
					break;
				case 3:
					uni.navigateTo({
						url: '../setting/setting'
					});
					break;
				default:
					break;
			}
		},
		toLogin() {
			var userData = uni.getStorageSync('userData');
			if (userData == null || userData == '') {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
};
</script>

<style>
.status-bar {
	height: var(--status-bar-height);
	width: 100%;
	background: #0081ff;
}
.content {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #eeeeee;
}
.mine-top {
	width: 100%;
	height: 480upx;
	background: #0081ff;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.top-image {
	margin-bottom: 30upx;
	margin-top: 80upx;
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
}
.top-text {
	color: white;
	font-size: 35upx;
}
.top-id {
	color: white;
	font-size: 20upx;
}
.list-content {
	position: relative;
	top: -150upx;
	background: white;
	margin: 35upx;
	border-radius: 15upx;
	padding: 40upx;
}
.list-item {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 50upx;
}
.list-text {
	font-size: 30upx;
}
.list-icon {
	width: 35upx;
	height: 35upx;
}
.list-integral{
	display: flex;
	flex-direction: row;
	font-size: 30upx;
	align-items: center;
}
.integral-num{
	color: #0081FF;
}
.integral-title{
	color: #808080;
}
</style>
