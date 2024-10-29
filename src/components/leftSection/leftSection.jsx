import Songtag from '../songtag/songtag'
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './leftSection.css'
import playList from '../../backend/playlist_items.json'
import useAppLayoutSettings from '../../context/AppLayoutSettings'
const LeftSection = ({handleWidth}) => {
    const leftRef = useRef(null)
    const {leftState, setLeftState} = useAppLayoutSettings()
    const buttonRef = useRef(null)
    const handleCollapse = () => {
        setLeftState(prevState => {
            const newState = prevState === "collapse" ? "expand" : "collapse"
            return newState
          })
    }
    const handleEvent = () => {
        handleWidth('left', leftRef.current.offsetWidth)
    }
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
        <section ref={leftRef} name={leftState} className="leftSection">
            <div className="top-portion">
                <header>
                <div className="top-portion-nav">
                    <div ref={buttonRef} className='library'>
                    <div className="expand-btn"></div>
                        {
                            leftState != "collapse" ? (
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
            <div name={leftState} className="playlists">
                <div className="playlist-nav">
                    <div className="playlist-search"></div>
                    <div className="recents">
                    <div>Recents</div>
                        <div className='recent-icon'></div>
                        </div>
                </div>
                <div className="playlist-items">
                    <PlayLists />
                </div>
            </div>
        </section>
    )
}
LeftSection.propTypes = {
    handleWidth: PropTypes.func.isRequired
}

const PlayLists = () => {
    return (
    <>
    {
    playList.map((songObject, idx) => (
        <Songtag song={songObject} key={idx}/>
    ))
    }
    </>
    )
}

export default LeftSection