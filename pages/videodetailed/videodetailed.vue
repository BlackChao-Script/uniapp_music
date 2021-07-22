<template>
	<view class="videodetailed">
		<view class="videodetailed_video"><video :src="mvUrl" controls="true" autoplay="true"></video></view>
		<view class="videodetailed_content">
			<view class="content_name">{{ mvMessage.name }}</view>
			<view class="content_message">{{ mvMessage.playCount | numfix }} {{ mvMessage.publishTime }}</view>
			<view class="vcontent_comment">
				<view class="comment_title">热门评论</view>
				<view class="content_hot_list" v-for="(item, index) in comment" :key="index">
					<view class="list_pic"><image :src="item.user.avatarUrl" mode="widthFix"></image></view>
					<view class="list_content">
						<view class="content_name1">{{ item.user.nickname }}</view>
						<view class="content_time"><uni-dateformat :date="item.time" /></view>
						<view class="content_comment">{{ item.content }}</view>
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
			mvid: 0,
			mvUrl: '',
			mvMessage: [],
			comment: []
		}
	},
	onLoad(option) {
		this.mvid = option.id
		this.getmvdetailed(this.mvid)
	},
	filters: {
		numfix(num) {
			return num / 10000 >= 1 ? (num / 10000).toFixed(2) + '万' : num
		}
	},
	methods: {
		async getmvdetailed(mvid) {
			// 获取mv标题信息
			const res = await this.apiRequest({
				url: '/mv/detail',
				data: {
					mvid
				}
			})
			// 获取mv地址数据
			const res1 = await this.apiRequest({
				url: '/mv/url',
				data: {
					id: mvid
				}
			})
			// 获取评论数据
			const res2 = await this.apiRequest({
				url: '/comment/mv',
				data: {
					id: mvid
				}
			})
			this.mvMessage = res.data.data
			this.mvUrl = res1.data.data.url
			this.comment = res2.data.hotComments
			console.log(this.comment)
		}
	}
}
</script>

<style lang="less">
.videodetailed {
	.videodetailed_video {
		video {
			width: 100%;
		}
	}
	.videodetailed_content {
		padding: 20rpx;
		.content_name {
			margin-bottom: 10rpx;
			font-size: 35rpx;
			font-weight: 500;
		}
		.content_message {
			color: #cccc;
			font-size: 25rpx;
		}
		.vcontent_comment {
			margin-top: 20rpx;
			.comment_title {
				font-size: 28rpx;
			}
			.content_hot_list {
				display: flex;
				margin-top: 30rpx;
				border-bottom: 1rpx solid #ccc;
				.list_pic {
					flex: 0.5;
					image {
						width: 80%;
						border-radius: 50%;
					}
				}
				.list_content {
					padding-bottom: 20rpx;
					flex: 2;
					.content_name1 {
						padding: 10rpx;
						font-size: 28rpx;
					}
					.content_time {
						font-size: 25rpx;
						padding: 10rpx;
						color: #ccc;
					}
				}
			}
		}
	}
}
</style>
