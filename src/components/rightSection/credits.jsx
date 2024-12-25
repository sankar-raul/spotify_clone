import { Fragment } from 'react'
import useVibes from '../../context/Vibes'
import styles from './rightSection.module.css'
import SecondaryButton from '../tiny_components/secondaryButton'

const Credits = () => {
    const { songData } = useVibes()

    return (
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
    )
}
export default Credits