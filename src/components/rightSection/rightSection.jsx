import { useEffect, useRef, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './rightSection.module.css'
import SecondaryButton from '../tiny_components/secondaryButton'
import artist_details from '../../backend/artists.json'
const RightSection = ({ state, handleWidth, handleRightCollapse, songData }) => {
    const rightRef = useRef(null)
    const buttonRef = useRef(null)
    const [ display, setDisplay ] = useState('grid')
    const handleCollapse = () => {
        handleRightCollapse()
    }
    const handleEvent = () => {
        handleWidth('right', rightRef.current.offsetWidth)
    }
    useEffect(() => {
        if (state == 'expand') {
            setDisplay("grid")
        } else {
            setDisplay('none')
        }
    }, [state])
    useEffect(() => {
            handleEvent()
            const buttonRefCopy = buttonRef.current
            buttonRefCopy.addEventListener("click", handleCollapse)
            window.addEventListener("resize", handleEvent)
            return () => {
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section style={{display: display}} ref={rightRef} className={styles.rightSection}>
            <div className={styles.heading}>
                <div className={styles.song_heading}><p>{songData && songData.title}</p></div>
                <div className={styles.navigator}>
                    <div className={styles.threeDots}>
                </div>
                <div className={styles.closeBtn} ref={buttonRef}></div>
                </div>
            </div>
            <div className={styles.main}>
                <SongBody songData={songData}/>
            </div>
        </section>
    )
}
RightSection.propTypes = {
    handleWidth: PropTypes.func.isRequired,
    handleRightCollapse: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
    songData: PropTypes.object
}

const SongBody = ({songData}) => {
    // console.log(songData)
    const [mainArtistInfo, setMainArtistInfo] = useState(null)
    useEffect(() => {
        // console.log(mainArtistInfo)
    }, [mainArtistInfo])
    useEffect(() => {
        songData && setMainArtistInfo(artist_details[songData.artists[0]])
    }, [songData])
    return (
        <>
            <div className={styles.song_details}>
                <div style={songData && {backgroundImage: `url(${songData.song_thumb})`}} className={styles.song_thumb}></div>
                <div className={styles.song_info}>
                    <div className={styles.song_title}>
                        <div><span>{songData && songData.title}</span></div>
                        <div className={styles.artists}>
                            {
                                songData && songData.artists.join(',#$').split('#$').map((artist, idx) => (
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
            <div className={styles.about_artist}>
                <div className={mainArtistInfo && mainArtistInfo.type == 'circle' ? styles.circle_artist : ""} style={mainArtistInfo && mainArtistInfo.type == 'circle' ? {background: "none"} : mainArtistInfo && {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url(${mainArtistInfo.cover})`}}>
                    <p>About the artist</p>
                    {mainArtistInfo && mainArtistInfo.type == 'circle' && (<img className={styles.circle_artist_cover} src={mainArtistInfo.cover}/>)}
                </div>
                <div className={styles.artist_info}>
                    <div className={styles.artist_name}><p>{songData && songData.artists[0]}</p></div>
                    <div className={styles.follow_section}>
                        <div>
                        {mainArtistInfo && mainArtistInfo.listeners} monthly listeners
                        </div>
                        <SecondaryButton />
                    </div>
                    <div className={styles.artist_description}>
                        {mainArtistInfo && mainArtistInfo.description}
                    </div>
                </div>
            </div>
            <div className={styles.credits}>
                <div className={styles.credit_title}>
                    <div>Credits</div>
                    <div>Show all</div>
                </div>
                {
                    songData && songData.credits.map((artistInfo, idx) => (
                        <div key={idx}>
                            <div>
                                <div>{<span name={artistInfo.artistId ? '': "nonArtist"}>{artistInfo.artist}</span>}</div>
                                <div>
                                    {
                                        artistInfo.credit.join(',#$').split('#$').map((type, idx) => (
                                            <Fragment key={idx}>
                                                <span>{type}</span>&nbsp;
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                            {artistInfo.artistId && <SecondaryButton /> }
                        </div>
                    ))
                }
            </div>
            <div className={styles.next_queue}>
                <div className={styles.queue_title}>
                    <span>Next in queue</span>
                    <span>Open queue</span>
                </div>
                <div className={styles.queue_next}>
                    <div onClick={() => songData && songData.nextSong()} style={songData && {backgroundImage: `url(${songData.queue.song_thumb})`}}>
                        <div className={styles.queue_btn}></div>
                    </div>
                    <div>
                        <span>{songData && songData.queue.title}</span>
                        <span>
                        {
                            songData && songData.queue.artists.join(',#$').split('#$').map((type, idx) => (
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
        </>
    )
}
SongBody.propTypes = {
    songData: PropTypes.object
}

export default RightSection