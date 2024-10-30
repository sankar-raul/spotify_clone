import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { vibesContext } from '.'
export const VibesProvider = ({children}) => {
    const [ songData, setSongData ] = useState(null)
    useEffect(() => {
        // console.log(songData)
    }, [songData])
    return (
        <vibesContext.Provider value={{songData, setSongData}}>
            {children}
        </vibesContext.Provider>
    )
}
VibesProvider.propTypes = {
    children: PropTypes.node
}
export default VibesProvider