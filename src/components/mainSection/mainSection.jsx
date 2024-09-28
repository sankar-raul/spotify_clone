import { useEffect, useRef, useState } from "react"
import recentsTiles from "../../backend/recents_tile.json"
import songSections from '../../backend/songSection.json'
import './mainSection.css'
const MainSection = ({handleWidth}) => {
    const [shadow, setShadow] = useState('#501df2')
    const mainRef = useRef(null)
    const handleColorTheme = (color) => {
        setShadow(color)
    }
    const handleEvent = () => {
        handleWidth('main', mainRef.current.offsetWidth)
    }
    useEffect(() => {
            // alert()
            handleEvent()
            window.addEventListener("resize", handleEvent)
            return () => {
                window.removeEventListener("resize", handleEvent)
            }
    }, [])
    return (
        <>
        <section ref={mainRef} className="mainSection" style={{'--shadow': shadow}}>
            <header className="main-nav">
                <div className="main-nav-btns">
                    <button name='active'>All</button>
                    <button>Music</button>
                    <button>Podcasts</button>
                </div>
            </header>
            <main className="home">
                <RecentsTiles handleThemeChange={handleColorTheme} />
                <BodyPart />
            </main>
            <footer className="footer">
                footer
            </footer>
        </section>
        </>
    )
}
const BodyPart = () => {
    useEffect(() => {
        console.log(songSections)
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
    const handleItemsCount = (width) => {
        if (width > 239) {
            setItems(prev => prev + 1)
        } else if (width < 160) {
             setItems(prev => (prev - 2) == 0 ? 2 : prev - 1)
        }
    }
    const intialSize = (width) => {
        const min = mainSectionRef.current.offsetWidth / 160
        const max = mainSectionRef.current.offsetWidth / 200
        const avg = Math.round((min + max) / 2)
        setItems(avg <= 1 ? 2 : avg)
    }
    useEffect(() => {
        intialSize()
    }, [])
    return (
        <div className="main-section" ref={mainSectionRef}>
            <div className="card-section-title">
                <div className="card-section-title-text">Made For Sankar</div>
                <div className="show-all">Show all</div>
            </div>
            <div className="song-cards" name={items}>
                {
                   items && songSection.song_tracks.map((song_info, idx) => (
                        idx < items && <Songcard key={idx} handleItemsCount={handleItemsCount} intialSize={intialSize}/>
                    ))
                }
            </div>
        </div>
    )
}
const Songcard = ({handleItemsCount, intialSize}) => {
    const songCardRef = useRef(null)
    const handleResizeSection = () => {
        handleItemsCount(songCardRef.current.offsetWidth)
    }
    useEffect(() => {
        if (handleItemsCount) {
            // alert()
            intialSize()
            window.addEventListener("resize", handleResizeSection)
            return () => {
                window.removeEventListener("resize", handleResizeSection)
            }
        }
    }, [])
    return (
        <div ref={handleItemsCount && songCardRef} className="song-card">
            <div className="song-card-thumb">
                <div className="pbtn"></div>
            </div>
            <div className="song-card-caption">
                Catch all the latest music from artists you follow, plus new singles picked for you. Updates every Friday.
            </div>
        </div>
    )
}
const RecentsTiles = ({ handleThemeChange }) => {
    const [columns, setColumns] = useState(0)
    const recentTileRef = useRef(null)
    const updateLayout = () => {
        if (recentTileRef.current) {
            setColumns(recentTileRef.current.offsetWidth >= 848 ? 4 : 2)
        }
    }
    useEffect(() => {
        updateLayout()
        window.addEventListener('resize', updateLayout)
        return () => {
            window.removeEventListener('resize', updateLayout)
        }
    }, [])
    return (
        <div ref={recentTileRef} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}} className="recent-tiles">
            <ResentTiles handleColorTheme={handleThemeChange}/>
        </div>
    )
}
const ResentTiles = ({ handleColorTheme }) => {
    let o = null
    const changeTheme = (ref) => {
        if (!o) {
            handleColorTheme(ref)
            o = true
        }
    }
    const handleMouseOut = () => {
        o = false
    }
    useEffect(() => {
        o = false
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