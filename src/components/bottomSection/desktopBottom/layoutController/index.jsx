import styles from './layoutController.module.css'
import PropTypes from 'prop-types'
const LayoutController = ({handleRightCollapse}) => {
    return (
        <div className={styles.navigators}>
                <div onClick={handleRightCollapse} className={styles.dot}>
                    <div className={styles.icon}></div>
                </div>
                <div className={styles.dot}>
                    <div className={styles.icon}></div>
                </div>
                <div className={styles.dot}>
                    <div className={styles.icon}></div>
                </div>
                <div className={styles.dot}>
                    <div className={styles.icon}></div>
                </div>
                <div className={styles.sound}></div>
                <div className={styles.dot}>
                    <div className={styles.icon}></div>
                </div>
                <div className={styles.fullScreen}></div>
        </div>
    )
}
LayoutController.propTypes = {
    handleRightCollapse: PropTypes.func.isRequired
}

export default LayoutController

