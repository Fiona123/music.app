<template>
	<div class="scroll-wrapper" ref="scrollWrapper">
		<div class="content-wrapper"><slot></slot></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	const DIRECTION_H = 'horizontal'
	const DIRECTION_V = 'vertical'

	export default {
		props: {
			probeType: {
				type: Number,
				default: 3
			},
			click: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: DIRECTION_V
			},
			data: {
				type: Array || Object,
				default: null
			}
		},
		watch: {
			data () {
				setTimeout(() => {
					this.refresh()
				}, 20)
			}
		},
		mounted () {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll () {
				this.scroll = new BScroll(this.$refs.scrollWrapper, {
					probeType: this.probeType,
					click: this.click,
					pullDownRefresh: {
						threshold: 50,
						stop: 20
					},
					eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
				})
			},
			refresh () {
				this.scroll && this.scroll.refresh()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll-wrapper
	height 100%
	overflow hidden
</style>
