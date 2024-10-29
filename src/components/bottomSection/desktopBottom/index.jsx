import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import styles from './deskBottom.module.css'
import Controller from './controller'
import Songplate from './songPlate'
import LayoutController from "./layoutController"
export default function DesktopBottom({ updateSongInfo, className }) {
    const [ songInfo, setSongInfo ] = useState(null)
    const updateSongDetails = (songData) => {
        songData && setSongInfo(songData)
    }
   
    useEffect(() => {
        if (songInfo) {
            updateSongInfo(songInfo)
        }
    }, [songInfo])
    return (
        <section className={`${styles.deskBottom} ${className || ''}`}>
            <Songplate songData={songInfo}/>
            <Controller updateSongDetails={(data) => updateSongDetails(data)} />
            <LayoutController />
        </section>
    )
}
DesktopBottom.propTypes = {
    updateSongInfo: PropTypes.func.isRequired,
    className: PropTypes.string
}
