<template>
	<view class="songlistdetailed">
		<view class="songlistdetailed_title">
			<view class="title_pic">
				<image :src="songListTitle.coverImgUrl" mode="widthFix"></image>
				<view class="item_playCount">
					<text class="iconfont icon-bofang"></text>
					{{ songListTitle.playCount | numfix }}
				</view>
			</view>
			<view class="title_names">
				<view class="names_title">{{ songListTitle.name }}</view>
				<view class="names_name">
					<view class="name_username">{{ songListTitle.creator.nickname }}</view>
				</view>
			</view>
		</view>
		<view class="songlistdetailed_list" v-for="(item, index) in musicsLists" :key="index" @click="getMusicUrl(item.id)">
			<view class="list_index">
				{{index+1}}
			</view>
			<view class="title_names">
				<view class="names_name">{{ item.name }}</view>
				<view class="names_user">{{ item.ar[0].name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 歌单id
			songListId: 0,
			// 歌单表头信息
			songListTitle: [],
			// 歌曲列表id
			musicList: '',
			// 详细歌曲
			musicsLists: []
		}
	},
	onLoad(option) {
		this.songListId = option.id
		this.getSongLists(this.songListId)
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(2) + '万' : num
		}
	},
	methods: {
		// 获取歌单详情数据
		async getSongLists(id) {
			const res = await this.apiRequest({
				url: '/playlist/detail',
				data: {
					id
				}
			})
			this.songListTitle = res.data.playlist
			const id1s = res.data.privileges.map(item => {
				return item.id
			})
			this.musicList = id1s.join(',')

			// 获取歌曲详情数据
			const ids = this.musicList
			const ress = await this.apiRequest({
				url: '/song/detail',
				data: {
					ids: ids
				}
			})
			this.musicsLists = ress.data.songs
			console.log(this.musicsLists)
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
.songlistdetailed {
	background-image: linear-gradient(to top,  #fcf5ee 0%, #ffc4d0 100%);
	.songlistdetailed_title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 400rpx;
		background-image: linear-gradient(to top, #ffc4d0 0%, #fbe8e7 100%);
		.title_pic {
			position: relative;
			margin-left: 20rpx;
			flex: 2;
			image {
				width: 100%;
				border-radius: 20rpx;
			}
			.item_playCount {
				position: absolute;
				bottom: 20rpx;
				right: 10rpx;
				color: #fff;
				font-size: 25rpx;
				border-radius: 20rpx;
				background-color: rgba(0, 0, 0, 0.3);
			}
		}
		.title_names {
			margin-left: 20rpx;
			flex: 3;
			display: flex;
			flex-direction: column;
			align-items: center;
			.names_title {
				margin-bottom: 40rpx;
				font-weight: 600;
			}
			.names_name {
				font-size: 28rpx;
			}
		}
	}
	.songlistdetailed_list {
		height: 100rpx;
		margin: 20rpx;
		display: flex;
		align-items: center;
		.list_index{
			flex: 0.5;
			margin-left: 20rpx;
		}
		.title_names{
			flex: 4;
			display: flex;
			flex-direction: column;
			.names_user{
				color: #ccc;
			}
		}
	}
}
</style>
