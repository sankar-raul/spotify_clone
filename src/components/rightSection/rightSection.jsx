import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './rightSection.module.css'

const RightSection = ({ state, handleWidth, handleRightCollapse }) => {
    const rightRef = useRef(null)
    const buttonRef = useRef(null)
    const [ display, setDisplay ] = useState('grid')
    const handleCollapse = () => {
        handleRightCollapse()
    }
    const handleEvent = () => {
        handleWidth('right', rightRef.current.offsetWidth)
    }
    useEffect(() => {
        if (state == 'expand') {
            setDisplay("grid")
        } else {
            setDisplay('none')
        }
    }, [state])
    useEffect(() => {
            // alert()
            handleEvent()
            const buttonRefCopy = buttonRef.current
            buttonRefCopy.addEventListener("click", handleCollapse)
            window.addEventListener("resize", handleEvent)
            return () => {
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section style={{display: display}} ref={rightRef} className={styles.rightSection}>
            <div className={styles.heading}>
                <div className={styles.song_heading}>One The Floor</div>
                <div className={styles.navigator}>
                    <div className={styles.threeDots}>
                </div>
                <div className={styles.closeBtn} ref={buttonRef}></div>
                </div>
            </div>
            <div className={styles.main}>
                <SongBody />
            </div>
        </section>
    )
}
RightSection.propTypes = {
    handleWidth: PropTypes.func.isRequired,
    handleRightCollapse: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired
}

const SongBody = () => {

    return (
        <>
            <div className={styles.song_details}>
                <div className={styles.song_thumb}></div>
                <div className={styles.song_info}>
                    <div className={styles.song_title}>
                        <p>One The Floor</p>
                        <div className={styles.artists}>Jennifer Lopez, Pitbull</div>
                    </div>
                    <div className={styles.actions}>
                        <div title='Copy Song Link' className={styles.copy_btn}></div>
                        <div title='Add to Liked Songs' className={styles.add_song_btn}></div>
                    </div>
                </div>
            </div>
            <div className={styles.about_artist}>
                <div>
                    <p>About the artist</p>
                </div>
                <div className={styles.artist_info}>
                    Jennifer Lopez
                </div>
            </div>
            <div className={styles.credits}>credits</div>
            <div className={styles.next_queue}>next queue</div>
        </>
    )
}

export default RightSection