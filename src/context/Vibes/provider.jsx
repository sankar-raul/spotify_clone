import { useCallback, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { vibesContext } from '.'
import {player as spotiPlayer} from '../../functions/songPlayer/AudioController'
import songList from '../../backend/songlist.json'

export const VibesProvider = ({children}) => {
    // console.log("Vibes")
    const [ songData, setSongData ] = useState(null)
    const [ currentTime, setCurrentTime ] = useState(0)
    // mmm
    const [ volume, setVolume ] = useState(1)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ isSuffle, setIsSuffle ] = useState(false)
    const [ Player, setPlayer ] = useState(null)
    const [ repeatState, setRepeatState ] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [playedPercentage, setPlayedPercentage] = useState(0)
    const handlePlay = useCallback(() => {
        setIsPlaying(prev => !prev)
    }, [])
    const update = useCallback((data) => {
        setSongData(data)
    }, [])
    const handleSuffleMode = useCallback(() => {
        setIsSuffle(prev => !prev)
    }, [])
    const handleRepeatMode = useCallback(() => {
        setRepeatState(prev => {
            return prev < 2 ? prev + 1 : 0
        })
    }, [])
    const nextSong = useCallback(() => {
        if (!Player) return
        Player.next()
        setIsPlaying(true)
    }, [Player])
    const prevSong = useCallback(() => {
        if (!Player) return
        Player.prev()
        setIsPlaying(true)
    }, [Player])
    const onChange = useCallback((element) => {
        setCurrentTime(element.target.value)
        if (Player) Player.currentTime = element.target.value
    }, [Player])
    const played = useCallback(() => {
        let playedPercentage = (currentTime / songDuration) * 100
        setPlayedPercentage(playedPercentage)
    }, [currentTime, songDuration])

    useEffect(() => {
        // if (volume < 0 || volume > 1) return;
        // if (Vibe) Vibe.volume = volume;
        // console.log(volume)
    }, [volume])

    useEffect(() => {
        played()
    }, [currentTime, songDuration, played])

    useEffect(() => {
        // console.log(playedPercentage)
    }, [playedPercentage])
    useEffect(() => {
        if (!Player) return
        Player.isSuffle = isSuffle
    }, [isSuffle, Player])
    useEffect(() => {
        if (!Player) return
        isPlaying ? Player.play() : Player.pause()
        // Player.currentTime = 175
    }, [isPlaying, Player])
    useEffect(() => {
        if (!Player) return
        Player.repeatState = repeatState
    }, [repeatState, Player])
    useEffect(() => {
        !Player && setPlayer(spotiPlayer(songList, update, {setIsPlaying, setCurrentTime, setSongDuration, setVolume}))
    }, [Player, update])
    //mmmm

    useEffect(() => {
        // console.log(currentTime)
    }, [currentTime])
    useEffect(() => {
        // console.log(songDuration)
    }, [songDuration])

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
            songDuration,
            volume,
            setVolume
            }}>
            {children}
        </vibesContext.Provider>
    )
}
VibesProvider.propTypes = {
    children: PropTypes.node
}
export default VibesProvider