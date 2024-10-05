import { useRef, useEffect } from "react"
import PropTypes from 'prop-types'
import styles from './deskBottom.module.css'
import Controller from './controller'
import Songplate from './songPlate'
export default function DesktopBottom({handleRightCollapse}) {
    const buttonRef = useRef(null)
    const handleClick = () => {
        handleRightCollapse()
    }
    useEffect(() => {
        const buttonRefCopy = buttonRef.current
        buttonRefCopy.addEventListener("click", handleClick)
        return () => {
            buttonRefCopy.removeEventListener("click", handleClick)
        }
    }, [])
    return (
        <section className={styles.deskBottom}>
            <Songplate />
            <Controller />
            <div className={styles.navigators}>
                <button ref={buttonRef}>
                collapse
                </button>
            </div>
        </section>
    )
}
DesktopBottom.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired
}
