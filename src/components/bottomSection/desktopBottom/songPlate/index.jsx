import { Fragment } from 'react'
import styles from './songPlate.module.css'
import useVibes from '../../../../context/Vibes'

const Songplate = () => {
    const { songData } = useVibes()
    return (
        <div className={styles.songplate}>
                <div style={songData && {backgroundImage: `url(${songData.song_thumb})`}}></div>
                <div className={styles.songplate_details}>
                    <div>
                        <div><span>{songData?.title}</span></div>
                        <div>
                            {
                                songData?.artists.join(',#$').split('#$').map((artist, idx) => (
                                    <Fragment key={idx}>
                                        <span>{artist}</span>&nbsp;
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.heart_icon}></div>
                </div>
            </div>
    )
}

export default Songplate