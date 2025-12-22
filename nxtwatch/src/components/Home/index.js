import Header from '../Header'
import './index.css'

const Home = () =>{
    return(
        <>
            <Header/>
            <div className="home-layout-container">
                <div className="sidebar-home-container">
                    <div className="home-content">
                        <ul className="home-order-list">
                            <li className="home-list-item">Home</li>
                            <li className="home-list-item">Trending</li>
                            <li className="home-list-item">Gaming</li>
                            <li className="home-list-item">Saved Videos</li>
                        </ul>
                    </div>
                    <div className="contact-container">
                        <h1 className="contact-us-heading">Contact Us</h1>
                        <div className="social-icons-container">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" 
                            alt="facebook logo" className="social-logo"/>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" 
                            alt="twitter logo" className="social-logo"/>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" 
                            alt="linked in logo" className="social-logo"/>
                        </div>
                        <p className="contact-description">
                            Enjoy! Now to see your channels and recommendations!
                        </p>
                    </div>
                </div>
                <div className="main-content">
                    <div className="home-logo-container">
                        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" 
                        alt="nxt watch logo" className="home-logo"/>
                        <h1 className="heading">Buy Nxtwatch Premium plan with UPI</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home