import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import appIcon from './assets/react.svg'
import NavBar from './components/navBar/navBar'
import LeftSection from './components/leftSection/leftSection'
import RightSection from './components/rightSection/rightSection'
import MainSection from './components/mainSection/mainSection'
import BottomSection from './components/bottomSection/bottomSection'
import userAgent from './functions/userAgent'
import './App.css'
// let lstate, rstate, mw, rw
let layoutRefreshDelay = null, layoutRefreshInterval
function App() {
  const [ isExpanded, setisExpanded ] = useState(true)
  const [mainWidth, setmainwidth] = useState(0)
  const [leftWidth, setleftWidth] = useState(0)
  const [rightWidth, setrightWidth] = useState(0)
  const [ rootWidth, setRootWidth ] = useState(0)
  
  const mainMin = 417, leftMin = 280, rightMin= 280

  const [ maxWidthLeft, setmaxWidthLeft ] = useState(350)
  const [ minWidthLeft, setminWidthLeft ] = useState(leftMin)

  const [ leftState, setLeftState ] = useState("collapse")
  const [ rightState, setRightState ] = useState("expand")

  // const [ canAutoExpandLeft, setCanAutoExpandLeft ] = useState(false)
  // const [ canAutoExpandRight, setCanAutoExpandRight ] = useState(true)

  const [ layoutChanged, setLayoutChanged ] = useState(false)
  const [deviceType, setDeviceType] = useState("Desktop")
  const handleLayout = () => {
      // rearrangeUI()
      console.log("ok")
  }

  const rearrangeUI = () => {
    const currentMainPlusRightWidth = mainWidth + rightWidth
    const minMainPlusRightWidth = mainMin + rightWidth
    console.log(currentMainPlusRightWidth, minMainPlusRightWidth)
    if (currentMainPlusRightWidth - 1 < minMainPlusRightWidth) {
      if (leftState == "expand") {
        setLeftState('collapse')
        console.log("short")
      } else {
        if (rightState == 'expand') {
          setRightState('collapse')
        } else {
          // console.log(canAutoExpandRight)
          // canAutoExpandRight && setRightState('expand')
        }
      }
    } else {
      console.log("good", currentMainPlusRightWidth < minMainPlusRightWidth)
        if (rightState == 'collapse') {
          // canAutoExpandRight && setRightState('expand')
        }
    }
  }

  const handleLeftCollapse = () => {
    setLeftState(prevState => {
      const newState = prevState === "collapse" ? "expand" : "collapse"
      // setCanAutoExpandLeft(newState == "expand")
      return newState
    })
    console.log("clicked")
    // rearrangeUI()
  }
  // useEffect(() => {
  //   console.log(canAutoExpandLeft)
  // }, [canAutoExpandLeft])
  // useEffect(() => {
  //   console.log(canAutoExpandRight)
  // }, [canAutoExpandRight])
  const handleRightCollapse = () => {
    setRightState(prevState => {
      const newState = prevState === "collapse" ? "expand" : "collapse"
      return newState
    })
    // rearrangeUI()
  }
  
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
  useEffect(() => {
    console.log(deviceType)
}, [deviceType])
  useEffect(() => {
    setLayoutChanged(prev => prev === false)
  }, [leftState])
  useEffect(() => {
    setLayoutChanged(prev => prev === false)
    // setCanAutoExpandRight(rightState == "expand")
  }, [rightState])
  useEffect(() => {
    handleRootWidth()
    window.addEventListener("resize", handleRootWidth)
    return () => {
      window.removeEventListener('resize', handleRootWidth)
    }
  }, [])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
    console.log(rightWidth, "dfdkfk")
  }, [rightWidth])
  useEffect(() => {
    // console.log(rootWidth , "dfdfj")
    handleLayout()
  }, [rootWidth])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
    console.log(mainWidth)
  }, [mainWidth])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
  }, [leftWidth])

  return (
    <>
      <div className="main">
      <NavBar />
      <LeftSection handleWidth={handleWidth} handleLeftCollapse={handleLeftCollapse} state={leftState}/>
      <MainSection monitorResize={layoutChanged} handleWidth={handleWidth} />
      {/* {console.log(rightState)} */}
      <RightSection state={rightState} handleRightCollapse={handleRightCollapse} handleWidth={handleWidth} />
      <BottomSection handleRightCollapse={handleRightCollapse} />
      </div>
    </>
  )
}

export default App
