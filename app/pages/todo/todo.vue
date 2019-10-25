<template>
	<view>
		<view class="content" v-if="dataList.length == 0">
			<image class="empty-image" src="../../static/load_empty.png"></image>
			<text>暂时没有数据</text>
			<text class="repeat" @click="repeat">点击我重试</text>
		</view>
		<view class="content-list" v-else>
			<view class="item" v-for="(item, index) in dataList" :key="index">
				<view class="top">
					<view class="item-title">{{ item.title }}</view>
				</view>
				<view class="item-priorty">{{ '优先级：' + (typeList[item.priority - 1] == undefined ? '未定义' : typeList[item.priority - 1]) }}</view>

				<view class="middle">{{ item.content }}</view>
				<view class="bottom">
					<view>{{ '类别：' + (sortList[item.type - 1] == undefined ? '未定义' : sortList[item.type - 1]) }}</view>
					<view>{{ item.dateStr }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList: [],
			typeList: ['重要且紧急', '重要不紧急', '紧急但不重要', '不重要不紧急'],
			sortList: ['工作', '生活', '娱乐']
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			uni.navigateTo({
				url: '../todoDetail/todoDetail'
			});
		}
	},
	onLoad() {
		this.getDataList();
	},
	methods: {
		repeat() {
			this.getDataList();
		},
		getDataList() {
			console.log('that.dataList==' + JSON.stringify(this.dataList));
			let that = this;
			uni.request({
				url: 'https://www.wanandroid.com/lg/todo/v2/list/1/json?status=0',
				success(res) {
					console.log('that.dataList==' + JSON.stringify(that.dataList));
					that.dataList = res.data.data.datas;
					console.log('that.dataList==' + JSON.stringify(that.dataList));
				}
			});
		}
	}
};
</script>

<style>
.content {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #f8f8f8;
}
.content-list {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f8f8f8;
}
.empty-image {
	margin: 20upx;
	width: 180upx;
	height: 180upx;
}
.repeat {
	margin-top: 20upx;
	font-size: 30upx;
	color: #808080;
}
.item {
	background: white;
	border-radius: 15upx;
	margin: 30upx;
	padding: 20upx;
	display: flex;
	flex-direction: column;
	box-shadow: 5px 5px 8px #C0C0C0;
}
.top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: #999999;
	font-size: 30upx;
}
.item-title {
	color: #0081ff;
}
.item-priorty {
	color: red;
	font-size: 25upx;
	margin-top: 20upx;
}
.middle {
	margin-top: 20upx;
	margin-bottom: 20upx;
	font-size: 25upx;
}
.bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: #999999;
	font-size: 25upx;
}
</style>
