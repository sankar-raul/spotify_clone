import { useEffect, useRef, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './rightSection.module.css'
import SecondaryButton from '../tiny_components/secondaryButton'
import artist_details from '../../backend/artists.json'
import { Vibe } from '../../functions/songPlayer/AudioController'
import StickyHeader from '../tiny_components/stickyHeader'
import { useAppLayoutSettings } from '../../context/AppLayoutSettings'
import useVibes from '../../context/Vibes'

const RightSection = () => {
    const rightRef = useRef(null)
    const { songData } = useVibes()
    const [ rightWidth, setRightWidth ] = useState(null)
    const { rightState, setRightState } = useAppLayoutSettings()
    const [ display, setDisplay ] = useState('block')
    const { setWidth } = useAppLayoutSettings()
    const handleCollapse = () => {
        setRightState(prevState => prevState === "collapse" ? "expand" : "collapse")
    }
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setRightWidth(entry.contentRect.width)
        }
    })
    useEffect(() => {
        setWidth('right', rightWidth)
    }, [rightWidth])
    useEffect(() => {
        setDisplay(rightState == 'expand' ? "block" : "none")
    }, [rightState])
    useEffect(() => {
        resizeObserver.observe(rightRef.current)
        return () => resizeObserver.disconnect()
    }, [])
    return (
        <section style={{display: display}} ref={rightRef} className={styles.rightSection}>
            <StickyHeader>
            <div className={styles.heading}>
                <div className={styles.song_heading}><p>{songData?.title}</p></div>
                <div className={styles.navigator}>
                    <div className={styles.threeDots}>
                </div>
                <div className={styles.closeBtn} onClick={handleCollapse}></div>
                </div>
            </div>
            </StickyHeader>
            <div className={styles['child-container']}>
            
            <div className={styles.main}>
                <SongBody songData={songData}/>
            </div>
           </div>
           { songData?.canvas && (<div className={styles.canvasContainer}>
              <video className={styles.canvas} src={songData?.canvas} autoPlay loop muted>
              </video>
           </div>)
}
           
        </section>
    )
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
                <div className={styles.song_thumb}>
                    { songData && (<img style={{display: songData?.canvas ? "none" : "block"}} src={songData?.song_thumb} alt={songData?.title} /> )}
                </div>
                <div className={styles.song_info}>
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
          
            <div className={styles.about_artist}>
                <div className={mainArtistInfo && mainArtistInfo.type == 'circle' ? styles.circle_artist : ""} style={mainArtistInfo && mainArtistInfo.type == 'circle' ? {background: "none"} : mainArtistInfo && {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url(${mainArtistInfo.cover})`}}>
                    <p>About the artist</p>
                    {mainArtistInfo && mainArtistInfo.type == 'circle' && (<img className={styles.circle_artist_cover} src={mainArtistInfo.cover}/>)}
                </div>
                <div className={styles.artist_info}>
                    <div className={styles.artist_name}><p>{songData?.artists[0]}</p></div>
                    <div className={styles.follow_section}>
                        <div>
                        {mainArtistInfo && mainArtistInfo.listeners} monthly listeners
                        </div>
                        <SecondaryButton />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: mainArtistInfo?.description }} className={styles.artist_description}></div>
                </div>
            </div>
            <div className={styles.credits}>
                <div className={styles.credit_title}>
                    <div>Credits</div>
                    <div>Show all</div>
                </div>
                {
                    songData?.credits.map((artistInfo, idx) => (
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
                    <div onClick={() => Vibe.next()} style={songData && {backgroundImage: `url(${songData.queue.song_thumb})`}}>
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
        </>
    )
}
SongBody.propTypes = {
    songData: PropTypes.object
}

export default RightSection