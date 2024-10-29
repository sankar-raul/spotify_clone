import { Fragment } from 'react'
import PropTypes from 'prop-types'
import './songtag.css'
import useAppLayoutSettings from '../../context/AppLayoutSettings'

const Songtag = ({song}) => {
    const { leftState } = useAppLayoutSettings()
    const style = {
        backgroundImage: `url(${song.image})`,
        '--rad': song.captions[0] === "Artist" ? "50%" : "6px"
    }
    return (
        <div className="songTag" name={leftState} key={song.keY}>
            <div className="image" style={style}>
                <div className="play-btn-tag"></div>
            </div>
            <div className="song-details">
                <p className="playlist-title">{song.play_list_title}</p>
                <p className="caption">
                {
                    song.captions.map((cap, idx) => (
                        <Fragment key={idx}>
                       {cap}
                       {idx < song.captions.length - 1 && ' • '}
                       </Fragment>
                    ))
                }
                </p>
            </div>
        </div>
    )
}
Songtag.propTypes = {
    song: PropTypes.object.isRequired
}

export default Songtag