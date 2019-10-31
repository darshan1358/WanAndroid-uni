<template>
	<view>
		<view class="content" v-if="dataList.length == 0">
			<image class="empty-image" src="../../static/load_empty.png"></image>
			<text>暂时没有数据</text>
			<text class="repeat" @click="repeat">点击我重试</text>
		</view>
		<view class="content-list" v-else>
			<view class="item" :class="[item.status==1? 'item-finish-style' : '']"  v-for="(item, index) in dataList" :key="index" @click="itemOnclick(item)">
				<view class="top">
					<view class="item-title">{{ item.title }}</view>
				</view>
				<view class="item-priorty">{{ '优先级：' + (typeList[item.priority - 1] == undefined ? '未定义' : typeList[item.priority - 1]) }}</view>

				<view class="middle">{{ item.content }}</view>
				
				<view v-show="item.status == 1" class="item-finish">
					<image style="width: 100upx; height: 100upx;" src="../../static/ic_done.png"></image>
				</view>
				
				<view class="bottom">
					<view>{{ '类别：' + (sortList[item.type - 1] == undefined ? '未定义' : sortList[item.type - 1]) }}</view>
					<view>{{ item.dateStr }}</view>
				</view>

			</view>
		</view>

		<neil-modal :show="isShowDialog" @close="closeModal" title="功能选择" @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')">
			<view>
				<radio-group class="dialog-content" @change="dialogItemSelect">
					<radio class="dialon-item" value="编辑">编辑</radio>
					<radio class="dialon-item" value="删除">删除</radio>
					<view v-show="item.status!=1">
						<radio class="dialon-item" value="完成">完成</radio>
					</view>
				</radio-group>
			</view>
		</neil-modal>
	</view>
</template>

<script>
import neilModal from '@/components/neil-modal/neil-modal.vue';

var that;
export default {
	components: { neilModal },
	data() {
		return {
			item: {},
			dialogSelect: 'hello',
			isShowDialog: false,
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
		that = this;
	},
	onShow() {
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
				url: 'https://www.wanandroid.com/lg/todo/v2/list/1/json',
				success(res) {
					console.log('that.dataList==' + JSON.stringify(that.dataList));
					that.dataList = res.data.data.datas;
					console.log('that.dataList==' + JSON.stringify(that.dataList));
				}
			});
		},
		itemOnclick(item) {
			this.isShowDialog = true;
			this.item = item;
		},
		bindBtn(type) {
			if (type === 'confirm') {
				console.log('confirm===' + this.dialogSelect);
				if (this.dialogSelect == '删除') {
					console.log('item-select-delete');
					this.deleteItem(this.item.id);
				} else if (this.dialogSelect == '完成') {
					this.finishItem(this.item);
				} else {
					this.updateItem(this.item);
				}
			}
		},
		closeModal() {
			this.isShowDialog = false;
		},
		dialogItemSelect(e) {
			this.dialogSelect = e.target.value;
		},
		deleteItem(id) {
			uni.request({
				url: 'https://www.wanandroid.com/lg/todo/delete/' + id + '/json',
				method: 'POST',
				data: {},
				success: res => {
					that.getDataList()
				},
				fail: () => {},
				complete: () => {
					console.log('complete');
				}
			});
		},
		updateItem(item) {
			console.log('item==' + JSON.stringify(item));
			uni.navigateTo({
				url: '../todoDetail/todoDetail?item=' + JSON.stringify(item)
			});
		},
		finishItem(item) {
			uni.request({
				header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
				url: 'https://www.wanandroid.com/lg/todo/done/' + item.id + '/json',
				method: 'POST',
				data: {
					status: 1
				},
				success() {
					that.getDataList()
				},
				fail: () => {
					uni.showToast({
						title: '提交失败，请稍后再试',
						icon: 'none'
					});
				},
				complete: () => {}
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
	box-shadow: 5px 5px 8px #c0c0c0;
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
.dialog-content {
	display: flex;
	flex-direction: column;
	padding: 20upx;
}
.dialon-item {
	padding: 20upx;
}
.item-finish {
	position: relative;
	margin-top: -100upx;
	margin-left: 300upx;
}
.item-finish-style{
	opacity: 0.5;
}
</style>
