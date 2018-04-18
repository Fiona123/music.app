<template>
	<transition name="fade">
		<div class="refresh" ref="refresh" v-show="loading">
			<img src="./loading.gif">
			<span>{{text}}</span>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			text: {
				type: String,
				default: '正在载入...'
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			show () {
				this.showIndicator = true
			},
			hide () {
				this.showIndicator = false
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'

.refresh
	display flex
	height 50px
	width 100%
	justify-content center
	align-items center
	transform translateY(0)
	&.fade-enter-active, &.fade-leave-active
		transition all 0.5s
	&.fade-enter, &.fade-leave-active
		transform translateY(-100%)
	img
		width 25px
		height 25px
		margin-right 8px
	span
		font-size $font-size-small
		color $color-text-l
</style>
