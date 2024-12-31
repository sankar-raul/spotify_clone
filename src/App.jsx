import NavBar from './components/navBar/navBar'
import LeftSection from './components/leftSection/leftSection'
import RightSection from './components/rightSection/rightSection'
import MainSection from './components/mainSection/mainSection'
import BottomSection from './components/bottomSection/bottomSection'

import './App.css'
import CanvasProvider from './context/canvas/canvasProvider'

function App() {
  
  return (
    <>
      <div className="main">
      <NavBar />
      <LeftSection />
      <MainSection />
      <CanvasProvider>
        <RightSection />
      </CanvasProvider>
      <BottomSection />
      </div>
    </>
  )
}

export default App
