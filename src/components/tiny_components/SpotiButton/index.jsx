import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import styles from './spotiButton.module.css'
import useAppLayoutSettings from "../../../context/AppLayoutSettings"

export const SpotiButton = ({src='/now-playing.svg', selected = false, btnType}) => {
    const { settings, applySettings, setRightState } = useAppLayoutSettings()
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isSelected, setIsSelected] = useState(selected)
    const handleAppSettings = (type, isSelected) => {
        if (!type) return
        switch (type) {
            case 'nowPlaying':
                setRightState(prevState => prevState === "collapse" ? "expand" : "collapse")
                break;
            default:
                applySettings(type, isSelected)
        }
    }

    const handleClick = () => {
        handleAppSettings(btnType, !isSelected)
    }
    const handleHover = () => {
        setIsHovered(prev => !prev)
    }
    const handleActive = () => {
        setIsActive(prev => !prev)
    }
    useEffect(() => {
        if (settings.updateFor == btnType) { 
            setIsSelected(settings[btnType])
        }
    }, [settings])
    useEffect(() => {
        // console.log(isSelected)
    }, [isSelected])
    useEffect(() => {
        setIsSelected(selected)
    }, [selected])
    return (
        <div style={{'--display-dot': isSelected ? 'block' : 'none', opacity: !isActive ? !isHovered ? isSelected ? '1' : '.8' : '1' : '.8'}} onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover} onMouseDown={handleActive} onMouseUp={handleActive} className={styles.dot}>
            <div style={{maskImage: `url(${src})`, backgroundColor: isSelected ? 'var(--brand-color)' : '#fff'}} className={styles.icon}></div>
        </div>
    )
}
SpotiButton.propTypes = {
    selected: PropTypes.bool,
    src: PropTypes.string,
    btnType: PropTypes.string
}
export default SpotiButton