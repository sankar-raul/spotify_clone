import { createContext, useContext, useState } from "react"
import PropTypes from 'prop-types'

const HeaderContext = createContext()
export const MainHeaderThemeProvider = ({children}) => {
    const [mainHeaderTheme, setMainHeaderTheme] = useState(null)

    return (
        <HeaderContext.Provider value={{mainHeaderTheme, setMainHeaderTheme}}>
            {children}
        </HeaderContext.Provider>
    )
}
MainHeaderThemeProvider.propTypes = {
    children: PropTypes.node
}
export const useMainHeaderTheme = () => useContext(HeaderContext)
export default MainHeaderThemeProvider