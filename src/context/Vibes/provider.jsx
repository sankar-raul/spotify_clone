import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { vibesContext } from '.'
import {player as spotiPlayer} from '../../functions/songPlayer/AudioController'
import songList from '../../backend/songlist.json'

export const VibesProvider = ({children}) => {
    const [ songData, setSongData ] = useState(null)
    const [ currentTime, setCurrentTime ] = useState(0)
    // mmm
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ isSuffle, setIsSuffle ] = useState(false)
    const [ Player, setPlayer ] = useState(null)
    const [ repeatState, setRepeatState ] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [playedPercentage, setPlayedPercentage] = useState(0)
  
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
        played()
    }, [songDuration])
    useEffect(() => {
        // console.log(currentTime)
        played()
    }, [currentTime])
    useEffect(() => {
        // console.log(playedPercentage)
    }, [playedPercentage])
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
        !Player && setPlayer(spotiPlayer(songList, update, {setIsPlaying, setCurrentTime, setSongDuration}))
    }, [])
    //mmmm

    useEffect(() => {
        // console.log(currentTime)
    }, [currentTime])
    useEffect(() => {
        // console.log(songData)
    }, [songData])

    return (
        <vibesContext.Provider value={{
            songData,
            setSongData,
            currentTime,
            setCurrentTime,
            onChange,
            prevSong,
            nextSong,
            handleRepeatMode,
            handleSuffleMode,
            handlePlay,
            Player,
            repeatState,
            update,
            playedPercentage,
            isPlaying,
            songDuration
            }}>
            {children}
        </vibesContext.Provider>
    )
}
VibesProvider.propTypes = {
    children: PropTypes.node
}
export default VibesProvider