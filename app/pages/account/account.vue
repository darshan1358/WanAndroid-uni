<template>
	<!-- 待完善：1.上拉加载更多 2.数据没有缓存 -->
	<view class="content">
		<view class="status-bar"></view>
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" tab-class="text-center text-white bg-blue text-common" select-class="text-white"></wuc-tab>
			<swiper
				:current="TabCur"
				class="swiper row item-content"
				duration="300"
				:circular="true"
				indicator-color="rgba(255,255,255,0)"
				indicator-active-color="rgba(255,255,255,0)"
				@change="swiperChange"
			>
				<swiper-item class="swiper-item" v-for="(tabItem, swiperIndex) in tabList" :key="swiperIndex">
					<view class="list-item" v-for="(swiperItem, listIndex) in swiperList" :key="listIndex" @tap="jumpDetailPage(swiperItem)">
						<view class="list-item-top">
							<text>{{ swiperItem.author }}</text>
							<text>{{ swiperItem.niceShareDate }}</text>
						</view>

						<view class="list-item-image">
							<view v-if="swiperItem.envelopePic != ''">
								<image :src="swiperItem.envelopePic" mode="scaleToFill" style="width: 120upx; height: 120upx;margin-right: 20upx;"></image>
							</view>
							<view class="list-item-title">{{ swiperItem.title }}</view>
						</view>

						<view class="list-item-bottom">
							<view class="list-item-chapter">{{ swiperItem.superChapterName + ' . ' + swiperItem.chapterName }}</view>
							<text class="yticon icon-shoucang" :class="{ shoucang: swiperItem.collect }" @tap.stop="favoriteItem(listIndex)"></text>
						</view>
					</view>

					<view v-if="isLoadMore"><view class="load-more">加载更多...</view></view>
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

var that,
	timer = null;
export default {
	data() {
		return {
			isLoadMore: false,
			pagesize: 1,
			TabCur: 0,
			tabList: [],
			swiperList: []
		};
	},
	components: { WucTab },
	onReachBottom() {
		console.log('onReachBottom=='+that.pagesize);
		that.isLoadMore = true;
		that.pagesize++;
		that.getSwiperItemData(that.TabCur, that.pagesize);
		/* if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			that.isLoadMore = true;
			that.pagesize++;
			that.getSwiperItemData(that.TabCur, that.pagesize);
			console.log(that.pagesize);
		}, 1000); */
	},
	onPullDownRefresh() {
		this.getSwiperItemData(this.TabCur, 1);
	},
	onLoad() {
		that = this;
		uni.request({
			url: 'https://wanandroid.com/wxarticle/chapters/json',
			success(res) {
				// console.log("data=="+JSON.stringify(res.data))
				that.tabList = res.data.data;
				uni.request({
					url: 'https://wanandroid.com/wxarticle/list/'+res.data.data[0].id+'/1/json',
					success(res) {
						that.swiperList = res.data.data.datas;
					}
				});
			}
		});
	},
	methods: {
		tabChange(index) {
			console.log('index==' + index);
			this.TabCur = index;
		},
		swiperChange(e) {
			console.log('swiperChange==' + e.target.current);
			let { current } = e.target;
			this.TabCur = current;
			this.getSwiperItemData(e.target.current, 1);
		},
		getSwiperItemData(itemIndex, pagesize) {
			// console.log(JSON.stringify(this.tabList[itemIndex]));
			let id = this.tabList[itemIndex].id;
			let that = this;
			uni.request({
				// url: 'https://www.wanandroid.com/project/list/' + pagesize + '/json?cid=' + id,
				url: 'https://wanandroid.com/wxarticle/list/'+id+'/' + pagesize + '/json',
				success(res) {
					if (that.pagesize == 1) {
						that.swiperList = res.data.data.datas;
					} else {
						that.swiperList = that.swiperList.concat(res.data.data.datas);
					}
				},
				complete() {
					if (pagesize == 1) {
						uni.stopPullDownRefresh();
					} else {
						that.isLoadMore = false;
					}
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

			console.log('userData==' + JSON.stringify(res));
			if (res != null && res != '') {
				this.datalist = this.swiperList;
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
			} else {
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
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #eeeeee;
	box-sizing: border-box;
}
.swiper {
	display: flex;
	flex: 1;
}
.item-content {
	display: flex;
	flex: 1;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.swiper-item {
	overflow-y: scroll;
}
.list-item {
	width: 88%;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 20upx;
	margin: 20upx;
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
.load-more {
	margin: 10upx;
	text-align: center;
}
.shoucang {
	color: #ff0000;
}

.list-item-chapter {
	margin-top: 10upx;
	font-size: 25upx;
	color: #999999;
}
.text-common{
	font-size: 32upx
}
</style>
