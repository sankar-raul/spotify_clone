import { Fragment, useEffect } from 'react'
import useVibes from '../../context/Vibes'
import styles from './rightSection.module.css'
import useCanvas from '../../context/canvas'

const SongDetails = () => {
    const {songData} = useVibes()
    const { isFullCanvas } = useCanvas()
    useEffect(() => {
        // console.log(isFullCanvas)
    }, [isFullCanvas])
    return (
        <div className={styles.song_details}>
            <div className={styles.song_thumb}>
                { songData && (<img style={{display: songData?.canvas ? "none" : "block"}} src={songData?.song_thumb} alt={songData?.title} /> )}
            </div>
            <div style={isFullCanvas ? {marginTop: "40%"} : {}} className={styles.song_info}>
                <div className={styles.song_title}>
                    <div><span>{songData?.title}</span></div>
                    <div className={styles.artists}>
                        {
                            songData?.artists.join(',#$').split('#$').map((artist, idx) => (
                                <Fragment key={idx}>
                                    <span>{artist}</span>&nbsp;
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.actions}>
                    <div title='Copy Song Link' className={styles.copy_btn}></div>
                    <div title='Add to Liked Songs' className={styles.add_song_btn}></div>
                </div>
            </div>
        </div>
    )
}
export default SongDetails