<template>
	<div class="recommend">
		<div v-if="recommends.length" class="slider-wrapper">
			<slider >
				<div v-for="(item,index) in recommends" :key="index">
					<a :href="item.linkUrl">
						<img :src="item.picUrl">
					</a>
				</div>
			</slider>
		</div>
		<div class="recommend-list">
			<h1 class="list-title">热门推荐歌单</h1>
			<ul>
				<li v-for="(item, index) in discList" :key="index" class="list-item">
					<div class="icon">
						<img :src="item.cover"/>
					</div>
					<div class="text">
						<h2 class="discname">{{item.title}}</h2>
						<p class="listennum">播放量：{{item.listen_num}}万</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getRecommend, getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Slider from 'base/slider'

	export default {
		created () {
			console.log('created')
			this._getRecommend()
			this._getDiscList()
		},
		data () {
			return {
				recommends: [],
				discList: []
			}
		},
		methods: {
			_getRecommend () {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
					//	console.log(res.data.slider)
						this.recommends = res.data.slider
					}
				})
			},
			_getDiscList () {
				getDiscList().then((res) => {
					console.log('res = ' + res)
					if (res.code === ERR_OK) {
						this.discList = res.recomPlaylist.data.v_hot
						console.log('getdisclist - ok' + this.discList)
					}
				})
			}
		},
		components: {
			Slider
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'

.recommend
	.slider-wrapper
		width 100%
		overflow hidden
	.recommend-list
		.list-title
			height 65px
			line-height 65px
			text-align center
			font-size $font-size-medium
			color $color-theme
		.list-item
			display flex
			box-sizing border-box
			padding 0 20px 20px 20px
			.icon
				flex 0 0 60px
				width 60px
				padding-right 20px
				img
					width 60px
					height 60px
			.text
				flex 1
				display flex
				flex-direction column
				justify-content center
				line-height 20px
				overflow hidden
				font-size $font-size-medium
				.discname
					font-size 12px
					margin-bottom 10px
					color $color-text
				.listennum
					font-size 12px
					color $color-text-d
</style>
