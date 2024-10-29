import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
export const AppLayoutSettingsContext = createContext()
export function AppLayoutSettingsProvider({ children }) {
    const [ leftState, setLeftState ] = useState("collapse")
    const [ rightState, setRightState ] = useState("expand")
    const [ layoutChangedTrigger, setLayoutChangedTrigger ] = useState(false)
    useEffect(() => {
      setLayoutChangedTrigger(prev => !prev)
    }, [leftState, rightState])
  return (
    <AppLayoutSettingsContext.Provider value={{
      leftState,
      setLeftState,
      rightState,
      setRightState,
      layoutChangedTrigger,
      setLayoutChangedTrigger
      }}>
        {children}
    </AppLayoutSettingsContext.Provider>
  )
}
AppLayoutSettingsProvider.propTypes = {
    children: PropTypes.node
}
export default AppLayoutSettingsProvider