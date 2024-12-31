import { useEffect, useState } from "react";
import { LyricsContext } from ".";
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from "react-router-dom";
import useVibes from "../Vibes";
import getLyrics from "../../apis/getLyrics";
export const LyricsProvider = ({children}) => {
    // console.log("Lyrics")
const [isLyricsRoute, setIsLyricsRoute] = useState(null)
const [lyrics, setLyrics] = useState(null)
const location = useLocation()
const navigate = useNavigate()
const { songData } = useVibes()
// const [ history, setHistory ] = useState([])
// useEffect(() => {
//     if (isLyricsRoute == null) return
//     if (isLyricsRoute) {
//         location.pathname != '/lyrics' && navigate('/lyrics')
//     } else {
//         history.length >= 3 ? navigate(-1) : navigate('/', {replace: true})
//     }
// }, [isLyricsRoute])
useEffect(() => {
    if (!songData) return
    setLyrics("loading")
    ;(async () => {
        try {
            const songLines = await getLyrics(songData?.title);
            setLyrics(songLines);
        } catch(error) {
            console.log(error)
            setLyrics("error")
        }
    })()
    return () => {
        // controller.abort()
    }
}, [songData])
useEffect(() => {
    // console.log(lyrics)
}, [lyrics])

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