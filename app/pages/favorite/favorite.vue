<template>
	<view class="content">
		<view class="list-item" v-for="(item,index) in datalist" :key="index" @tap="jumpDetailPage(item)">
			<view class="list-item-top">
				<text>{{ item.author }}</text>
				<text>{{ item.niceDate }}</text>
			</view>
		
			<view class="list-item-image">
				<view v-if="item.envelopePic != ''"><image :src="item.envelopePic" mode="scaleToFill" style="width: 120upx; height: 120upx;margin-right: 20upx;"></image></view>
				<view class="list-item-title">{{ item.title }}</view>
			</view>
		
			<view class="list-item-bottom">
				<view class="list-item-chapter">{{ item.chapterName }}</view>
				<text class="yticon icon-shoucang shoucang" @tap.stop="favoriteItem(index)"></text>
			</view>
		</view>
		<view v-if="isLoadMore"><view>加载更多...</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoadMore: false,
				pagesize: 1,
				datalist: []
			}
		},
		onLoad() {
			this.loadData();
		},
		onReachBottom() {
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				that.isLoadMore = true;
				that.loadListData(that.pagesize);
				console.log(that.pagesize);
			}, 1000);
		},
		onPullDownRefresh() {
			this.loadData();
		},
		methods: {
			loadData() {
				let that = this;

				//获取收藏列表
				uni.request({
					url: 'https://www.wanandroid.com/lg/collect/list/0/json',
					success(res) {
						that.datalist = res.data.data.datas;
						uni.stopPullDownRefresh();
					},
					fail() {}
				});
			},
			loadListData(pagesize) {
				let that = this;
		
				// console.log('https://www.wanandroid.com/lg/collect/list/' + that.pagesize + '/json');
				//获取收藏列表
				uni.request({
					url: 'https://www.wanandroid.com/lg/collect/list/' + that.pagesize + '/json',
					success(res) {
						if (that.pagesize == 0) {
							that.datalist = res.data.data.datas;
						} else {
							console.log('length==' + that.datalist.length);
							console.log('datas==' + res.data.data.datas.length);
							that.datalist = that.datalist.concat(res.data.data.datas);
							console.log('num==' + that.datalist.length);
							this.pagesize++;
						}
					},
					fail() {},
					complete() {
						this.isLoadMore = false;
					}
				});
			},
			jumpDetailPage(item) {
				uni.navigateTo({
					url: '../detailPage/detailPage?url=' + item.link + '&title=' + item.title
				});
			},
			//收藏
			favoriteItem(index){			
				let that = this;
				//通知后台取消收藏
				uni.request({
					header:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
					method:"POST",
					url: 'https://www.wanandroid.com/lg/uncollect/' + this.datalist[index].id + '/json',
					data:{
						"originId":this.datalist[index].originId
					},
					success() {
						that.loadData();
					}
				});
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
	background: #eeeeee;
}

.swiper {
	width: 100%;
	height: 380upx;
}

.swiper-item {
	width: 100%;
	height: 100%;
	padding: 0;
}

.list-item {
	width: 88%;
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 20upx;
	margin-top: 20upx;
	margin-left: 20upx;
	margin-right: 20upx;
	border-radius: 16upx;
	background: white;
	box-shadow: 5px 5px 10px #c8c7cc;
}
.list-item-top {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20upx;
	font-size: 25upx;
	color: #999999;
}

.list-item-image {
	display: flex;
	flex-direction: row;
}
.list-item-title {
	width: auto;
	position: relative;
	font-size: 30upx;
	color: $uni-text-color;
	display: inline-block;
}
.list-item-bottom{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.shoucang{
	color: #ff0000;
}

.list-item-chapter {
	margin-top: 10upx;
	font-size: 25upx;
	color: #999999;
}
</style>
