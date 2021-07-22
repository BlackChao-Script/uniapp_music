<template>
	<view class="populaSongList">
		<view class="populaSongList_title">
			<view class="title_name">热门歌单</view>
			<view class="title_more" @click="toSongList">
					<view class="more_text" >更多</view>
					<view class="more_iocn iconfont icon-fanhui1-copy-copy"></view>
			</view>
		</view>

		<swiper display-multiple-items="3">
			<swiper-item v-for="(item, index) in PopulaSongList" :key="index"
			@click="toSonglistdetailed(item.id)">
					<view class="swiper-item">
						<view class="item_pic">
							<image :src="item.picUrl" mode="widthFix"></image>
							<view class="item_playCount">
								<text class="iconfont icon-bofang"></text>
								{{ item.playCount | numfix }}
							</view>
						</view>
						<view class="item_name">{{ item.name }}</view>
					</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		PopulaSongList: {
			type: Array
		}
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(2) + '万' : num
		}
	},
	methods:{
		toSongList(){
			uni.navigateTo({
				url:"../../pages/songlist/songlist"
			})
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
.populaSongList {
	margin-top: 30rpx;
	margin-bottom: 170rpx;
	.populaSongList_title {
		display: flex;
		justify-content: space-between;
		padding: 25rpx;
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
	swiper-item {
		width: 750rpx;
		height: 300rpx;
		.swiper-item {
			.item_pic {
				position: relative;
				image {
					width: 90%;
					border-radius: 20rpx;
				}
				.item_playCount {
					position: absolute;
					bottom: 10rpx;
					right: 30rpx;
					font-size: 25rpx;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 10rpx;
					color: #fff;
				}
			}
			.item_name {
				font-size: 25rpx;
			}
		}
	}
}
</style>
