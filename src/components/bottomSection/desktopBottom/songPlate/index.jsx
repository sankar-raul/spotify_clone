import { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './songPlate.module.css'

const Songplate = ({songData}) => {

    return (
        <div className={styles.songplate}>
                <div style={songData && {backgroundImage: `url(${songData.song_thumb})`}}></div>
                <div className={styles.songplate_details}>
                    <div>
                        <div><span>{songData && songData.title}</span></div>
                        <div>
                            {
                                songData && songData.artists.join(',#$').split('#$').map((artist, idx) => (
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

Songplate.propTypes = {
    songData: PropTypes.object
}
export default Songplate