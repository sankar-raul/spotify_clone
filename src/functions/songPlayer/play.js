
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
        this.setUpAccessibility()
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
        document.title = `${this.currentSongInfo.title} • ${this.currentSongInfo.artists.join(',$#').split('$#').join(' ')}`
        if (!this.isPlaying) {
            this.currentSong.play()
            this.isPlaying = true
        }
        this.client.setIsPlaying(true)
        if (this.first) {
            // this.process()
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
        console.log("ok")
        document.title = "Spotify - Web Player: Music for everyone"
        if (this.isPlaying) {
            this.currentSong.pause()
            this.isPlaying = false
            this.client.setIsPlaying(false)
            console.log("okp")
        }
    }
    next(startPlaying = true) {
        if (this.repeatState == 2) {
                this.currentTime = 0
                this.play()
                this.currentSong.onended = () => this.onended()
            return
        }
        this.isPlaying && this.currentSong.pause()
        this.currentSongIndex = this.queueNext
        this.songStack.push(this.currentSongIndex)
        this.process()
        startPlaying && this.currentSong.play()
        this.isPlaying = true
        this.queueNext = this.getQueueSong()
        this.update({...this.currentSongInfo, queue: this.songList[this.queueNext]})
        this.setMediaSessionMetadata()
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
        this.setMediaSessionMetadata()
    }
    getQueueSong() {
        if (this.isSuffle) {
            return this.suffle()
        } else {
            return this.currentSongIndex < this.songListLength - 1 ? this.currentSongIndex + 1 : 0
        }
    }


    // accessibility
    setMediaSessionMetadata() {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: this.currentSongInfo.title,
            artist: this.currentSongInfo.artists.join(',$#').split('$#').join(' '),
            artwork: [
              { src: this.currentSongInfo.song_thumb, sizes: "512x512", type: "image/png" }
            ]
          })
      }
    setUpAccessibility() {
    
      // key controllers
      document.onkeydown = (e) => {
        if (e.code === 'Space') {
            this.isPlaying ? this.pause() : this.play()
        } else if (e.code === 'ArrowRight') {
            if (this.currentTime + 5 >= this.duration) {
                this.next()
            } else {
                this.currentTime += 5
            }
        } else if (e.code === 'ArrowLeft') {
            this.currentTime -= 5
        } else {
            // console.log(e.code)
        }
    }

    this.setMediaSessionMetadata()
      navigator.mediaSession.setActionHandler('previoustrack', () => this.prev())
    
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next())
      this.currentSong.onloadedmetadata = () => {
            this.client.setSongDuration(this.currentSong.duration)
            this.currentTime = 0
        }
        this.currentSong.ontimeupdate = () => {
            this.client.setCurrentTime(this.currentTime)
        }
    }

}

export default MusicPlayer