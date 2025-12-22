import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import './index.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)
    const navigate = useNavigate()
    const onChangeUser = event => {
        setUsername(event.target.value)
    }
    const onChangePassword = event =>{
        setPassword(event.target.value)
    }
    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token',jwtToken,{expires:30})
        navigate('/')

    }
    const onSubmitFailure = errorMsg => {
        setShowSubmitError(true)
        setErrorMsg(errorMsg)

    }
    const onSubmitForm = async event => {
        event.preventDefault();
        const userDetails = {username,password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok === true){
            onSubmitSuccess(data.jwt_token)
        }else{
            onSubmitFailure(data.error_msg)
        }
    }
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken !== undefined){
        navigate('/')
        return <navigate to ='/' />
    }
    return(
        <div className="login-page-container">
            <div className="login-form-container">
                <form className="login-form" onSubmit={onSubmitForm}>
                  <div className="image-container">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" 
                    alt="website logo" className="login-page-logo"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="username" className="input-label">USERNAME</label>
                        <input type="text" id="username" className="input-field"
                            onChange={onChangeUser} value={username}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="input-label">PASSWORD</label>
                        <input type="password" id="password" className="input-field"
                            onChange={onChangePassword} value={password}
                        />
                    </div>
                     <button type="submit" className="login-button">Login</button>
                     {showSubmitError && <p className="error-message">{errorMsg}</p>}
                </form>
            </div>
        </div>
    )
}

export default LoginPage