import { Component } from "react";

import "./index.css"; 

class ProfileSection extends Component{
    state = {
        profileDetails : {}
    }
    componentDidMount(){
        this.getProfileDetails()
    }
    getProfileDetails = async() =>{
        const profileApiUrl = 'https://apis.ccbp.in/profile'
        const options = {
            method: 'GET',
        }
        const response = await fetch(profileApiUrl, options)
        if(response.ok === true){
            const data = await response.json()
            console.log(data)
            const profileData = {
                name : data.profile_details.name,
                profileImageUrl : data.profile_details.profile_image_url,
                shortBio : data.profile_details.short_bio,
            }
            this.setState({
                profileDetails : profileData

            })
        }
    }
    render(){
        return(
            <div className="profile-section">
                {this.renderProfileDetails()}
            </div>
        )
    }
} 

export default ProfileSection