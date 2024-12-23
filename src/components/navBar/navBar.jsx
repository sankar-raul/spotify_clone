import { useNavigate } from 'react-router-dom'
import './navBar.css'

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <section className="navBar">
            <div className="navPart spotify-button"></div>
            <div className="navPart search-nav">
                <div onClick={() => navigate('/')} className='home-btn'></div>
                <form className="search-section">
                    <div className="search-part">
                        <div className="sbtn"></div>
                        <input type="text" className="search" placeholder='What do you want to play?' />
                    </div>
                    <div className="browse"></div>
                </form>
            </div>
            <div className="navPart user-nav">
                <div className="install-btn">
                    Install App
                    </div>
                <div className="notification-btn"></div>
                <div className='user'></div>
            </div>
        </section>
    )
}
export default NavBar