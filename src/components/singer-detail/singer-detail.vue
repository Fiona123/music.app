<template>
	<transition name="slider">
		<div class="singer-detail">
			singer detail
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">

	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer.js'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song.js'

	export default {
		data () {
			return {
				songs: null
			}
		},
		computed: {
			...mapGetters([
				'singer'
			])
		},
		created () {
			this._getDetail()
		},
		methods: {
			_getDetail () {
				if (!this.singer.id) {
					this.$router.push('/singer')
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.data.list)
						console.log(this.songs)
					}
				})
			},
			_normalizeSongs (list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
.singer-detail
	position fixed
	z-index 100
	left 0
	top 0
	right 0
	bottom 0
	background $color-background
	&.slider-enter-active, &.slider-leave-active
		transition all 0.5s
	&.slider-enter, &.slider-leave-to
		transform translateX(100%)
</style>
