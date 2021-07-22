<template>
	<view class="recommend">
		<view class="recommend_title">
			<view class="title_name">歌曲推荐</view>
			<view class="title_more" @click="tonewMusic">
				<view class="more_text">更多</view>
				<view class="more_iocn iconfont icon-fanhui1-copy-copy"></view>
			</view>
		</view>
		<view class="recommend_list" v-for="(item, index) in musicLists" :key="index" @click="getMusicUrl(item.id)">
			<view class="list_pic"><image :src="item.picUrl" mode="widthFix"></image></view>
			<view class="list_name">
				<view class="name_a">{{ item.name }}</view>
				<view class="name_b">{{ item.song.artists[0].name }}</view>
			</view>
			<view class="list_icon iconfont icon-fanhui1-copy-copy"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		musicLists: {
			type: Array
		}
	},
	methods: {
		tonewMusic() {
			uni.navigateTo({
				url: `../../pages/newmusics/newmusics`
			})
		},
		// 获取音乐地址
		async getMusicUrl(e){
			const res = await this.apiRequest({
				url: `/song/url?id=${e}`
			})
			this.$store.state.url = res.data.data[0].url
		}
	}
}
</script>

<style lang="less">
.recommend {
	margin-left: 20rpx;
	.recommend_title {
		display: flex;
		justify-content: space-between;
		padding: 5rpx;
		.title_name {
			font-size: 35rpx;
			font-weight: 700;
		}
		.title_more {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 25rpx;
			color: #ccc;
		}
	}
	.recommend_list {
		margin-top: 10rpx;
		display: flex;
		.list_pic {
			flex: 1;
			image {
				width: 80%;
				border-radius: 20rpx;
			}
		}
		.list_name {
			flex: 2;
			display: flex;
			flex-direction: column;
			.name_a {
				font-size: 32rpx;
				font-weight: 500;
			}
			.name_b {
				margin-top: 40rpx;
				color: #adadad;
				font-size: 28rpx;
			}
		}
		.list_icon {
			flex: 0.5;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #adadad;
		}
	}
}
</style>
