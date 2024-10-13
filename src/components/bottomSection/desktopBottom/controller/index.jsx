import { useState, useEffect } from 'react'
import styles from './controller.module.css'
import PropTypes from 'prop-types'
import songList from '../../../../backend/songlist.json'
import MusicPlayer from '../../../../functions/songPlayer/play'
export default function Controller({updateSongDetails}) {
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ isSuffle, setIsSuffle ] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isHoveredR, setIsHoveredR] = useState(false)
    const [isActiveR, setIsActiveR] = useState(false)
    const [ Player, setPlayer ] = useState(null)
    const [ repeatState, setRepeatState ] = useState(0)
    const [songData, setSongData] = useState(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [playedPercentage, setPlayedPercentage] = useState(0)
    const [currentTimeStamp, setCurrentTimeStamp] = useState('0:00')
    const [durationTimeStamp, setDurationTimeStamp] = useState('0:00')
    const handlePlay = () => {
        setIsPlaying(prev => !prev)
    }
    const update = (data) => {
        setSongData(data)
    }
    const handleSuffleMode = () => {
        setIsSuffle(prev => !prev)
    }
    const handleRepeatMode = () => {
        setRepeatState(prev => {
            return prev < 2 ? prev + 1 : 0
        })
    }
    const nextSong = () => {
        if (!Player) return
        Player.next()
        setIsPlaying(true)
    }
    const prevSong = () => {
        if (!Player) return
        Player.prev()
        setIsPlaying(true)
    }
    const onChange = (element) => {
        setCurrentTime(element.target.value)
        if (Player) Player.currentTime = element.target.value
    }
    const played = () => {
        let playedPercentage = (currentTime / songDuration) * 100
        setPlayedPercentage(playedPercentage)
    }

    useEffect(() => {
        // console.log(songDuration)
        setDurationTimeStamp(`${Math.floor(songDuration / 60)}:${Math.floor(songDuration % 60)}`)
        played()
    }, [songDuration])
    useEffect(() => {
        // console.log(currentTime)
        played()
        setCurrentTimeStamp(`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`)
    }, [currentTime])
    useEffect(() => {
        // console.log(playedPercentage)
    }, [playedPercentage])
    useEffect(() => {
        songData && updateSongDetails({nextSong: nextSong, ...songData})
    }, [songData])
    useEffect(() => {
        if (!Player) return
        Player.isSuffle = isSuffle
    }, [isSuffle])
    useEffect(() => {
        if (!Player) return
        isPlaying ? Player.play() : Player.pause()
        // Player.currentTime = 175
    }, [isPlaying])
    useEffect(() => {
        if (!Player) return
        Player.repeatState = repeatState
    }, [repeatState])
    useEffect(() => {
        !Player && setPlayer(new MusicPlayer(songList, update, {setIsPlaying, setCurrentTime, setSongDuration}))
    }, [])
    return (
        <div className={styles.controllers}>
                <div className={styles.controll_buttons}>
                    <div onMouseDown={() => {setIsActive(true)}} onMouseUp={() => {setIsActive(false)}} onMouseEnter={() => {setIsHovered(prev => !prev)}} onMouseLeave={() => setIsHovered(prev => !prev)} style={isSuffle ? {opacity: isActive ? .65 : 1, '--display-dot': "block"} : {opacity: isActive ? .65 : isHovered ? 1 : .75, '--display-dot': "none"}} onClick={() => {handleSuffleMode()}} className={`${styles.controll_button} ${styles.suff}`}>
                        <div style={isSuffle ? {backgroundColor: "var(--brand-color)"} : {backgroundColor: "#fff"}} className={styles.btn_icon}></div>
                    </div>
                    <div onClick={prevSong} className={`${styles.controll_button}`}></div>
                    <div onClick={handlePlay} className={`${styles.controll_button}`} style={{backgroundImage: `url(${isPlaying ? '/pause-black.svg' : '/play-btn-black.svg'})`, '--bgSize': isPlaying ? '50%' : '65%'}}></div>
                    <div onClick={nextSong} className={`${styles.controll_button}`}></div>
                    <div onMouseDown={() => {setIsActiveR(true)}} onMouseUp={() => {setIsActiveR(false)}} onMouseEnter={() => {setIsHoveredR(prev => !prev)}} onMouseLeave={() => setIsHoveredR(prev => !prev)} style={repeatState != 0 ? {opacity: isActiveR ? .65 : 1, '--display-dot': "block"} : {opacity: isActiveR ? .65 : isHoveredR ? 1 : .75, '--display-dot': "none"}} onClick={() => {handleRepeatMode()}} className={`${styles.controll_button} ${styles.repe}`}>
                        <div style={repeatState != 0 ? repeatState == 2 ? {backgroundColor: "var(--brand-color)", maskImage: "url('/repeat-1.svg')"} : {backgroundColor: "var(--brand-color)"} : {backgroundColor: "#fff"}} className={styles.btn_icon}></div>
                    </div>
                </div>
                <div className={styles.song_slider}>
                    <div className={styles.currentTime}>{currentTimeStamp}</div>
                    <div className={styles.slider}>
                        <div className={styles.slider_input}>
                        <input style={{'--played-percentage': `${playedPercentage}%`}} type="range" value={currentTime} max={songDuration} onChange={function(e) {onChange(e)}}/>
                        </div>
                    </div>
                    <div className={styles.songDuration}>{durationTimeStamp}</div>
                </div>
            </div>
    )
}
Controller.propTypes = {
    updateSongDetails: PropTypes.func.isRequired
}