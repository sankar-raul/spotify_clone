import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import styles from './spotiButton.module.css'

export const SpotiButton = ({src='/now-playing.svg', onClick = null, selected = false}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isSelected, setIsSelected] = useState(selected)
    const handleClick = () => {
        setIsSelected(prev => !prev)
        onClick && onClick()
    }
    const handleHover = () => {
        setIsHovered(prev => !prev)
    }
    const handleActive = () => {
        setIsActive(prev => !prev)
    }
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
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    src: PropTypes.string
}
export default SpotiButton