import styles from './layoutController.module.css'
import PropTypes from 'prop-types'
import { Vibe } from '../../../../functions/songPlayer/AudioController'
import {useEffect, useState} from 'react'
import SpotiButton from '../../../tiny_components/SpotiButton'

const LayoutController = ({handleRightCollapse, rightState}) => {
    const [isSelected, setIsSelected] = useState(rightState !== 'collapse')
    // console.log(rightState)
    useEffect(() => {
        // console.log(rightState)
        setIsSelected(rightState !== 'collapse')
    }, [rightState])
    return (
        <div className={styles.navigators}>
                <SpotiButton src='/now-playing.svg' onClick={handleRightCollapse} selected={isSelected}/>
                <SpotiButton src='/lyrics.svg'/>
                <SpotiButton src='/queue.svg'/>
                <SpotiButton src='/devices.svg'/>
                <SoundController />
                <SpotiButton src='/mini-player.svg'/>
                <NormalIcon src='/fullscreen.svg'/>
        </div>
    )
}
LayoutController.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired,
    rightState: PropTypes.string
}
const SoundController = () => {
    const [soundLevel, setSoundLevel] = useState(1)
    const [icon, setIcon] = useState('/sound.svg')
    const [prevLevel, setPrevLevel] = useState(1)
    const handleSoundChange = (e) => {
        setSoundLevel(e.target.value)
    }
    const handleMute = () => {
        if (soundLevel != 0) {
            setPrevLevel(soundLevel)
            setSoundLevel(0)
        } else {
            setSoundLevel(prevLevel)
        }
    }
    const handleIcon = (level) => {
        if (level == 0) {
            setIcon('/mute.svg')
        } else if (level > 0 && level < 0.35) {
            setIcon('/sound-2.svg')
        } else if (level >= 0.35 && level < 0.75) {
            setIcon('/sound-3.svg')
        } else {
            setIcon('/sound.svg')
        }
    }
    useEffect(() => {
        Vibe.volume = soundLevel
        handleIcon(soundLevel)
    }, [soundLevel])
    return (
        <div className={styles.sound}>
            <NormalIcon onClick={handleMute} src={icon}/>
            <div>
                <input style={{'--song-played-bar-width': `${soundLevel * 100}%`}} value={soundLevel} max={1} step={0.05} onChange={handleSoundChange} type="range" name="sound" />
            </div>
        </div>
    )
}
const NormalIcon = ({src = '', style = {}, onClick = null}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick} className={styles.NormalIcon} style={{...style,backgroundImage: `url(${src})`, opacity: isHovered ? 1 : 0.8}}></div>
    )
}
NormalIcon.propTypes = {
    src: PropTypes.string,
    style: PropTypes.object
}

export default LayoutController

