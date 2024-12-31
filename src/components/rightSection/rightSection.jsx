import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    const handleCollapse = useCallback(() => {
        setRightState(prevState => prevState === "collapse" ? "expand" : "collapse")
    }, [setRightState])
    const resizeObserver = useMemo(() => new ResizeObserver((entries) => {
        for (let entry of entries) {
            setRightWidth(entry.contentRect.width)
        }
    }), [])
  
    useEffect(() => {
        // console.log("ok")
        setWidth('right', rightWidth)
    }, [rightWidth, setWidth])

    useEffect(() => {
        // console.log("dfdf")
    }, [setWidth, songData, rightWidth, setDisplay, setRightWidth])

    useEffect(() => {
        // console.log("ok")
        setDisplay(rightState == 'expand' ? "block" : "none")
    }, [rightState])

    useEffect(() => {
        // console.log("op")
        resizeObserver.observe(rightRef.current)
        return () => resizeObserver.disconnect()
    }, [resizeObserver])
    // console.log("song pp")
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
    // console.log("song")
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