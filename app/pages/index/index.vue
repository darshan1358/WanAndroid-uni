<template>
	<view class="content">
		<swiper class="swiper" autoplay="true" indicator-dots="true" indicator-color="gray">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerlist" :key="index"><image :src="item.imagePath" mode="widthFix" style="width: 100%;" /></swiper-item>
		</swiper>

		<view class="list-item" v-for="(item, index) in datalist" :key="index" @click="jumpDetailPage(item)">
			<view class="list-item-title">{{ item.title }}</view>
			<view class="list-item-chapter">{{ item.superChapterName +" . "+ item.chapterName }}</view>
		</view>
		
		<view style="visibility:isLoadMore? visible: hidden;">加载更多...</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLoadMore:false,
			pagesize:0,
			bannerlist: [],
			datalist: []
		};
	},
	onLoad() {
		this.loadData();
	},
	onReachBottom() {
		this.isLoadMore = true;
		this.pagesize++;
		this.loadListData(this.pagesize);
		console.log(this.pagesize)
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
					uni.stopPullDownRefresh();
				},
				fail() {}
			});
		},
		loadListData(pagesize){
		
			let that = this;
			
			console.log('https://www.wanandroid.com/article/list/'+that.pagesize+'/json');
			//获取首页文章列表
			uni.request({
				url: 'https://www.wanandroid.com/article/list/'+that.pagesize+'/json',
				success(res) {
					if(that.pagesize==0){
						that.datalist = res.data.data.datas;
					}else{
						console.log("length=="+that.datalist.length)
						console.log("datas=="+res.data.data.datas.length)
						that.datalist = that.datalist.concat(res.data.data.datas);
						console.log("num=="+that.datalist.length)
					}
				},
				fail() {},
				complete() {
					this.isLoadMore = false;
				}
			});
		},
		jumpDetailPage(item){
			uni.navigateTo({
				url:"../detailPage/detailPage?url="+item.link+"&title="+item.title
			})
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
	box-shadow: 5px 5px 10px #C8C7CC;
}

.list-item-title {
	width: auto;
	position: relative;
	font-size: 30upx;
	color: $uni-text-color;
	display: inline-block;
}

.list-item-chapter {
	margin-top: 10upx;
	font-size: 25upx;
	color: #999999;
}

</style>
