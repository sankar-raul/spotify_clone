import { useEffect, useState } from "react"
import useLyrics from "../../context/Lyrics"
import useVibes from "../../context/Vibes"
import styles from './lyrics.module.css'
import PropTypes from 'prop-types'
import useGlobal from "../../context/Global"
export const Lyrics = () => {
    const {lyrics} = useLyrics()
    const [displayComponent, setDisplayComponent] = useState(<Loading />)
    useEffect(() => {
        switch(lyrics) {
            case "loading":
                setDisplayComponent(<Loading />)
                break
            case "not found":
                setDisplayComponent(<NotFound />);
                break;
            case "error":
                setDisplayComponent(<ErrorMsg />)
                break;
            case null:
                setDisplayComponent("Error")
                break;
            default:
                setDisplayComponent(<ConstructLyricsLines lyrics={lyrics}/>)
        }
    }, [lyrics])
    return (
        <div className={styles["lyrics-bar"]}>      
            {
                displayComponent
            }
        </div>
    )
}
const ErrorMsg = () => {

    return (
        <div>
            Something went wrong
        </div>
    )
}
const NotFound = () => {

    return (
        <div>
            Lyrics not found
        </div>
    )
}
const Loading = () => {
    const { deviceType } = useGlobal()

    return (
        <div className={styles.loading}>
            <div>
                <div style={{'--animation-delay': '0s'}}></div>
                <div style={{'--animation-delay': '.2s'}}></div>
                <div style={{'--animation-delay': '.5s'}}></div>
                {deviceType == "desktop" ? <div style={{'--animation-delay': '.7s'}}></div> : ''}
            </div>
        </div>
    )
}
const ConstructLyricsLines = ({lyrics}) => {
    
    useEffect(() => {

    }, [lyrics])
    return (
          <div className={styles["lyrics-wraper"]}>
            {
                typeof(lyrics) == 'object' ? lyrics?.map((data, idx) => {
                    return <LyricsLine key={idx} timestamp={data?.seconds} lyrics={data?.lyrics} />
                }) : <ErrorMsg />
            }
            </div>
    )
}
ConstructLyricsLines.propTypes = {
    lyrics: PropTypes.array
}
const LyricsLine = ({timestamp, lyrics}) => {
    const {currentTime, setCurrentTime, Player} = useVibes()
    // console.log(timestamp)
    const classes = {
        current: styles["current"],
        past: styles["past"]
    }
    const gotoTime = () => {
        setCurrentTime(timestamp)
        Player.currentTime = timestamp
    }
    const classTo = timestamp <= currentTime ? classes.past : ''
    useEffect(() => {

    }, [currentTime])
    return (
        <p name={timestamp} onClick={gotoTime} className={`${styles["lyrics-line"]} ${classTo}`}>
            {lyrics}
        </p>
    )
}
LyricsLine.propTypes = {
    timestamp: PropTypes.number.isRequired,
    lyrics: PropTypes.string.isRequired
}
export default Lyrics