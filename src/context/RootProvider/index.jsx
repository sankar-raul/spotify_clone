import PropTypes from 'prop-types'
import MainHeaderThemeProvider from '../MainHeaderThemeProvider'
export const RootProvider = ({ children }) => {

    return (
        <>
            <MainHeaderThemeProvider>
                {children}
            </MainHeaderThemeProvider>
        </>
    )
}
RootProvider.propTypes = {
    children: PropTypes.node
}
export default RootProvider