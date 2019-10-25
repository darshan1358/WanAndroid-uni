<template>
	<view class="content">
		<view class="top">{{ integral }}</view>
		<view class="list-item" v-for="(item, index) in datas" :key="index">
			<view class="item-layout">
				<view class="item-title">{{ item.desc.substring(20, 40) }}</view>
				<view class="item-time">{{ item.desc.substring(0, 20) }}</view>
			</view>
			<view class="item-integral">{{ '+' + item.coinCount }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			integral: 0,
			datas: []
		};
	},
	onLoad(res) {
		this.integral = res.integral;
		let that = this;
		uni.request({
			url: 'https://www.wanandroid.com//lg/coin/list/1/json',
			success(res) {
				that.datas = res.data.data.datas;
				console.log('inte=res==' + JSON.stringify(that.datas));
			}
		});
	},
	methods: {}
};
</script>

<style>
.content {
	width: 100%;
	height: 100%;
	background: #eeeeee;
}
.top {
	width: 100%;
	height: 280upx;
	background: #0081ff;
	font-size: 120upx;
	font-weight: bold;
	color: white;
	padding-top: 80upx;
	text-align: center;
}
.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	border-radius: 20upx;
	padding: 20upx;
	margin: 20upx;
	box-shadow: 10upx 10upx 20upx #c0c0c0;
}
.item-layout {
	display: flex;
	flex-direction: column;
}
.item-title {
	font-size: 30upx;
}
.item-time {
	margin-top: 15upx;
	font-size: 25upx;
	color: #808080;
}
.item-integral {
	font-size: 30upx;
	color: #0081ff;
}
</style>
