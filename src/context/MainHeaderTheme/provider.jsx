import { useState } from "react"
import PropTypes from 'prop-types'
import { headerContext } from '.'
export const MainHeaderThemeProvider = ({children}) => {
    const [mainHeaderTheme, setMainHeaderTheme] = useState(null)

    return (
        <headerContext.Provider value={{mainHeaderTheme, setMainHeaderTheme}}>
            {children}
        </headerContext.Provider>
    )
}
MainHeaderThemeProvider.propTypes = {
    children: PropTypes.node
}
export default MainHeaderThemeProvider