<template>
    <div class="player" v-show="playList.length > 0">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img width="100%" height="100%" :src="currentSong.image">
            </div>
            <div class="top">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title" v-html="currentSong.name"></h1>
                <h2 class="subtitle" v-html="currentSong.singer"></h2>
            </div>
            <div class="middle">
                <div class="middle-l" ref="middleL">
                    <div class="cd-wrapper" ref="cdWrapper">
                        <div class="cd" ref="imageWrapper">
                            <img ref="image" class="image" :class="cdCls" :src="currentSong.image">
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="playing-lyric">{{playingLyric}}</div>
                    </div>
                </div>
                <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">歌词显示</scroll>
            </div>
            <div class="bottom">
                <div class="dot-wrapper">
                    <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
                    <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l">0:21</span>
                    <div class="progress-bar-wrapper">
                        progress bar
                    </div>
                    <span class="time time-r">4:35</span>
                </div>
                <div class="operators">
                    <div class="icon i-left">
                        <i :class="iconMode"></i>
                    </div>
                    <div class="icon i-left" :class="disableCls">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center" :class="disableCls">
                        <i class="needsclick" :class="playIcon"></i>
                    </div>
                    <div class="icon i-right" :class="disableCls">
                        <i class="icon-next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon" :class="favoriteIcon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show="!fullScreen" @click="open"></div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    data() {
        return {
            playingLyric: '正在播放的歌词',
            currentShow: 'cd',
            songReady: true
        }
    },
    computed: {
        cdCls() {
            return 'play'
            // return this.playing ? 'play' : ''
        },
        disableCls() {
            return this.songReady ? '' : 'disable'
        },
        playIcon() {
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong'
        ])
    },
    methods: {
        back() {
            this.setFullScreen(false)
        },
        open() {
            this.setFullScreen(true)
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN'
        })
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.player
    .normal-player
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 150;
        background: $color-background
        .background
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px)
        .top
            position: relative;
            margin-bottom: 25px;
            .back
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back
                    display: block;
                    padding: 9px;
                    font-size: $font-size-large-x
                    color: $color-theme
                    transform: rotate(-90deg)
            .title
                width: 70%
                margin: 0 auto
                line-height: 40px
                text-align: center
                no-wrap()
                font-size: $font-size-large
                color: $color-text
            .subtitle
                line-height: 20px
                text-align: center
                font-size: $font-size-medium
                color: $color-text
        .middle
            position: fixed
            width: 100%
            top: 80px
            bottom: 170px
            white-space: nowrap
            font-size: 0
            .middle-l
                display: inline-block
                vertical-align: top
                position: relative
                width: 100%
                height: 0
                padding-top: 80%
                position: absolute
                .cd-wrapper
                    left: 10%
                    top: 0
                    width: 80%
                    box-sizing: border-box
                    height: 100%
                    position: absolute
                    .cd
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        .image
                            position: absolute
                            left: 0
                            top: 0
                            width: 100%
                            height: 100%
                            box-sizing: border-box
                            border-radius: 50%
                            border: 10px solid rgba(255, 255, 255, 0.1)
                        .play
                            animation: rotate 20s linear infinite
                .playing-lyric-wrapper
                    width: 80%
                    margin: 30px auto 0 auto
                    overflow: hidden
                    text-align: center
                    .playing-lyric
                        height: 20px
                        line-height: 20px
                        font-size: $font-size-medium
                        color: $color-text-l
        .bottom
            position: absolute
            bottom: 50px
            width: 100%
            .dot-wrapper
                text-align: center
                font-size: 0
                .dot
                    display: inline-block
                    vertical-align: middle
                    margin: 0 4px
                    width: 8px
                    height: 8px
                    border-radius: 50%
                    background: $color-text-l
                    &.active
                        width: 20px
                        border-radius: 5px
                        background: $color-text-ll
            .progress-wrapper
                display: flex
                align-items: center
                width: 80%
                margin: 0px auto
                padding: 10px 0
                .time
                    color: $color-text
                    font-size: $font-size-small
                    flex: 0 0 30px
                    line-height: 30px
                    width: 30px
                    &.time-l
                      text-align: left
                    &.time-r
                      text-align: right
                .progress-bar-wrapper
                    flex: 1
            .operators
                display: flex
                align-items: center
                .icon
                    flex: 1
                    color: $color-theme
                    &.disable
                        color: $color-theme-d
                    i
                        font-size: 30px
                .i-left
                    text-align: right
                .i-center
                    padding: 0 20px
                    text-align: center
                    i
                        font-size: 40px
                .i-right
                    text-align: left
                .icon-favorite
                    color: $color-sub-theme
    .mini-player
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;
        z-index: 180;
</style>
