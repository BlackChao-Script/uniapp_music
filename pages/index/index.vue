<template>
	<view class="container">
		<!-- 显示与隐藏播放器 -->
		<view><view class="content_kaiguan iconfont icon-yinleyinpu" @click="open" /></view>
		<!-- 搜索栏 -->
		<search></search>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swipers" :key="index">
				<view class="swiper-item"><image :src="item.pic" mode="widthFix"></image></view>
			</swiper-item>
		</swiper>
		<!-- 歌曲推荐 -->
		<recommend :musicLists="musicLists"></recommend>
		<!-- 热门歌单 -->
		<popula-song-list :PopulaSongList="PopulaSongList"></popula-song-list>
		<!-- audio -->
		<uni-transition mode-class="fade" :duration="1000" :show="show" @change="change"><gw-audiott :autoplay="true" :src="path" color="#fbe8e7" /></uni-transition>
	</view>
</template>
<script>
import search from '../../component/index/search.vue'
import recommend from '../../component/index/recommend.vue'
import populaSongList from '../../component/index/populaSongList.vue'
import gwAudiott from '@/component/video/gw-audiott/gw-audiott.vue'
export default {
	data() {
		return {
			swipers: [],
			musicLists: [],
			PopulaSongList: [],
			path: "",
			show: false
		}
	},
	components: {
		search,
		recommend,
		populaSongList,
		gwAudiott
	},
	computed:{ 
		getpath(){
			return this.path=this.$store.state.url
		}
	},
	onLoad() {
		this.getSwipers()
		this.getRecommendMusicList()
		this.getPopulaSongList()
	},
	methods: {
		open(mode) {
			this.show = !this.show
		},
		change() {
			console.log('触发动画')
		},
		// 获取轮播图数据
		async getSwipers() {
			const res = await this.apiRequest({
				url: '/banner?type=1'
			})
			this.swipers = res.data.banners
		},
		// 获取歌曲推荐数据
		async getRecommendMusicList() {
			const res = await this.apiRequest({
				url: '/personalized/newsong'
			})
			this.musicLists = res.data.result
		},
		// 获取热门歌单数据
		async getPopulaSongList() {
			const res = await this.apiRequest({
				url: '/personalized?limit=6'
			})
			this.PopulaSongList = res.data.result
		}
	}
}
</script>

<style lang="less">
.container {
	.content_kaiguan {
		position: fixed;
		bottom: 200rpx;
		right: 50rpx;

		font-size: 45rpx;
		color: #ffaef5;
	}
	swiper {
		width: 750rpx;
		height: 300rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
