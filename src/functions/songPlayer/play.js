import songList from '../../backend/songlist.json'
export default class Song {
    constructor(songList, isSuffle = false, repeatState = 0) {
        this.songList = songList
        this.songListLength = songList.length
        this.currentSongIndex = 0
        this.currentSongInfo = songList[this.currentSongIndex]
        this.currentSong = new Audio(this.currentSongInfo.src)
        this.suffle = isSuffle
        this.repeatState = repeatState
        this.queueNext = null
        this.first = true
        this.songStack = []
        // controller
        this.isPlaying = false
        this.duration = this.currentSong.duration
    }
    get played() {
        return  100 / (this.duration / this.currentSong.currentTime)
    }
    set currentTime(time) {
        this.currentSong.currentTime = time
    }
    get currentTime() {
        return this.currentSong.currentTime
    }
    // key handlers
    // prepare song to play
    process() {
        this.currentSongInfo = this.songList[this.currentSongIndex]
        this.currentSong.src = this.currentSongInfo.src
        this.duration = this.currentSong.duration
        this.currentSong.load()
        this.currentSong.onended = () => {
            this.currentSong.onended = () => {}
            if (this.repeatState == 0) {
                if (this.currentSongIndex < this.songListLength) {
                    this.pause()
                } else {
                    this.next()
                }
            } else if (this.repeatState == 1) {
                this.next()
            } else {
                this.currentTime = 0
                this.play()
            }
        }

    }
    // song controller
    play() {
        if (!this.isPlaying) {
            this.currentSong.play()
            this.isPlaying = true
        }
        if (this.first) {
            this.queueNext = this.getQueueSong()
            this.first = false
            this.songStack.push(this.currentSongIndex)
        }
    }
    pause() {
        if (this.isPlaying) {
            this.currentSong.pause()
            this.isPlaying = false
        }
    }
    next() {
        this.isPlaying && this.currentSong.pause()
        if (this.repeatState == 3) {
            this.currentTime = 0
            this.play()
            return
        }
        this.currentSongIndex = this.queueNext
        this.songStack.push(this.currentSongIndex)
        this.process()
        this.currentSong.play()
        this.isPlaying = true
        this.queueNext = this.getQueueSong()
    }
    prev() {
        this.isPlaying && this.currentSong.pause()
        const prev_idx = this.songStack.pop()
        if (!prev_idx) {
            this.currentSongIndex = this.currentSongIndex == 0 ? this.songListLength - 1 : this.currentSongIndex - 1
        } else {
            this.currentSongIndex = prev_idx
        }
        this.process()
        this.currentSong.play()
        this.isPlaying = true
    }
    suffle() {
        const idx = Math.floor(Math.random() * this.songListLength)
        return idx != this.currentSongIndex ? idx : this.suffle()
    }
    getQueueSong() {
        if (this.suffle) {
            return this.suffle()
        } else {
            return this.currentSongIndex < this.songListLength ? this.currentSongIndex + 1 : 0
        }
    }
}

const Player = new Song(songList)
Player.play()