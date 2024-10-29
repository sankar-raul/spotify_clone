import { useState, useEffect } from 'react'
import NavBar from './components/navBar/navBar'
import LeftSection from './components/leftSection/leftSection'
import RightSection from './components/rightSection/rightSection'
import MainSection from './components/mainSection/mainSection'
import BottomSection from './components/bottomSection/bottomSection'
import userAgent from './functions/userAgent'
import './App.css'

function App() {

  const [ isExpanded, setisExpanded ] = useState(true)
  const [mainWidth, setmainwidth] = useState(0)
  const [leftWidth, setleftWidth] = useState(0)
  const [rightWidth, setrightWidth] = useState(0)
  const [ rootWidth, setRootWidth ] = useState(0)
  
  const mainMin = 417, leftMin = 280, rightMin= 280

  const [ maxWidthLeft, setmaxWidthLeft ] = useState(350)
  const [ minWidthLeft, setminWidthLeft ] = useState(leftMin)

  // const [ canAutoExpandLeft, setCanAutoExpandLeft ] = useState(false)
  // const [ canAutoExpandRight, setCanAutoExpandRight ] = useState(true)

  const [deviceType, setDeviceType] = useState(null)
  const [songInfo, setSongInfo] = useState(null)
  
  const handleWidth = (type, width) => {
      if (type == 'main') {
        setmainwidth(width)
      } else if (type == 'left') {
        setleftWidth(width)
      } else if (type == 'right') {
        setrightWidth(width)
      } else {
        console.log("LoL")
      }
  }
  const handleRootWidth = () => {
    setDeviceType(userAgent())
    setRootWidth(document.body.offsetWidth)
  }
  const updateSongInfo = (songData) => {
      songData && setSongInfo(songData)
  }
  useEffect(() => {
    deviceType && console.log(deviceType)
  }, [deviceType])
  useEffect(() => {
    handleRootWidth()
    window.addEventListener("resize", handleRootWidth)
    return () => {
      window.removeEventListener('resize', handleRootWidth)
    }
  }, [])

  return (
    <>
      <div className="main">
      <NavBar />
      <LeftSection handleWidth={handleWidth} />
      <MainSection handleWidth={handleWidth} />
      <RightSection songData={songInfo} handleWidth={handleWidth} />
      {deviceType != null && <BottomSection updateSongInfo={(data) => updateSongInfo(data)} deviceType={deviceType} /> }
      </div>
    </>
  )
}

export default App
