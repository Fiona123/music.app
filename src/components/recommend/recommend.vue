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
	</div>
</template>

<script type="text/ecmascript-6">
	import {getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Slider from 'base/slider'

	export default {
		created () {
			this._getRecommend()
		},
		data () {
			return {
				recommends: []
			}
		},
		methods: {
			_getRecommend () {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						console.log(res.data.slider)
						this.recommends = res.data.slider
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
.recommend
	.slider-wrapper
		width 100%
		overflow hidden
</style>
