import { useRef, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import styles from './deskBottom.module.css'
import Controller from './controller'
import Songplate from './songPlate'
export default function DesktopBottom({handleRightCollapse, updateSongInfo}) {
    const buttonRef = useRef(null)
    const [ songInfo, setSongInfo ] = useState(null)
    const handleClick = () => {
        handleRightCollapse()
    }
    const updateSongDetails = (songData) => {
        songData && setSongInfo(songData)
    }
    useEffect(() => {
        if (songInfo) {
            updateSongInfo(songInfo)
        }
    }, [songInfo])
    useEffect(() => {
        const buttonRefCopy = buttonRef.current
        buttonRefCopy.addEventListener("click", handleClick)
        return () => {
            buttonRefCopy.removeEventListener("click", handleClick)
        }
    }, [])
    return (
        <section className={styles.deskBottom}>
            <Songplate songData={songInfo}/>
            <Controller updateSongDetails={(data) => updateSongDetails(data)}/>
            <div className={styles.navigators}>
                <button ref={buttonRef}>
                    collapse
                </button>
            </div>
        </section>
    )
}
DesktopBottom.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired,
    updateSongInfo: PropTypes.func.isRequired
}
