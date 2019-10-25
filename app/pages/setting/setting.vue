<template>
	<view class="content">
		<!-- <view @tap="loginOut()">退出登录</view> -->
		<view class="tab">基本设置</view>

		<view class="title">显示置顶文章</view>
		<view class="describe">开启后首页会显示置顶文章</view>

		<view class="title">清除缓存</view>
		<view class="describe">0</view>

		<view @tap="showloginDialog">
			<view class="title">退出</view>
			<view class="describe">退出登录</view>
		</view>
		
		<neil-modal @close="closeModal()" :show="loginDialogShow" title="温馨提示" content="确定退出登录吗？" @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')"></neil-modal>

		<view class="line"></view>

		<view class="tab">其他设置</view>
		<view class="title">列表动画</view>
		<view class="describe">缩放</view>
		<view class="title">主题颜色</view>
		<view class="describe">设置App的主题颜色</view>
		<view class="line"></view>

		<view class="tab">关于</view>
		<view class="title">版本</view>
		<view class="describe">当前版本1.0.0</view>
		<view class="title">作者</view>
		<view class="describe">Darshan1358</view>
		<view class="title">项目源码</view>
		<view class="describe">https://github.com/darshan1358/wan-android</view>
		<view class="title">版权声明</view>
		<view class="describe">仅作个人及非商业用途</view>
	</view>
</template>

<script>
import neilModal from '@/components/neil-modal/neil-modal.vue';
export default {
	components: { neilModal },
	data() {
		return {
			loginDialogShow: false
		};
	},
	onLoad() {
		var res = uni.getStorageInfoSync();
		console.log(JSON.stringify(res));
	},
	methods: {
		loginOut() {
			uni.request({
				url: 'https://www.wanandroid.com/user/logout/json',
				method: 'GET',
				data: {},
				success: res => {
					uni.setStorage({
						key: 'userData',
						data: '',
						success() {
							uni.switchTab({
								url: '../mine/mine'
							});
						}
					});
				},
				fail: () => {},
				complete: () => {}
			});
		},
		bindBtn(type) {
			if(type==="confirm"){
				this.loginOut();
			}
		},
		showloginDialog() {
			this.loginDialogShow = true;
		},
		closeModal() {
			this.loginDialogShow = false;
		}
	}
};
</script>

<style>
.content {
	padding-left: 30upx;
	padding-right: 30upx;
	padding-bottom: 30upx;
}
.tab {
	margin-top: 40upx;
	color: #0081ff;
	font-size: 25upx;
}
.title {
	margin-top: 40upx;
	font-size: 28upx;
}
.describe {
	margin-top: 5upx;
	font-size: 25upx;
	color: #555555;
}
.line {
	width: 100%;
	height: 2upx;
	background: #C8C7CC;
	margin-top: 30upx;
}
</style>
