import Songtag from '../songtag/songtag'
import { useEffect, useRef, useState } from 'react'
import './leftSection.css'
import playList from '../../backend/playlist_items.json'
import useAppLayoutSettings from '../../context/AppLayoutSettings'
const LeftSection = () => {
    const {setWidth} = useAppLayoutSettings()
    const leftRef = useRef(null)
    const [leftWidth, setLeftWidth] = useState(null)
    const {leftState, setLeftState} = useAppLayoutSettings()
    const handleCollapse = () => {
        setLeftState(prevState => {
            const newState = prevState === "collapse" ? "expand" : "collapse"
            return newState
          })
    }
    const handleEvent = () => {
        setLeftWidth(leftRef.current.offsetWidth)
    }
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setLeftWidth(entry.contentRect.width)
        }
    })
    useEffect(() => {
        setWidth('left', leftRef.current.offsetWidth)
    }, [leftWidth])
    useEffect(() => {
            handleEvent()
            resizeObserver.observe(leftRef.current)
            return () => {
                resizeObserver.disconnect()
            }
    }, [])
    return (
        <section ref={leftRef} name={leftState} className="leftSection">
            <div className="top-portion">
                <header>
                <div className="top-portion-nav">
                    <div onClick={handleCollapse} className='library'>
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