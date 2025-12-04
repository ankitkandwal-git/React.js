import {useNavigate,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () =>{
     const navigate = useNavigate();
    const onClickLogout  = () =>{
        Cookies.remove('jwt_token')
         navigate('/login', {replace: true})
    }
    return(
        <nav className="header-container">
            <div className="logo-container">
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" 
                 className='website-logo' alt="website logo" />
            </div>
            <div className='nav-links-container'>
                <ul className='nav-links-list'>
                    <li className="nav-link-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-link-item">
                        <Link to="/jobs" className="nav-link">Jobs</Link>
                    </li>
                </ul>
            </div>
            <div className="logout-button-container">
                <button className="logout-button" type="button" onClick={onClickLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Header