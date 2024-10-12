import styles from './layoutController.module.css'
import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'

const LayoutController = ({handleRightCollapse}) => {

    return (
        <div className={styles.navigators}>
                <SpotiButton onClick={handleRightCollapse} selected/>
                <SpotiButton />
                <SpotiButton />
                <SpotiButton />
                <SoundController />
                <SpotiButton />
                <div className={styles.fullScreen}></div>
        </div>
    )
}
LayoutController.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired
}
const SoundController = () => {

    return (
        <div className={styles.sound}>
            <NormalIcon src='/sound.svg'/>
            <div>
                <input type="range" name="sound" />
            </div>
        </div>
    )
}
const NormalIcon = ({src = ''}) => {
    return (
        <div className={styles.NormalIcon} style={{backgroundImage: `url(${src})`}}>
        </div>
    )
}
NormalIcon.propTypes = {
    src: PropTypes.string
}

const SpotiButton = ({onClick = null, selected = false}) => {
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
    return (
        <div style={{'--display-dot': isSelected ? 'block' : 'none', opacity: !isActive ? !isHovered ? isSelected ? '1' : '.8' : '1' : '.8'}} onClick={handleClick} onMouseEnter={handleHover} onMouseLeave={handleHover} onMouseDown={handleActive} onMouseUp={handleActive} className={styles.dot}>
            <div style={{backgroundColor: isSelected ? 'var(--brand-color)' : '#fff'}} className={styles.icon}></div>
        </div>
    )
}
SpotiButton.propTypes = {
    onClick: PropTypes.func,
    selected: PropTypes.bool
}
export default LayoutController

