import { Fragment, memo } from 'react'
import styles from './rightSection.module.css'
import useVibes from '../../context/Vibes'

const Queue = () => {
    const { songData, nextSong } = useVibes()
    // console.log("queue")
    return (
        <div className={styles.next_queue}>
            <div className={styles.queue_title}>
                <span>Next in queue</span>
                <span>Open queue</span>
            </div>
            <div className={styles.queue_next}>
                <div onClick={() => nextSong()} style={songData && {backgroundImage: `url(${songData.queue.song_thumb})`}}>
                    <div className={styles.queue_btn}></div>
                </div>
                <div>
                    <span>{songData?.queue.title}</span>
                    <span>
                    {
                        songData?.queue.artists.join(',#$').split('#$').map((type, idx) => (
                            <Fragment key={idx}>
                                <span>{type}</span>&nbsp;
                            </Fragment>
                        ))
                    }
                    </span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
export default memo(Queue)