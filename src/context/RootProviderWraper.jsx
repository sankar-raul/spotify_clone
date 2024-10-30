import PropTypes from 'prop-types'
import MainHeaderThemeProvider from './MainHeaderTheme/provider'
import AppLayoutSettingsProvider from './AppLayoutSettings/provider'
import VibesProvider from './Vibes/provider'
import GlobalProvider from './Global/provider'
export const RootProviderWrapper = ({ children }) => {

    return (
        <GlobalProvider>
        <VibesProvider>
        <AppLayoutSettingsProvider>
            <MainHeaderThemeProvider>
                {children}
            </MainHeaderThemeProvider>
        </AppLayoutSettingsProvider>
        </VibesProvider>
        </GlobalProvider>
    )
}
RootProviderWrapper.propTypes = {
    children: PropTypes.node
}
export default RootProviderWrapper