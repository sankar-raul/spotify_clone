import NavBar from './components/navBar/navBar'
import LeftSection from './components/leftSection/leftSection'
import RightSection from './components/rightSection/rightSection'
import MainSection from './components/mainSection/mainSection'
import BottomSection from './components/bottomSection/bottomSection'

import './App.css'

function App() {
  // const mainMin = 417, leftMin = 280, rightMin= 280 

  return (
    <>
      <div className="main">
      <NavBar />
      <LeftSection />
      <MainSection />
      <RightSection />
      <BottomSection />
      </div>
    </>
  )
}

export default App
