import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import DesktopBottom from './desktopBottom'
import styles from './bottomSection.module.css'

const BottomSection = ({ handleRightCollapse, deviceType, updateSongInfo, rightState }) => {
    const [ device, setDevice ] = useState(null)
    // console.log(rightState)
    useEffect(() => {
        setDevice(deviceType)
    }, [])
    return (
    <>
        {
            deviceType && device == 'desktop' ? (
                <DesktopBottom rightState={rightState} updateSongInfo={(data) => updateSongInfo(data)} handleRightCollapse={handleRightCollapse}/>
            ) : (
                <DesktopBottom rightState={rightState} updateSongInfo={(data) => updateSongInfo(data)} handleRightCollapse={handleRightCollapse}/>
            )
        }
    </>
    )
}
BottomSection.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired,
    deviceType: PropTypes.string.isRequired,
    updateSongInfo: PropTypes.func.isRequired,
    rightState: PropTypes.string
}

export default BottomSection