<template>
	<view class="content">
		<view class="mine-top">
			<image class="top-image" src="../../static/ic_account.png"></image>
			<text class="top-text">{{ userName }}</text>
		</view>

		<view class="list-content">
			<view class="list-item" v-for="(item, index) in listData" :key="index" @tap="onClickItem(index)">
				<view class="list-text">{{ item }}</view>
				<image class="list-icon" src="../../static/ic_right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userName: '',
			listData: ['我的积分', '我的收藏', '待办清单', '系统设置']
		};
	},
	onShow() {
		var that = this;
		var userData = uni.getStorage({
			key: 'userData',
			success(res) {
				// console.log('userData==' + JSON.stringify(res));
				that.userName = res.data.userName;
			}
		});
	},
	methods: {
		onClickItem(index) {
			switch (index) {
				case 0:
					break;
				case 1:
				uni.navigateTo({
					url:"../favorite/favorite"
				})
					break;
				case 2:
					break;
				case 3:
				uni.navigateTo({
					url:"../setting/setting"
				})
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style>
.content {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #eeeeee;
}
.mine-top {
	width: 100%;
	height: 480upx;
	background: #007aff;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.top-image {
	margin-bottom: 30upx;
	margin-top: 30upx;
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
}
.top-text {
	color: white;
	font-size: 35upx;
}
.list-content {
	position: relative;
	top: -160upx;
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
</style>
