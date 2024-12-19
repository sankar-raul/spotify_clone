import { useEffect, useState } from "react";
import { LyricsContext } from ".";
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from "react-router-dom";
import useVibes from "../Vibes";
import getLyrics from "../../apis/getLyrics";
export const LyricsProvider = ({children}) => {
const [isLyricsRoute, setIsLyricsRoute] = useState(null)
const [lyrics, setLyrics] = useState(null)
const location = useLocation()
const navigate = useNavigate()
const { songData } = useVibes()
const [ history, setHistory ] = useState([])
useEffect(() => {
    if (isLyricsRoute == null) return
    if (isLyricsRoute) {
        location.pathname != '/lyrics' && navigate('/lyrics')
    } else {
        history.length >= 3 ? navigate(-1) : navigate('/', {replace: true})
    }
}, [isLyricsRoute])
useEffect(() => {
    if (!songData) return
    ;(async () => {
        setLyrics(await getLyrics(songData?.title))
    })()
}, [songData])
useEffect(() => {
    // console.log(lyrics)
}, [lyrics])
useEffect(() => {
    setHistory(prev => [...prev, location.pathname])
}, [location])
    return ( 
        <LyricsContext.Provider value={{isLyricsRoute, setIsLyricsRoute, lyrics}}>
            {children}
        </LyricsContext.Provider>
    )
}
LyricsProvider.propTypes = {
    children: PropTypes.node
}
export default LyricsProvider