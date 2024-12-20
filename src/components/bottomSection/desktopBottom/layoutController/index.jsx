import styles from './layoutController.module.css'
import PropTypes from 'prop-types'
import { Vibe } from '../../../../functions/songPlayer/AudioController'
import {useEffect, useState} from 'react'
import SpotiButton from '../../../tiny_components/SpotiButton'
import { useAppLayoutSettings } from '../../../../context/AppLayoutSettings'
import { useLocation } from 'react-router-dom'
import useVibes from '../../../../context/Vibes'
const LayoutController = () => {
    const { rightState, setRightState, applySettings } = useAppLayoutSettings()
    const location = useLocation()
    const isSelected = rightState !== 'collapse'
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
    return (
        <div className={styles.navigators}>
                <SpotiButton type='nowPlaying' src='/now-playing.svg' onClick={handleAppSettings} selected={isSelected}/>
                <SpotiButton type='lyrics' src='/lyrics.svg' onClick={handleAppSettings} selected={location.pathname == '/lyrics'}/>
                <SpotiButton type='queue' src='/queue.svg' onClick={handleAppSettings}/>
                <SpotiButton type='devices' src='/devices.svg' onClick={handleAppSettings}/>
                <SoundController />
                <SpotiButton type='miniPlayer' src='/mini-player.svg' onClick={handleAppSettings}/>
                <NormalIcon src='/fullscreen.svg'/>
        </div>
    )
}
LayoutController.propTypes = {
    rightState: PropTypes.string
}
const SoundController = () => {
    const [icon, setIcon] = useState('/sound.svg')
    const [prevLevel, setPrevLevel] = useState(1)
    const { volume, setVolume } = useVibes()
    const handleSoundChange = (e) => {
        setVolume(e.target.value)
    }
    const handleMute = () => {
        if (volume != 0) {
            setPrevLevel(volume)
            setVolume(0)
        } else {
            setVolume(prevLevel)
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
        if (Vibe)
            Vibe.volume = volume
        handleIcon(volume)
    }, [volume])
    return (
        <div className={styles.sound}>
            <NormalIcon onClick={handleMute} src={icon}/>
            <div>
                <input style={{'--song-played-bar-width': `${volume * 100}%`}} value={volume} max={1} step={0.05} onChange={handleSoundChange} type="range" name="sound" />
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
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default LayoutController

