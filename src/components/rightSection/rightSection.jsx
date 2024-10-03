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
        // setDisplay(prev => prev == "grid" ? "none" : "grid")
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
                body
            </div>
        </section>
    )
}
RightSection.propTypes = {
    handleWidth: PropTypes.func.isRequired,
    handleRightCollapse: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired
}

export default RightSection