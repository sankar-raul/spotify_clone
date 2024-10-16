import styles from './layoutController.module.css'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'

const LayoutController = ({handleRightCollapse, rightState}) => {
    const [isSelected, setIsSelected] = useState(rightState !== 'collapse')
    // console.log(rightState)
    useEffect(() => {
        // console.log(rightState)
        setIsSelected(rightState !== 'collapse')
    }, [rightState])
    return (
        <div className={styles.navigators}>
                <SpotiButton onClick={handleRightCollapse} selected={isSelected}/>
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
    handleRightCollapse: PropTypes.func.isRequired,
    rightState: PropTypes.string
}
const SoundController = () => {
    const [soundLevel, setSoundLevel] = useState(100)

    const handleSoundChange = (e) => setSoundLevel(e.target.value)
    return (
        <div className={styles.sound}>
            <NormalIcon src='/sound.svg'/>
            <div>
                <input style={{'--song-played-bar-width': `${soundLevel}%`}} value={soundLevel} max={100} onChange={handleSoundChange} type="range" name="sound" />
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
    useEffect(() => {
        setIsSelected(selected)
    }, [selected])
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

