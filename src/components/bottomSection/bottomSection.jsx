import DesktopBottom from './desktopBottom'
import styles from './bottomSection.module.css'
import useGlobal from '../../context/Global'

const BottomSection = () => {
    const { deviceType } = useGlobal()
    return (
    <>
        {
            deviceType == 'desktop' ? (
                <DesktopBottom className={styles.bottomSection} />
            ) : (
                <DesktopBottom className={styles.bottomSection} />
            )
        }
    </>
    )
}

export default BottomSection