import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AppLayoutSettingsContext } from '.'
export function AppLayoutSettingsProvider({ children }) {
    const [ leftState, setLeftState ] = useState("collapse")
    const [ rightState, setRightState ] = useState("expand")
    const [ layoutChangedTrigger, setLayoutChangedTrigger ] = useState(false)
    const [ layoutWidth, setLayoutWidth ] = useState({})
    const [ settings, setSettings ] = useState({})
    const setWidth = (type, width) => {
      setLayoutWidth(prev => ({
        ...prev, [type]: width
      }))
  }
    const applySettings = (settingFor, settingValue) => {
      if (!settingFor || isNaN(settingValue)) {
        return
      }
      setSettings(prevSettings => ({
        ...prevSettings, [settingFor]: settingValue
      }))
    }
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
      setLayoutChangedTrigger,
      applySettings,
      settings,
      layoutWidth,
      setWidth
      }}>
        {children}
    </AppLayoutSettingsContext.Provider>
  )
}
AppLayoutSettingsProvider.propTypes = {
    children: PropTypes.node
}
export default AppLayoutSettingsProvider