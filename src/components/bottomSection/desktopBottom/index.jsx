import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import styles from './deskBottom.module.css'
import Controller from './controller'
import Songplate from './songPlate'
import LayoutController from "./layoutController"
export default function DesktopBottom({handleRightCollapse, updateSongInfo}) {
    const [ songInfo, setSongInfo ] = useState(null)
    const updateSongDetails = (songData) => {
        songData && setSongInfo(songData)
    }
    useEffect(() => {
        if (songInfo) {
            updateSongInfo(songInfo)
        }
    }, [songInfo])
    useEffect(() => {
        
    }, [])
    return (
        <section className={styles.deskBottom}>
            <Songplate songData={songInfo}/>
            <Controller updateSongDetails={(data) => updateSongDetails(data)} />
            <LayoutController handleRightCollapse={handleRightCollapse} />
        </section>
    )
}
DesktopBottom.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired,
    updateSongInfo: PropTypes.func.isRequired
}
