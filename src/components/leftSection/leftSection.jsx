import Songtag from '../songtag/songtag'
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './leftSection.css'
import playList from '../../backend/playlist_items.json'
const LeftSection = ({handleWidth, state, handleLeftCollapse}) => {
    const leftRef = useRef(null)
    const buttonRef = useRef(null)
    const [ currentState, setCState ] = useState("collapse")
    const handleCollapse = () => {
       setCState(prev => prev == 'collapse' ? 'expand' : 'collapse')
    }
    const handleEvent = () => {
        handleWidth('left', leftRef.current.offsetWidth)
    }
    useEffect(() => {
        if (currentState != state) {
            handleLeftCollapse(currentState)
        }
    }, [currentState])
    useEffect(() => {
        if (currentState != state) {
            setCState(state)
        }
    }, [state])
    useEffect(() => {
            // alert()
            handleEvent()
            const buttonRefCopy = buttonRef.current
            buttonRefCopy.addEventListener("click", handleCollapse)
            window.addEventListener("resize", handleEvent)
            return () => {
                buttonRefCopy.removeEventListener("click", handleCollapse)
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section ref={leftRef} name={state} className="leftSection">
            <div className="top-portion">
                <header>
                <div className="top-portion-nav">
                    <div ref={buttonRef} className='library'>
                    <div className="expand-btn"></div>
                        {
                            state != "collapse" ? (
                                <p className="lib">Your Library</p>
                            ) : (
                                <></>
                            )
                        }
                        </div>
                    <div className='plus-more-btns'>
                    <div className='plus-btn'></div>
                    <div className="show-more"></div>
                    </div>
                </div>
                </header>
                <div className="portion-btns">
                        <button className="portion-btn">Playlists</button>
                        <button className="portion-btn">Artists</button>
                </div>
            </div>
            <div name={state} className="playlists">
                <div className="playlist-nav">
                    <div className="playlist-search"></div>
                    <div className="recents">
                    <div>Recents</div>
                        <div className='recent-icon'></div>
                        </div>
                </div>
                <div className="playlist-items">
                    <PlayLists state={state} />
                </div>
            </div>
        </section>
    )
}
LeftSection.propTypes = {
    handleWidth: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
    handleLeftCollapse: PropTypes.func.isRequired
}

const PlayLists = ({state}) => {
    return (
    <>
    {
    playList.map((songObject, idx) => (
        <Songtag state={state} song={songObject} key={idx}/>
    ))
    }
    </>
    )
}
PlayLists.propTypes = {
    state: PropTypes.string.isRequired
}

export default LeftSection