<template>
	<view class="search">
		<navigator url="../searchdetailed/searchdetailed">
			<view class="search_content">
				<view class="search_icon iconfont icon-sousuo"></view>
				<view class="search_text">搜索</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	
}
</script>

<style lang="less">
.search {
	background-color: #fbe8e7;
	height: 90rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	navigator {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.search_content {
			width: 90%;
			height: 80%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ccc;
			border-radius: 30rpx;
			background-color: #fff;
			.search_icon {
				font-size: 40rpx;
			}
		}
	}
}
</style>
