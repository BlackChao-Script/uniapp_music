<template>
	<view class="newmusics">
		<view class="newmusic_title">最新音乐</view>
		<view class="newmusics_list" v-for="(item, index) in newMusicList" :key="index" @click="getMusicUrl(item.id)">
			<view class="list_name">{{ item.name }}</view>
			<view class="list_title">{{ item.album.artists[0].name }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			newMusicList: []
		}
	},
	onLoad() {
		this.getNewMusics()
	},
	methods: {
		async getNewMusics() {
			const res = await this.apiRequest({
				url: '/top/song',
				data: {
					type: 7
				}
			})
			this.newMusicList = res.data.data
		},
		// 获取音乐地址
		async getMusicUrl(e) {
			const res = await this.apiRequest({
				url: `/song/url?id=${e}`
			})
			this.$store.state.url = res.data.data[0].url
		}
	}
}
</script>

<style lang="less">
.newmusics {
	.newmusic_title {
		padding: 20rpx;
		font-size: 34rpx;
		font-weight: 600;
	}
	.newmusics_list {
		margin-top: 10rpx;
		padding: 20rpx;
		.list_name {
			font-size: 25rpx;
		}
		.list_title {
			font-size: 20rpx;
			color: #ccc;
		}
	}
}
</style>
