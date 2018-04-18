<template>
	<div class="list-container">
		<loading :loading="!data.length"></loading>
		<div class="list-view">
			<scroll class="list-scroll"
			:data="data"
			ref="listScroll"
			:listenScroll = "listenScroll"
			@scroll="scroll"
			:probeType = "probeType">
			<ul>
				<li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
					<h2 class="list-group-title">{{group.title}}</h2>
					<ul>
						<li v-for="(item,index) in group.items" :key="index" class="list-group-item">
							<img v-lazy="item.avatar" class="avatar">
							<span class="name">{{item.name}}</span>
						</li>
					</ul>
				</li>
			</ul>
			</scroll>
			<div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
				<ul>
					<li class="item" v-for="(item, index) in shortCutList" :data-index="index" :key="index" :class="{'current': currentIndex == index}">
						{{item}}
					</li>
				</ul>
			</div>
			<div class="list-fixed" ref="listFixed" v-show="fixedTitle">
				<div class="fixed-title">{{fixedTitle}}</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom'
	import Loading from 'base/loading/loading'
	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 29

	export default {
		props: {
			data: {
				type: Array,
				default: () => { return [] }	// [{title: '', items: []}, {title: '', items: []}]
			}
		},
		data () {
			return {
				scrollY: -1, // 左边列表滚动位置的Y值
				currentIndex: 0, // 当前选中的index
				diff: 0 // fixed-title和滚动上去的区块的title的高度差，为了做fixed-title的动画
			}
		},
		watch: {
			data () {
				setTimeout(() => {
					this._calculateHeight()
				}, 20)
			},
			diff (newVal) {
				console.log(newVal)
				// 观测diff变化，决定fixed title动画
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
				if (this.fixedTop === fixedTop) {
					return
				}
				this.fixedTop = fixedTop
				this.$refs.listFixed.style.transform = 	`translate3d(0,${fixedTop}px,0)`
			},
			scrollY (newY) {
				const listHeight = this.listHeight
				// 在上面滚动
				if (newY > 0) {
					this.currentIndex = 0
					return
				}

				// 中间部分滚动
				for (let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if (-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						this.diff = height2 + newY
						return
					}
				}

				// 在下面滚动
				if (newY > listHeight[listHeight.length - 1]) {
					this.currentIndex = listHeight.length
				}
				this.currentIndex = 0
			}
		},
		created () {
			this.touch = {}
			this.listenScroll = true
			this.listHeight = []
			this.probeType = 3
		},
		computed: {
			shortCutList () {
				return this.data.map((group) => {
					return group.title.substr(0, 1)
				})
			},
			fixedTitle () {
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
			}
		},
		methods: {
			onShortCutTouchStart (e) {
				let anchorIndex = getData(e.target, 'index')

				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex

				this._scrollTo(anchorIndex)
			},
			onShortCutTouchMove (e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta

				this._scrollTo(anchorIndex)
			},
			scroll (pos) {
				// 左边列表滚动时跟踪y值
				this.scrollY = pos.y
			},
			_scrollTo (index) {
				if (index < 0) {
					index = 0
				}
				this.currentIndex = index
				this.$refs.listScroll.scrollToElement(this.$refs.listGroup[index], 0)
			},
			_calculateHeight () {
				this.listHeight = []
				const list = this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
				for (var i = 0; i < list.length; i++) {
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'
.list-container
	height 100%
	overflow hidden
.list-view
	position relative
	height 100%
	overflow hidden
	.list-scroll
		background: $color-background
		.list-group
			padding-bottom 20px
			.list-group-title
				height 30px
				line-height 30px
				padding-left 20px
				font-size $font-size-small
				color $color-text-l
				background $color-highlight-background
			.list-group-item
				display flex
				align-items center
				padding 10px 0 0 30px
				.avatar
					width 50px
					height 50px
					border-radius 50%
				.name
					margin-left 20px
					color $color-text-l
					font-size $font-size-medium
	.list-shortcut
		position absolute
		z-index 30
		top 50%
		transform: translateY(-50%)
		right 0
		width 20px
		padding 20px 0
		background: $color-background-d
		border-radius 10px
		font-family: Helvetica
		font-family: Helvetica
		.item
			padding 3px
			line-height 1
			color $color-text-l
			font-size $font-size-small
			&.current
				color $color-theme
	.list-fixed
		position absolute
		top -1px
		left 0px
		width 100%
		.fixed-title
			height 30px
			line-height 30px
			padding-left 20px
			font-size $font-size-small
			color $color-text-l
			background $color-highlight-background
</style>
