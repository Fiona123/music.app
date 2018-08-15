<template>
	<div id="app" @touchmove.prevent>
		<m-header></m-header>
		<tab></tab>
		<keep-alive>
			<router-view class="components"></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>

<script>

import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
	name: 'App',
	components: {
	MHeader,
	Player,
	Tab
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "common/stylus/variable"

</style>
