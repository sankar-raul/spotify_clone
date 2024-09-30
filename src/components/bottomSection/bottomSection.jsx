import PropTypes from 'prop-types'
import { useRef, useEffect } from 'react'
import './bottomSection.css'

const BottomSection = ({ handleRightCollapse }) => {
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
        <section className="bottomSection">
                Bottom Section
                <button ref={buttonRef}>
                collapse
                </button>
        </section>
    )
}
BottomSection.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired
}

export default BottomSection