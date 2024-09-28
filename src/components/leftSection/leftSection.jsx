import Songtag from '../songtag/songtag'
import { useEffect, useRef, useState } from 'react'
import './leftSection.css'
import playList from '../../backend/playlist_items.json'
const LeftSection = ({handleWidth, state, handleLeftCollapse}) => {
    const leftRef = useRef(null)
    const buttonRef = useRef(null)
    const [ currentState, setCState ] = useState(0)
    const handleCollapse = () => {
       setCState(prev => prev + 1)
       handleLeftCollapse()
    }
    const handleEvent = () => {
        handleWidth('left', leftRef.current.offsetWidth)
    }
    useEffect(() => {
        console.log(state)
            // alert()
            handleEvent()
            buttonRef.current.addEventListener("click", handleCollapse)
            window.addEventListener("resize", handleEvent)
            return () => {
                buttonRef.current.removeEventListener("click", handleCollapse)
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <section ref={leftRef} name={state} className="leftSection">
            <div className="top-portion">
                <header>
                <div className="top-portion-nav">
                    <div ref={buttonRef} className='library'>
                        {
                            state != "collapse" ? ("Your Library") : 'i'
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
export default LeftSection