import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () =>{
    const navigate = useNavigate()
    const onClickLogout = () =>{
        Cookies.remove('jwt_token')
        navigate('/login',{replace:true})
    }
    return(
        <nav className="nav-container">
            <div className="header-content">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" 
                alt="website logo" className="website-logo"/>
            </div>
            <div className="profile-container">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                     alt="profile" className="profile-icon"/>
                <button className="logout-button" type="button" onClick={onClickLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Header