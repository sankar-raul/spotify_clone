class MusicPlayer {
    constructor(songList, update, client) {
        this.songList = songList
        this.songListLength = songList.length
        this.currentSongIndex = 0
        this.currentSongInfo = songList[this.currentSongIndex]
        this.currentSong = new Audio(this.currentSongInfo.src)
        this.isSuffle = false
        this.repeatState = 0
        this.queueNext = 1
        this.first = true
        this.songStack = []
        this.updateTimeout = null
        this.client = client
        // controller
        this.update = update
        this.isPlaying = false
        this._duration = this.currentSong.duration
        this.update({...this.currentSongInfo, queue: songList[this.queueNext]})
    }
    get played() {
        return 100 / (this.duration / this.currentSong.currentTime)
    }
    set currentTime(time) {
        if (time != 0 && !time) {
            return
        }
        this.currentSong.currentTime = parseInt(time)
    }
    get currentTime() {
        return this.currentSong.currentTime
    }
    get duration() {
        return this.currentSong.duration
    }
    set duration(time) {
        this._duration = time
    }
    // key handlers
    // prepare song to play
    suffle() {
        const idx = Math.floor(Math.random() * this.songListLength)
        return idx != this.currentSongIndex ? idx : this.suffle()
    }
    onended() {
            if (this.repeatState == 0) {
                if (this.currentSongIndex >= this.songListLength - 1) {
                    if (this.isSuffle) {
                        this.next()
                    } else {
                        this.next(false)
                        this.client.setIsPlaying(false)
                        this.pause()
                    }
                } else {
                    this.next()
                }
            } else if (this.repeatState == 1) {
                this.next()
            } else {
                this.pause()
                this.currentTime = 0
                this.play()
                this.currentSong.onended = () => this.onended()
                
            }
        }
    process() {
        this.currentSongInfo = this.songList[this.currentSongIndex]
        this.currentSong.src = this.currentSongInfo.src
        this.currentSong.load()
        this.currentSong.ontimeupdate = () => {
            
        }
        // console.log("op")
        this.currentSong.onended = () => this.onended()
        this.currentSong.onpause = () => {
            this.pause()
            // console.log("ok")
        }
        this.currentSong.onplay = () => {
            this.play()
            // console.log("ok")
        }
    }
    // song controller
    play() {
        if (!this.isPlaying) {
            this.currentSong.play()
            this.isPlaying = true
        }
        this.client.setIsPlaying(true)
        if (this.first) {
            // this.process()
            this.currentSong.ontimeupdate = () => {
                // update()
            }
            this.currentSong.onended = () => this.onended()
            this.currentSong.onpause = () => {
                this.pause()
                // console.log("ok")
            }
            this.currentSong.onplay = () => {
                this.play()
                // console.log("ok")
            }
            this.queueNext = this.getQueueSong()
            // this.update({...this.currentSongInfo, queue: this.songList[this.queueNext]})
            this.first = false
            this.songStack.push(this.currentSongIndex)
        }
    }
    pause() {
        if (this.isPlaying) {
            this.currentSong.pause()
            this.isPlaying = false
            this.client.setIsPlaying(false)
        }
    }
    next(startPlaying = true) {
        this.isPlaying && this.currentSong.pause()
        if (this.repeatState == 2) {
            this.pause()
            this.currentTime = 0
            this.play()
            this.currentSong.onended = () => this.onended()
            return
        }
        this.currentSongIndex = this.queueNext
        this.songStack.push(this.currentSongIndex)
        this.process()
        startPlaying && this.currentSong.play()
        this.isPlaying = true
        this.queueNext = this.getQueueSong()
        this.update({...this.currentSongInfo, queue: this.songList[this.queueNext]})
    }
    prev() {
        this.isPlaying && this.currentSong.pause()
        this.queueNext = this.currentSongIndex
        this.songStack.pop()
        const prev_idx = this.songStack.pop()
        if (!prev_idx) {
            this.currentSongIndex = this.currentSongIndex == 0 ? this.songListLength - 1 : this.currentSongIndex - 1
        } else {
            this.currentSongIndex = prev_idx
        }
        this.process()
        this.update({...this.currentSongInfo, queue: this.songList[this.queueNext]})
        this.currentSong.play()
        this.isPlaying = true
    }
    getQueueSong() {
        if (this.isSuffle) {
            return this.suffle()
        } else {
            return this.currentSongIndex < this.songListLength - 1 ? this.currentSongIndex + 1 : 0
        }
    }
}

export default MusicPlayer