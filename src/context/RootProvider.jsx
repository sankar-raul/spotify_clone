import PropTypes from 'prop-types'
import MainHeaderThemeProvider from './MainHeaderTheme/provider'
import AppLayoutSettingsProvider from './AppLayoutSettings/provider'
export const RootProvider = ({ children }) => {

    return (
        <>
        <AppLayoutSettingsProvider>
            <MainHeaderThemeProvider>
                {children}
            </MainHeaderThemeProvider>
        </AppLayoutSettingsProvider>
        </>
    )
}
RootProvider.propTypes = {
    children: PropTypes.node
}
export default RootProvider