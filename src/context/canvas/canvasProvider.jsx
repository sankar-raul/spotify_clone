import { CanvasContext } from "."
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import useVibes from "../Vibes"
export const CanvasProvider = ({children}) => {
    const [isFullCanvas, setIsFullCanvas] = useState(false)
    const [ canvasStatus, setCanvasStatus ] = useState(false)
    const { songData } = useVibes()

    const handleCanvasClick = () => {
        setIsFullCanvas(prev => {
            setCanvasStatus(!prev)
            return !prev
        })
    }
    useEffect(() => {
        if (songData?.canvas) {
            canvasStatus && setIsFullCanvas(true)
        } else {
            isFullCanvas && setCanvasStatus(true)
            setIsFullCanvas(false)
        }
    }, [songData])
    useEffect(() => {
        // console.log(isFullCanvas)
    }, [isFullCanvas])
    return (
        <CanvasContext.Provider value={{
            isFullCanvas,
            setIsFullCanvas,
            handleCanvasClick
            }}>
            {children}
        </CanvasContext.Provider>
    )
}
CanvasProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default CanvasProvider