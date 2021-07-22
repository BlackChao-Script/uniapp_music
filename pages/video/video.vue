<template>
	<view class="video">
		<uni-segmented-control :current="current" :values="itemList" @clickItem="clickItem" styleType="text" activeColor="#ffc4d0"></uni-segmented-control>
		<view class="content">
			<view class="content_playlists" v-show="current === 0">
				<view class="playlists_list" v-for="(item, index) in recommendList" :key="index"
				@click="toViDeodetailed(item.id)">
					<view class="list_pic">
						<image :src="item.cover" mode="widthFix"></image>
						<view class="list_playCount">
							<text class="iconfont icon-bofang"></text>
							{{ item.playCount | numfix }}
						</view>
					</view>
					<view class="list_name">{{ item.name }}</view>
				</view>
			</view>
			<view class="content_playlists" v-show="current === 1">
				<view class="playlists_list" v-for="(item, index) in mvList" :key="index"
				@click="toViDeodetailed(item.id)">
					<view class="list_pic">
						<image :src="item.cover" mode="widthFix"></image>
						<view class="list_playCount">
							<text class="iconfont icon-bofang"></text>
							{{ item.playCount | numfix }}
						</view>
					</view>
					<view class="list_name">{{ item.name }}</view>
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
			itemList: ['推荐', 'MV'],
			recommendList: [],
			mvList: []
		}
	},
	onLoad() {
		this.getRecommend()
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(2) + '万' : num
		}
	},
	methods: {
		clickItem(e) {
			this.current = e.currentIndex
		},
		async getRecommend() {
			const res = await this.apiRequest({
				url: '/mv/exclusive/rcmd',
				data: {
					limit: 10
				}
			})
			const res1 = await this.apiRequest({
				url: '/mv/all',
				data: {
					limit: 40
				}
			})
			this.recommendList = res.data.data
			this.mvList = res1.data.data
			console.log(this.recommendList)
		},
		toViDeodetailed(e){
			const id = e
			uni.navigateTo({
				url:`../videodetailed/videodetailed?id=${id}`
			})
		}
	}
}
</script>

<style lang="less">
	.video{
		margin-bottom: 50rpx;
	}
.content_playlists {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	.playlists_list {
		margin-top: 20rpx;
		width: 48%;
		.list_pic {
			position: relative;
			image {
				width: 100%;
				border-radius: 20rpx;
			}
			.list_playCount {
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 20rpx;
				font-size: 25rpx;
			}
		}
		.list_name {
			font-size: 25rpx;
			text-align: center;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}
}
</style>
