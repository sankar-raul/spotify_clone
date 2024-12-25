import { CanvasContext } from "."
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
export const CanvasProvider = ({children}) => {
    const [isFullCanvas, setIsFullCanvas] = useState(false)
    const handleCanvasClick = () => {
        setIsFullCanvas(prev => !prev)
    }
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