import PropTypes from 'prop-types'
import MainHeaderThemeProvider from './MainHeaderTheme/provider'
import AppLayoutSettingsProvider from './AppLayoutSettings/provider'
import VibesProvider from './Vibes/provider'
import GlobalProvider from './Global/provider'
import LyricsProvider from './Lyrics/provider'
export const RootProviderWrapper = ({ children }) => {

    return (
        <GlobalProvider>
        <VibesProvider>
        <LyricsProvider>
        <AppLayoutSettingsProvider>
            <MainHeaderThemeProvider>
                {children}
            </MainHeaderThemeProvider>
        </AppLayoutSettingsProvider>
        </LyricsProvider>
        </VibesProvider>
        </GlobalProvider>
    )
}
RootProviderWrapper.propTypes = {
    children: PropTypes.node
}
export default RootProviderWrapper