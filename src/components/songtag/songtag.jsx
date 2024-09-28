import { Fragment } from 'react'
import './songtag.css'

const Songtag = ({song, state}) => {
    const style = {
        backgroundImage: `url(${song.image})`,
        borderRadius: song.captions[0] === "Artist" ? "50%" : "6px"
    }
    return (
        <div className="songTag" name={state} key={song.keY}>
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
export default Songtag