import { useEffect, useRef } from 'react'
import './rightSection.css'

const RightSection = ({ handleWidth }) => {
    const rightRef = useRef(null)
    const handleEvent = () => {
        handleWidth('right', rightRef.current.offsetWidth)
    }
    useEffect(() => {
            // alert()
            handleEvent()
            window.addEventListener("resize", handleEvent)
            return () => {
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section ref={rightRef} className="rightSection">
                right Section
        </section>
    )
}
export default RightSection