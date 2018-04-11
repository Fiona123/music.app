<template>
	<div class="m-header">
		<div class="icon"></div>
		<h1 class="text">Music FM</h1>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import	"../../common/stylus/variable"
@import	"../../common/stylus/mixin"

.m-header
	height 44px
	color $color-theme
	display flex
	align-items	center
	justify-content center
	.icon
		display inline-block
		width 30px
		height 32px
		margin-right 9px
		background-size 30px 32px
		bg-image('logo')
	.text
		display inline-block
		font-size $font-size-large
</style>
