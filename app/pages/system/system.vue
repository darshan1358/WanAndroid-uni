<template>
	<view class="content">
		<view class="status-bar"></view>
		<!-- <wuc-tab :tab-list="tabList" :tabCur="TabCur" @change="tabChange" tab-class="tab-layout" select-class="tab-select"></wuc-tab> -->
		<wuc-tab @change="tabChange" :tab-list="tabList" :tabCur.sync="TabCur" tab-class="text-center text-white bg-blue text-common" select-class="text-white text-xl"></wuc-tab>
		<swiper
			:current="TabCur"
			class="swiper"
			duration="300"
			:circular="true"
			indicator-color="rgba(255,255,255,0)"
			indicator-active-color="rgba(255,255,255,0)"
			@change="swiperChange"
		>
			<swiper-item class="swiper-item" v-for="(tabItem, swiperIndex) in tabList" :key="swiperIndex">
				<view v-if="TabCur === 0">
					<view @click="jumpSystemList(0,systemItem.name,systemItem.children)" class="navigation" v-for="(systemItem, systemIndex) in systemList" :key="systemIndex">
						<view class="navigation-name">{{ systemItem.name }}</view>
						<view @click.stop="jumpSystemList(detailIndex,systemItem.name,systemItem.children)" class="detail-name" v-for="(systemDetail, detailIndex) in systemItem.children" :key="detailIndex">{{ systemDetail.name }}</view>
					</view>
				</view>
				<view v-else>
					<view class="navigation" v-for="(navigationItem, navigationIndex) in navigationList" :key="navigationIndex">
						<view class="navigation-name">{{ navigationItem.name }}</view>
						<view class="detail-name" v-for="(navigationDetail, detailIndex) in navigationItem.articles" :key="detailIndex" @tap="jumpDetailPage(navigationDetail)">
							{{ navigationDetail.title }}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

export default {
	data() {
		return {
			TabCur: 0,
			tabList: [{ name: '体系' }, { name: '导航' }],
			systemList: [],
			navigationList: []
		};
	},
	components: { WucTab },
	onLoad() {
		this.getSystemData();
	},
	methods: {
		tabChange(index) {
			this.TabCur = index;
			// console.log("this.TabCur=="+this.TabCur);
		},
		swiperChange(e) {
			console.log("this.TabCur=="+e.target.current);
			let { current } = e.target;
			this.TabCur = current;

			if (this.TabCur === 1) {
				this.getNavigationData();
			}else{
				this.getSystemData();
			}
		},
		jumpDetailPage(item) {
			uni.navigateTo({
				url: '../detailPage/detailPage?url=' + item.link + '&title=' + item.title
			});
		},
		jumpSystemList(index,title,tabList){
			uni.navigateTo({
				url:"../systemList/systemList?index="+index+"&title="+title+"&tabList="+encodeURIComponent(JSON.stringify(tabList)) 
			})
		},
		getNavigationData() {
			let that = this;
			uni.request({
				url: 'https://www.wanandroid.com/navi/json',
				success(res) {
					that.navigationList = res.data.data;
					// console.log('that.navigationList==' + JSON.stringify(that.navigationList));
				}
			});
		},
		getSystemData(){
			let that = this;
			uni.request({
				url:"https://www.wanandroid.com/tree/json",
				success(res) {
					that.systemList = res.data.data;
					// console.log('that.systemList==' + JSON.stringify(that.systemList));
				}
			})
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
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #eeeeee;
	box-sizing: border-box;
}
.tab-layout {
	background-color: #0081ff;
	text-align: center;
	color: #ffffff;
}
.text-common {
	font-size: 32upx;
}
.swiper {
	display: flex;
	flex: 1;
}
.swiper-item {
	overflow-y: scroll;
	background: white;
}
.navigation {
	clear: both;
}
.navigation-name {
	padding: 10upx;
	font-size: 35upx;
}
.detail-name {
	display: flex;
	flex-direction: row;
	float: left;
	margin: 10upx;
	background: #f1f1f1;
	border-radius: 15upx;
	padding: 10upx;
	font-size: 30upx;
	color: #808080;
}
</style>
