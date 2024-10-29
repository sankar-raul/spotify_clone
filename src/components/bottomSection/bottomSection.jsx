import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import DesktopBottom from './desktopBottom'
import styles from './bottomSection.module.css'

const BottomSection = ({ deviceType, updateSongInfo }) => {
    const [ device, setDevice ] = useState(null)
    useEffect(() => {
        setDevice(deviceType)
    }, [])
    return (
    <>
        {
            deviceType && device == 'desktop' ? (
                <DesktopBottom className={styles.bottomSection} updateSongInfo={(data) => updateSongInfo(data)} />
            ) : (
                <DesktopBottom className={styles.bottomSection} updateSongInfo={(data) => updateSongInfo(data)} />
            )
        }
    </>
    )
}
BottomSection.propTypes = {
    deviceType: PropTypes.string.isRequired,
    updateSongInfo: PropTypes.func.isRequired
}

export default BottomSection