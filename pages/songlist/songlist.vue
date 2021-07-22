<template>
	<view class="songlist">
		<view class="songlist_title">热门歌单</view>
		<view class="songlist_content">
			<view class="songlist_list" v-for="(item, index) in songLists" :key="index"
			@click="toSonglistdetailed(item.id)">
				<view class="list_pic">
					<image :src="item.coverImgUrl" mode="widthFix"></image>
					<view class="pic_icon">
						<text class=" iconfont icon-bofang" />
						<text>{{ item.playCount | numfix }}</text>
					</view>
				</view>
				<view class="list_names">
					<view class="names_title">{{ item.name }}</view>
					<view class="names_name">{{ item.creator.nickname }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			songLists: []
		}
	},
	onLoad() {
		this.getSongList()
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(2) + '万' : num
		}
	},
	methods: {
		// 获取热门歌单数据
		async getSongList() {
			const res = await this.apiRequest({
				url: '/top/playlist/highquality?limit=20'
			})
			this.songLists = res.data.playlists
		},
		toSonglistdetailed(e){
			const id = e
			uni.navigateTo({
				url:`../../pages/songlistdetailed/songlistdetailed?id=${id}`
			})
		}
	
	}
}
</script>

<style lang="less">
.songlist {
	.songlist_title {
		padding: 20rpx;
		font-size: 34rpx;
		font-weight: 600;
	}
	.songlist_content {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.songlist_list {
			flex: 50%;
			display: flex;
			flex-direction: column;
			.list_pic {
				position: relative;
				flex: 1;
				image {
					width: 90%;
					border-radius: 20rpx;
				}
				.pic_icon {
					position: absolute;
					bottom: 20rpx;
					right: 25rpx;
					font-size: 25rpx;
					color: #fff;
					background-color: rgba(0,0,0,.5);
					border-radius: 20rpx;
				}
			}
			.list_names {
				flex: 1;
				.names_title {
					font-size: 27rpx;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				.names_name {
					font-size: 25rpx;
				}
			}
		}
	}
}
</style>
