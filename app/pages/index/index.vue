<template>
	<view class="content">
		<swiper class="swiper" autoplay="true" indicator-dots="true" indicator-color="gray">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerlist" :key="index"><image :src="item.imagePath" mode="widthFix" style="width: 100%;" /></swiper-item>
		</swiper>

		<view class="list-item" v-for="(item, index) in datalist" :key="index" @tap="jumpDetailPage(item)">
			<view class="list-item-top">
				<text>{{ item.author }}</text>
				<text>{{ item.niceShareDate }}</text>
			</view>

			<view class="list-item-image">
				<view v-if="item.envelopePic != ''"><image :src="item.envelopePic" mode="scaleToFill" style="width: 120upx; height: 120upx;margin-right: 20upx;"></image></view>
				<view class="list-item-title">{{ item.title }}</view>
			</view>

			<view class="list-item-bottom">
				<view class="list-item-chapter">{{ item.superChapterName + ' . ' + item.chapterName }}</view>
				<text class="yticon icon-shoucang" :class="{ shoucang: item.collect }" @tap.stop="favoriteItem(index)"></text>
			</view>
		</view>
		<view v-if="isLoadMore"><view>加载更多...</view></view>
	</view>
</template>

<script>
var that,
	timer = null;

export default {
	data() {
		return {
			favorite: false,
			isLoadMore: false,
			pagesize: 1,
			bannerlist: [],
			datalist: []
		};
	},
	onLoad() {
		that = this;
		this.loadData();
	},
	onReachBottom() {
		console.log("onReachBottom");
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
			//获取首页banner
			uni.request({
				url: 'https://www.wanandroid.com/banner/json',
				success(res) {
					// console.log('res.data==' + JSON.stringify(res.data.data));
					that.bannerlist = res.data.data;
					// console.log('this.bannerlist==' + JSON.stringify(this.bannerlist[0].imagePath));
				}
			});
			//获取首页文章列表
			uni.request({
				url: 'https://www.wanandroid.com/article/list/0/json',
				success(res) {
					that.datalist = res.data.data.datas;
				},
				fail() {},
				complete() {
					uni.stopPullDownRefresh();
				}
			});
		},
		loadListData(pagesize) {
			let that = this;

			console.log('https://www.wanandroid.com/article/list/' + that.pagesize + '/json');
			//获取首页文章列表
			uni.request({
				url: 'https://www.wanandroid.com/article/list/' + that.pagesize + '/json',
				success(res) {
					if (that.pagesize == 0) {
						that.datalist = res.data.data.datas;
					} else {
						console.log('length==' + that.datalist.length);
						console.log('datas==' + res.data.data.datas.length);
						that.datalist = that.datalist.concat(res.data.data.datas);
						console.log('num==' + that.datalist.length);
						that.pagesize++;
					}
				},
				fail() {},
				complete() {
					that.isLoadMore = false;
				}
			});
		},
		jumpDetailPage(item) {
			uni.navigateTo({
				url: '../detailPage/detailPage?url=' + item.link + '&title=' + item.title
			});
		},
		//收藏
		favoriteItem(index) {
			//判断是否登录
			const res = uni.getStorageSync('userData');
			
			console.log("userData=="+JSON.stringify(res));
			if (res != null && res != '') {
				console.log('item==' + JSON.stringify(this.datalist[index]));
				this.datalist[index].collect = !this.datalist[index].collect;
				//通知后台收藏或取消收藏
				if (this.datalist[index].collect) {
					uni.request({
						method: 'POST',
						url: 'https://www.wanandroid.com/lg/collect/' + this.datalist[index].id + '/json'
					});
				} else {
					uni.request({
						method: 'POST',
						url: 'https://www.wanandroid.com/lg/uncollect_originId/' + this.datalist[index].id + '/json'
					});
				}
			}else{
				uni.navigateTo({
					url:"../login/login"
				})
			}
		}
	}
};
</script>

<style>
.content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #eeeeee;
}

.swiper {
	width: 100%;
	height: 380upx;
}

.swiper-item {
	width: 100%;
	height: 100%;
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
.list-item-bottom {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.shoucang {
	color: #ff0000;
}

.list-item-chapter {
	margin-top: 10upx;
	font-size: 25upx;
	color: #999999;
}
</style>
