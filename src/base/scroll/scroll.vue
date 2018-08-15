<template>
	<div class="scroll-wrapper" ref="scrollWrapper">
		<div class="content-wrapper"><slot></slot></div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	const DIRECTION_H = 'horizontal'
	const DIRECTION_V = 'vertical'

	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
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
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			mouseWheel: {
				type: Boolean,
				default: true
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
					// eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
					scrollY: this.direction === DIRECTION_V,
					scrollX: this.direction === DIRECTION_H,
					mouseWheel: this.mouseWheel
				})
				if (this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}
			},
			refresh () {
				this.scroll && this.scroll.refresh()
			},
			scrollTo () {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement () {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll-wrapper
	height 100%
	overflow hidden
</style>
