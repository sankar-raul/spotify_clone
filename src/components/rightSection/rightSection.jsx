import { useEffect, useRef, useState } from 'react'
import styles from './rightSection.module.css'
import StickyHeader from '../tiny_components/stickyHeader'
import { useAppLayoutSettings } from '../../context/AppLayoutSettings'
import useVibes from '../../context/Vibes'
import SongDetails from './songdetails'
import AboutArtist from './aboutArtist'
import Credits from './credits'
import Queue from './queue'
import Canvas from './canvas'

const RightSection = () => {
    const rightRef = useRef(null)
    const { songData } = useVibes()
    const [ rightWidth, setRightWidth ] = useState(null)
    const { rightState, setRightState } = useAppLayoutSettings()
    const [ display, setDisplay ] = useState('block')
    const { setWidth } = useAppLayoutSettings()
    const handleCollapse = () => {
        setRightState(prevState => prevState === "collapse" ? "expand" : "collapse")
    }
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setRightWidth(entry.contentRect.width)
        }
    })
  
    useEffect(() => {
        setWidth('right', rightWidth)
    }, [rightWidth])
    useEffect(() => {
        setDisplay(rightState == 'expand' ? "block" : "none")
    }, [rightState])
    useEffect(() => {
        resizeObserver.observe(rightRef.current)
        return () => resizeObserver.disconnect()
    }, [])
    return (
        <section style={{display: display}} ref={rightRef} className={styles.rightSection}>
            <StickyHeader>
                <div className={styles.heading}>
                    <div className={styles.song_heading}>
                        <p>{songData?.title}</p>
                    </div>
                    <div className={styles.navigator}>
                        <div className={styles.threeDots}></div>
                        <div className={styles.closeBtn} onClick={handleCollapse}></div>
                    </div>
                </div>
            </StickyHeader>
            <div className={styles['child-container']}>
                <SongBody/>
           </div>
           { songData?.canvas && <Canvas src={songData.canvas}/> }
        </section>
    )
}

const SongBody = () => {

    return (
        <div>
            <div className={styles.main}>
                <SongDetails />
                <AboutArtist />
                <Credits />
                <Queue />
            </div>
        </div>
    )
}

export default RightSection