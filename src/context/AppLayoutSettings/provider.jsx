import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AppLayoutSettingsContext } from '.'

export function AppLayoutSettingsProvider({ children }) {
    const [ leftState, setLeftState ] = useState("collapse")
    const [ rightState, setRightState ] = useState("expand")
    const [ layoutChangedTrigger, setLayoutChangedTrigger ] = useState(false)
    const [ layoutWidth, setLayoutWidth ] = useState({})
    const [ settings, setSettings ] = useState({})
    // const { setIsLyricsRoute } = useLyrics()
    // console.log("first")
    const setWidth = useCallback((type, width) => {
      setLayoutWidth(prev => ({
        ...prev, [type]: width
      }))
  }, [])
    const applySettings = (settingFor, settingValue) => {
      if (!settingFor || isNaN(settingValue)) {
        return
      }
      setSettings(prevSettings => ({
        ...prevSettings, [settingFor]: settingValue, updateFor: settingFor
      }))
    }
    useEffect(() => {
      if (location.pathname == '/lyrics') {
        applySettings('lyrics', true)
        // setIsLyricsRoute(true)
      } else if (location.pathname == '/' && !settings.lyrics) {
        applySettings('lyrics', false)
        // console.log("first")

      } else {
        // none
        // console.log(location.pathname)
      }
    }, [settings.lyrics])

    useEffect(() => {
      switch (settings?.updateFor) {
        case 'queue':
          // console.log(settings[settings.updateFor])
          break
        case 'devices':
          // console.log(settings[settings.updateFor])
          break
        case 'miniPlayer':
          // console.log(settings[settings.updateFor])
          break
        default:
          // console.log("Opps developer fault!", settings.updateFor)
      }

      // console.log(settings)
    }, [settings])
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