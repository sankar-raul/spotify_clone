import { useEffect, useState } from 'react'
import styles from './rightSection.module.css'
import useVibes from '../../context/Vibes'
import artist_details from '../../backend/artists.json'
import SecondaryButton from '../tiny_components/secondaryButton'

const AboutArtist = () => {
    const [mainArtistInfo, setMainArtistInfo] = useState(null)
    const { songData } = useVibes()
    useEffect(() => {
        // console.log(mainArtistInfo)
    }, [mainArtistInfo])
    useEffect(() => {
        songData && setMainArtistInfo(artist_details[songData.artists[0]])
    }, [songData])
    return (
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
    )
}
export default AboutArtist