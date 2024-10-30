import { useEffect, useMemo, useState } from "react"
import { globalContext } from '.'
import PropTypes from 'prop-types'
import userAgent from "../../functions/userAgent"
export const GlobalProvider = ({children}) => {
    const [ resizeTrigger, setResizeTrigger ] = useState(false)
    const [ rootWidth, setRootWidth ] = useState(window.innerWidth)
    const [ deviceType, setDeviceType ] = useState(null)
    const handleResize = () => {
        setRootWidth(window.innerWidth)
        setResizeTrigger(prev => !prev)
        setDeviceType(userAgent())
    }
    useEffect(() => {
        deviceType && console.log(deviceType)
    }, [deviceType])
    const value = useMemo(() => ({ resizeTrigger, rootWidth, deviceType }), [resizeTrigger, rootWidth, deviceType])
    useEffect(() => {
        setDeviceType(userAgent())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <globalContext.Provider value={value}>
            {children}
        </globalContext.Provider>
    )
}
GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default GlobalProvider