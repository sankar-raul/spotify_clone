import { useState } from 'react'
import styles from './controller.module.css'
const repeatStates = ["no repeat", "repeat all", "repeat one"]
export default function Controller() {
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ isSuffle, setIsSuffle ] = useState(false)
    const [ repeatState, setRepeatState ] = useState(0)
    const handlePlay = () => {
        setIsPlaying(prev => prev == false)
    }
    useState(() => {
        
    }, [isPlaying])
    return (
        <div className={styles.controllers}>
                <div className={styles.controll_buttons}>
                    <div className={`${styles.controll_button}`}>
                        
                    </div>
                    <div className={`${styles.controll_button}`}></div>
                    <div onClick={() => handlePlay()} className={`${styles.controll_button}`} style={{backgroundImage: `url(${isPlaying ? '/pause-black.svg' : '/play-btn-black.svg'})`, '--bgSize': isPlaying ? '50%' : '65%'}}></div>
                    <div className={`${styles.controll_button}`}></div>
                    <div className={`${styles.controll_button}`}></div>
                </div>
                <div className={styles.song_slider}>
        slider
                </div>
            </div>
    )
}