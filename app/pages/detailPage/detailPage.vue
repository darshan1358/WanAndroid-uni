<template>
	<web-view :src="url"></web-view>
</template>

<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				title:"",
				url:"http://www.baidu.com"
			}
		},
		onLoad(par) {
			console.log("detail==par=="+JSON.stringify(par))
			this.title = par.title;
			this.url = par.url
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	width: 100%;
	height: 100%;
}
</style>
