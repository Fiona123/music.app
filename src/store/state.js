import {playMode} from 'common/js/config'

const state = {
	singer: {},
    playing: false, // 是否正在播放歌曲
    fullScreen: false, // 播放器收起展开
    playList: [], // 当前播放的歌曲列表
    sequenceList: [], // 顺序列表，根据播放模式，和playList的顺序可能不同
    mode: playMode.sequence,
    currentIndex: -1 // 当前播放歌曲的索引 playList[currentIndex] == currentSong
}

export default state
