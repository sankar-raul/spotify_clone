import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import DesktopBottom from './desktopBottom'
import styles from './bottomSection.module.css'

const BottomSection = ({ handleRightCollapse, deviceType, updateSongInfo }) => {
    const [ device, setDevice ] = useState(null)
    useEffect(() => {
        setDevice(deviceType)
    }, [])
    return (
    <>
        {
            deviceType && device == 'desktop' ? (
                <DesktopBottom updateSongInfo={(data) => updateSongInfo(data)} handleRightCollapse={handleRightCollapse}/>
            ) : (
                <section className={styles.bottomSection}>
                    {device}
                </section>
            )
        }
    </>
    )
}
BottomSection.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired,
    deviceType: PropTypes.string.isRequired,
    updateSongInfo: PropTypes.func.isRequired
}

export default BottomSection