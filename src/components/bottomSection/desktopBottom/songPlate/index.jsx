import styles from './songPlate.module.css'
const Songplate = () => {

    return (
        <div className={styles.songplate}>
                <div></div>
                <div className={styles.songplate_details}>
                    <div>
                        <div><span>On the floor</span></div>
                        <div><span>Jennifer Lopez</span>, <span>Pitbull</span></div>
                    </div>
                    <div className={styles.heart_icon}></div>
                </div>
            </div>
    )
}

export default Songplate