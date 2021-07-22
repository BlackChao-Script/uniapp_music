<template>
	<view class="searchdetailed">
		<!-- 搜索框 -->
		<uni-search-bar
			v-model="value"
			:radius="100"
			@confirm="toSearchlist"
			clearButton="auto"
			@focus="focusShow"
			@input="getSuggest"
			@cancel="cancelShow"
		></uni-search-bar>
		<!-- 热门搜索 -->
		<view class="hotsearch" v-if="isShow">
			<view class="hotsearch_title">热门搜索</view>
			<view class="hotsearch_list" v-for="(item, index) in hotLIst" :key="index" @click="toSearchlists(item.first)">
				<view class="list_name">{{ item.first }}</view>
			</view>
		</view>
		<!-- 搜索建议 -->
		<view class="suggest" v-show="isShowa">
			<text decode="true" class="suggest_title">搜索 {{ value }}</text>
			<view class="suggest_list" v-for="(item, index) in suggestList" :key="index" @click="toSearchlists(item.keyword)">
				<text class="list_icon iconfont icon-sousuo"></text>
				<text class="list_name">{{ item.keyword }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			hotLIst: [],
			isShow: true,
			suggestList: [],
			isShowa: false
		}
	},
	onLoad() {
		this.getHotList()
	},
	methods: {
		// 获取热门搜索
		async getHotList() {
			const res = await this.apiRequest({
				url: '/search/hot'
			})
			this.hotLIst = res.data.result.hots
		},
		// 获取搜索建议
		async getSuggest() {
			this.isShowa = 'true'
			const res = await this.apiRequest({
				url: '/search/suggest',
				data: {
					keywords: this.value,
					type: 'mobile'
				}
			})
			this.suggestList = res.data.result.allMatch
		},
		focusShow() {
			this.isShow = false
		},
		cancelShow() {
			this.isShowa = false
			this.isShow = true
		},
		// 页面跳转
		toSearchlists(e){
			const keywords = e
			uni.navigateTo({
				url:`../searchlists/searchlists?keywords=${keywords}`
			})
		},
		toSearchlist(){
			const keywords = this.value 
			uni.navigateTo({
				url:`../searchlists/searchlists?keywords=${keywords}`
			})
		}
	}
}
</script>

<style lang="less">
.hotsearch {
	padding: 20rpx;
	.hotsearch_title {
		font-size: 35rpx;
		font-weight: 600;
	}
	.hotsearch_list {
		float: left;
		margin: 15rpx;
	}
}
.suggest {
	.suggest_title {
		color: #ffc4d0;
	}
	.suggest_list {
		padding: 20rpx;
	}
}
</style>
