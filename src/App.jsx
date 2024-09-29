import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import appIcon from './assets/react.svg'
import NavBar from './components/navBar/navBar'
import LeftSection from './components/leftSection/leftSection'
import RightSection from './components/rightSection/rightSection'
import MainSection from './components/mainSection/mainSection'
import BottomSection from './components/bottomSection/bottomSection'
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
  const [ leftState, setLeftState ] = useState("collapse")

  const handleLayout = () => {

  }
  const handleLeftCollapse = () => {
    setLeftState(prevState => {
      const newState = prevState === "collapse" ? "expand" : "collapse"
      return newState
    })
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
    setRootWidth(document.body.offsetWidth)
  }
  useEffect(() => {
    // console.log(leftState)
  }, [leftState])
  useEffect(() => {
    handleRootWidth()
    window.addEventListener("resize", handleRootWidth)
    return () => {
      window.removeEventListener('resize', handleRootWidth)
    }
  }, [])
  useEffect(() => {
    // console.log(rootWidth , "dfdfj")
    handleLayout()
  }, [rootWidth])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
  }, [mainWidth])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
  }, [leftWidth])
  useEffect(() => {
    // console.log(mainWidth, leftWidth, rightWidth)
  }, [rightWidth])
  return (
    <>
      <div className="main">
      <NavBar />
      <LeftSection handleWidth={handleWidth} handleLeftCollapse={handleLeftCollapse} state={leftState}/>
      <MainSection monitorResize={leftState} handleWidth={handleWidth} />
      <RightSection handleWidth={handleWidth} />
      <BottomSection />
      </div>
    </>
  )
}

export default App
