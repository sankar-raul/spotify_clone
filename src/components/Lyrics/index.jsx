import useLyrics from "../../context/Lyrics"
import styles from './lyrics.module.css'
export const Lyrics = () => {
    const {lyrics} = useLyrics()
    return (
        <div className={styles["lyrics-bar"]}>
            <div className={styles["lyrics-wraper"]}>
            {lyrics?.map((data, idx) => {
                return <p key={idx} name={data?.seconds}>{data?.lyrics}</p>
            })}
            </div>
        </div>
    )
}
export default Lyrics