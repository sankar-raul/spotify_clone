
class MusicPlayer extends Audio {
    constructor(songList, update, client) {
        super(songList[0].src)
        this.songList = songList
        this.songListLength = songList.length
        this.currentSongIndex = 0
        this.currentSongInfo = songList[this.currentSongIndex]
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
        this.update({...this.currentSongInfo, queue: songList[this.queueNext]})
        this.setUpAccessibility()
        this.load()
    }

    // volume getter
    get volume() {
        return super.volume
    }
    // volume setter
    set volume(volume = this.volume) {
        if (volume >= 0 && volume <= 1)
            super.volume = volume
    }

    get played() {
        return 100 / (this.duration / super.currentTime)
    }
    set currentTime(time) {
        if (time != 0 && !time) {
            return
        }
        super.currentTime = parseInt(time)
    }
    get currentTime() {
        return super.currentTime
    }
    get duration() {
        return super.duration
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
                super.onended = () => this.onended()
                
            }
        }
    load() {
        this.currentSongInfo = this.songList[this.currentSongIndex]
        this.src = this.currentSongInfo.src
        super.load()
        // console.log("op")
        super.onended = () => this.onended()
        super.onplay = () => {
            this.play()
            // console.log("ok")
        }
        this.update({...this.currentSongInfo, queue: this.songList[this.queueNext]})
    }

    // song controller
    play() {
        document.title = `${this.currentSongInfo.title} • ${this.currentSongInfo.artists.join(',$#').split('$#').join(' ')}`
        if (this.first) {
            this.queueNext = this.getQueueSong()
            this.first = false
            super.play()
            this.songStack.push(this.currentSongIndex)
            this.client.setIsPlaying(true)
        } else if (!this.isPlaying) {
            super.play()
            this.isPlaying = true
            this.client.setIsPlaying(true)
        }
    }

    // pause the song
    pause() {
        document.title = "Spotify - Web Player: Music for everyone"
        if (this.isPlaying) {
            super.pause()
            this.isPlaying = false
            this.client.setIsPlaying(false)
        }
    }

    // goto next track
    next(startPlaying = true) {
        if (this.repeatState == 2) {
                this.currentTime = 0
                this.play()
                super.onended = () => this.onended()
            return
        }
        this.isPlaying && this.pause()
        this.currentSongIndex = this.queueNext
        this.songStack.push(this.currentSongIndex)
        this.load()
        startPlaying && this.play()
        this.queueNext = this.getQueueSong()
        this.setMediaSessionMetadata()
    }

    // goto previous track
    prev() {
        this.isPlaying && this.pause()
        this.queueNext = this.currentSongIndex
        this.songStack.pop()
        const prev_idx = this.songStack.pop()
        if (!prev_idx) {
            this.currentSongIndex = this.currentSongIndex == 0 ? this.songListLength - 1 : this.currentSongIndex - 1
        } else {
            this.currentSongIndex = prev_idx
        }
        this.load()        
        this.play()
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
        if (e.target.tagName != "INPUT" || e.target.type != 'text') {
        if (e.code === 'Space') {
            // console.log(e)
            e.preventDefault()
            this.isPlaying ? this.pause() : this.play()
        } else if (e.code === 'ArrowRight') {
            e.preventDefault()
            if (this.currentTime + 5 >= this.duration) {
                this.next()
            } else {
                this.currentTime += 5
            }
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault()
            this.currentTime -= 5
        } else if (e.code == 'ArrowDown') {
            e.preventDefault()
            this.client.setVolume(prev => prev > 0 ? parseFloat((prev - .1).toFixed(1)) : prev)
            // console.log("ok")
        } else if (e.code == 'ArrowUp') {
            e.preventDefault() 
            this.client.setVolume(prev => prev < 1 ? parseFloat((prev + .1).toFixed(1)) : prev)
            // this.volume += .1
            // console.log("ok")
        } else {
            // console.log(e.code)
        }
    }
    }

    this.setMediaSessionMetadata()
      navigator.mediaSession.setActionHandler('previoustrack', () => this.prev())
    
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next())

      navigator.mediaSession.setActionHandler('pause', () => {
        this.pause()
      })

      super.onloadedmetadata = () => {
            this.client.setSongDuration(this.duration)
            this.currentTime = 0
        }
        super.ontimeupdate = () => {
            this.client.setCurrentTime(this.currentTime)
        }
    }

}

export default MusicPlayer