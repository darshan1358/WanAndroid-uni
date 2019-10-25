<template>
	<view class="content">
		<view class="todo-title">类别</view>
		<view>
			<picker mode="selector" :range="sortList" @change="bindSortChange"><input class="todo-input" :value="sortList[category]" /></picker>
		</view>
		<view class="todo-title">标题</view>
		<input class="todo-input" placeholder="标题" v-model="title" />
		<view class="todo-title">内容</view>
		<textarea class="todo-input" v-model="content" style="height: 150upx;width: 100%; box-sizing: border-box;" placeholder="内容描述" />
		<view class="todo-title">预定完成时间</view>

		<view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<input class="todo-input" placeholder="选择预定完成时间" :value="date" />
			</picker>
		</view>

		<view class="todo-title">优先级</view>
		<view>
			<picker mode="selector" :range="typeList" @change="bindTypeChange"><input class="todo-input" :value="typeList[type]" /></picker>
		</view>

		<button class="todo-button" @tap="submitData">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			title: '',
			content: '',
			type: 0,
			category: 0,
			date: currentDate,
			typeList: ['重要且紧急', '重要不紧急', '紧急但不重要', '不重要不紧急'],
			sortList: ['工作', '生活', '娱乐']
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		bindTypeChange: function(e) {
			console.log('bindTypeChange==' + e.target.value);
			this.type = e.target.value;
		},
		bindSortChange: function(e) {
			console.log('bindSortChange==' + e.target.value);
			this.category = e.target.value;
		},
		submitData() {
			console.log("this.title="+this.title+"==this.content=="+this.content);
			var that = this;
			if(this.title===""){
				uni.showToast({
					title:"标题不能为空",
					icon:"none"
				});
				return
			};
			if(this.content===""){
				uni.showToast({
					title:"内容不能为空",
					icon:"none"
				});
				return
			};
			uni.request({
				header:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
				url: 'https://www.wanandroid.com/lg/todo/add/json',
				method: 'POST',
				data: {
					title:that.title,
					content:that.content,
					date:that.date,
					type:that.type+1,
					priority:that.category+1
				},
				success() {
					uni.showToast({
						title:"提交成功",
						icon:"none"
					});
					uni.navigateBack({});
				}
			});
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style>
.content {
	padding-left: 30upx;
	padding-right: 30upx;
}
.todo-title {
	margin-top: 40upx;
	font-size: 20upx;
	color: #999999;
}
.todo-input {
	margin-top: 20upx;
	background: #eeeeee;
	border-radius: 10upx;
	padding: 20upx;
	font-size: 25upx;
}
.todo-button {
	margin-top: 60upx;
	background: #0081ff;
	color: white;
}
</style>
