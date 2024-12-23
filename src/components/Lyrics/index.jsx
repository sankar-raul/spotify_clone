import { useEffect } from "react"
import useLyrics from "../../context/Lyrics"
import useVibes from "../../context/Vibes"
import styles from './lyrics.module.css'
import PropTypes from 'prop-types'
export const Lyrics = () => {
    const {lyrics} = useLyrics()
    return (
        <div className={styles["lyrics-bar"]}>
            <div className={styles["lyrics-wraper"]}>
            {lyrics?.map((data, idx) => {
                return <LyricsLine key={idx} timestamp={data?.seconds} lyrics={data?.lyrics} />
            })}
            </div>
        </div>
    )
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