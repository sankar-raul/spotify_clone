import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types'
import Footer from '../footer/foot'
import recentsTiles from "../../backend/recents_tile.json"
import songSections from '../../backend/songSection.json'
import './mainSection.css'
import StickyHeader from "../tiny_components/stickyHeader"
import { useMainHeaderTheme } from "../../context/MainHeaderTheme"
import useAppLayoutSettings from "../../context/AppLayoutSettings"
const MainSection = () => {
    const mainRef = useRef(null)
    const [ mainWidth, setMainWidth ] = useState(null)
    const { mainHeaderTheme } = useMainHeaderTheme()
    const { setWidth } = useAppLayoutSettings()
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setMainWidth(entry.contentRect.width)
        }
    })
    useEffect(() => {
        setWidth('main', mainWidth)
    }, [mainWidth])
    useEffect(() => {
        resizeObserver.observe(mainRef.current)
        return () => resizeObserver.disconnect()
    }, [])
    return (
        <>
        <div className="outer-main">
        <section ref={mainRef} className="mainSection" style={{'--shadow': mainHeaderTheme}}>
           
            <StickyHeader className='mainNavbarSticky' background={mainHeaderTheme}>
            <header className="main-nav">
                <div className="main-nav-btns">
                    <button name='active'>All</button>
                    <button>Music</button>
                    <button>Podcasts</button>
                </div>
            </header>
            </StickyHeader>
            <main className="home">
                <RecentsTiles />
                <BodyPart />
            </main>
            <footer className="footer">
                <Footer />
            </footer>
        </section>
        </div>
        </>
    )
}

const BodyPart = () => {
    useEffect(() => {
        // console.log(songSections)
    }, [])
    return (
        <>
        {
        songSections.map((section, idx) => (
            <ListSection songSection={section} key={idx}/>
        ))
        }
        </>
    )
}

const ListSection = ({songSection}) => {
    const [items, setItems] = useState(1)
    const mainSectionRef = useRef(null)
    const { layoutChangedTrigger } = useAppLayoutSettings()
    const handleItemsCount = (width) => {
        if (width > 239) {
            setItems(prev => prev + 1)
        } else if (width < 160) {
             setItems(prev => (prev - 2) == 0 ? 2 : prev - 1)
        }
    }
    const intialSize = () => {
        const min = mainSectionRef.current.offsetWidth / 160
        const max = mainSectionRef.current.offsetWidth / 200
        const avg = Math.round((min + max) / 2)
        setItems(avg <= 1 ? 2 : avg)
    }
    useEffect(() => {
        intialSize()
    }, [layoutChangedTrigger])
    useEffect(() => {
        intialSize()
    }, [])
    return (
        <div className="main-section" ref={mainSectionRef}>
            <div className="card-section-title">
                <div className="card-section-title-text">{songSection.title}</div>
                <div className="show-all">Show all</div>
            </div>
            <div className="song-cards" style={{gridTemplateColumns: `repeat(${items}, 1fr)`}} name={items}>
                {
                   items && songSection.song_tracks.map((song_info, idx) => (
                        idx < items && <Songcard key={idx} songInfo={song_info} handleItemsCount={handleItemsCount} intialSize={intialSize}/>
                    ))
                }
            </div>
        </div>
    )
}
ListSection.propTypes = {
    songSection: PropTypes.object.isRequired
}

const Songcard = ({handleItemsCount, intialSize, songInfo}) => {
    const songCardRef = useRef(null)
    const handleResizeSection = () => {
        handleItemsCount(songCardRef.current.offsetWidth)
    }
    useEffect(() => {
        if (handleItemsCount) {
            // alert()
            intialSize()
            window.addEventListener("resize", handleResizeSection)
            // console.log(songInfo)
            return () => {
                window.removeEventListener("resize", handleResizeSection)
            }
        }
    }, [])
    return (
        <div ref={handleItemsCount && songCardRef} className="song-card">
            <div className="song-card-thumb" style={{backgroundImage: `url(${songInfo.image})`}}>
                <div className="pbtn"></div>
            </div>
            <div className="song-card-caption">
                {songInfo.caption}
            </div>
        </div>
    )
}
Songcard.propTypes = {
    handleItemsCount: PropTypes.func.isRequired,
    intialSize: PropTypes.func.isRequired,
    songInfo: PropTypes.object.isRequired
}

const RecentsTiles = () => {
    const [columns, setColumns] = useState(0)
    const { layoutChangedTrigger } = useAppLayoutSettings()
    const recentTileRef = useRef(null)
    const updateLayout = () => {
        if (recentTileRef.current) {
            setColumns(recentTileRef.current.offsetWidth >= 848 ? 4 : 2)
        }
    }
    useEffect(() => {
        updateLayout()
    }, [layoutChangedTrigger])
    useEffect(() => {
        updateLayout()
        window.addEventListener('resize', updateLayout)
        return () => {
            window.removeEventListener('resize', updateLayout)
        }
    }, [])
    return (
        <div ref={recentTileRef} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}} className="recent-tiles">
            <RecentTiles />
        </div>
    )
}

const RecentTiles = () => {
    const { setMainHeaderTheme } = useMainHeaderTheme()
    let timeout = null
    const changeTheme = (color_theme) => {
        timeout && clearTimeout(timeout)
            setMainHeaderTheme(color_theme)
    }
    const handleMouseOut = () => {
        timeout = setTimeout(() => {
            setMainHeaderTheme(recentsTiles[0].color_theme)
        }, 100)
    }
    useEffect(() => {
        setMainHeaderTheme(recentsTiles[0]?.color_theme)
    }, [])
    return (
        <>
        {
        recentsTiles.map((tile, idx) => (
            <div name={tile.color_theme} onMouseOver={() => changeTheme(tile.color_theme)} onMouseOut={() => handleMouseOut(tile.color_theme)} className="tile" key={idx}>
                <div className="thumb" style={{backgroundImage: `url(${tile.thumb})`}}></div>
                <div className="title">
                    <div>{tile.title}</div>
                    <div className="pbtn"></div>
                </div>
            </div>
    ))
        }
        </>
    )
}

export default MainSection