<template>
	<view class="searchlists">
		<!-- 导航栏 -->
		<uni-segmented-control :current="current" :values="itemList" @clickItem="clickItem" styleType="text" activeColor="#ffc4d0"></uni-segmented-control>
		<view class="content">
			<!-- 导航栏内容 -->
			<view class="content_music" v-show="current === 0">
				<view class="music_list" v-for="(item, index) in musicList" :key="index"
				@click="getMusicUrl(item.id)">
					<view class="list_name">{{ item.name }}</view>
					<view class="list_title">{{ item.artists[0].name }}</view>
				</view>
			</view>
			<view class="content_playlists" v-show="current === 1">
				<view class="playlist_list" v-for="(item, index) in musicList" :key="index">
					<view class="list_pic"><image :src="item.coverImgUrl" mode="widthFix" lazy-load="true"></image></view>
					<view class="list_namea">
						<view class="name_a">{{ item.name }}</view>
						<view class="name_b">{{ item.creator.nickname }} {{ item.playCount | numfix }}</view>
					</view>
					<view class="list_icon iconfont icon-fanhui1-copy-copy"></view>
				</view>
			</view>
			<view class="content_videos" v-show="current === 2">
				<view class="videos_list" v-for="(item, index) in musicList" :key="index">
					<view class="list_pica"><image :src="item.coverUrl" mode="widthFix" lazy-load="true"></image></view>
					<view class="list_nameb">
						<view class="nameb_title">{{ item.title }}</view>
						<view class="nameb_name">{{ item.creator[0].userName }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			keywords: '',
			itemList: ['歌曲', '歌单', '视频'],
			musicList: [],
			type: 1
		}
	},
	onLoad(option) {
		this.keywords = option.keywords
		this.getSearchMessage()
	},
	methods: {
		clickItem(e) {
			this.current = e.currentIndex
			if (this.current === 0) {
				this.type = 1
			} else if (this.current === 1) {
				this.type = 1000
			} else {
				this.type = 1014
			}
			this.getSearchMessage()
		},
		async getSearchMessage() {
			const res = await this.apiRequest({
				url: '/search',
				data: {
					keywords: this.keywords,
					type: this.type
				}
			})
			if (this.type === 1) {
				this.musicList = res.data.result.songs
			} else if (this.type === 1000) {
				this.musicList = res.data.result.playlists
			} else {
				this.musicList = res.data.result.videos
			}
		},
		// 获取音乐地址
		async getMusicUrl(e) {
			const res = await this.apiRequest({
				url: `/song/url?id=${e}`
			})
			this.$store.state.url = res.data.data[0].url
		}
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(1) + '万' : num
		}
	}
}
</script>

<style lang="less">
.content {
	.content_music {
		.music_list {
			margin-top: 10rpx;
			padding: 20rpx;
			.list_name {
				font-size: 30rpx;
			}
			.list_title {
				font-size: 25rpx;
				color: #ccc;
			}
		}
	}
	.content_playlists {
		.playlist_list {
			margin-left: 20rpx;
			margin-top: 10rpx;
			display: flex;
			.list_pic {
				flex: 1;
				image {
					width: 80%;
					border-radius: 20rpx;
				}
			}
			.list_namea {
				margin-top: 50rpx;
				flex: 2;
				.name_a {
					font-size: 28rpx;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				.name_b {
					font-size: 25rpx;
				}
			}
			.list_icon {
				flex: 0.5;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.content_videos {
		.videos_list {
			margin-left: 20rpx;
			margin-top: 10rpx;
			display: flex;
			.list_pica {
				flex: 1;
				image {
					width: 100%;
					border-radius: 20rpx;
				}
			}
			.list_nameb {
				flex: 1;
				margin-top: 50rpx;
				margin-left: 15rpx;
				.nameb_title {
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				.nameb_name {
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
