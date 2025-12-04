import './index.css'

const ProfileCard = props => {
    const {name, profileImageUrl, shortBio, onChangeEmploymentType, onChangeSalaryRange} = props
    
    const handleEmploymentTypeChange = (event) => {
        const { id, checked } = event.target;
        const typeMap = {
            'fullTime': 'Full Time',
            'partTime': 'Part Time',
            'freelance': 'Freelance',
            'internship': 'Internship'
        };
        onChangeEmploymentType(typeMap[id], checked);
    };
    
    const handleSalaryChange = (event) => {
        const { value } = event.target;
        onChangeSalaryRange(value);
    };
    
    return(
            <div className="profile-details-container">
                <div className="profile-details">
                    <img src={profileImageUrl || "https://assets.ccbp.in/frontend/react-js/profile-img.png"} alt="profile" className="profile-image" />
                    <div className="profile-info">
                        <h1 className="profile-name">{name || "User Name"}</h1>
                        <p className="profile-bio">{shortBio || "Short bio goes here."}</p>
                    </div>
                </div>
                <hr className="seperate"/>
                <div className="employment-type-container">
                    <h1 className="employment-type-heading">Type of Employment</h1>
                    <ul className="employment-type-list">
                        <li className="checkbox-item">
                            <input type="checkbox" id="fullTime" className="checkbox-input" onChange={handleEmploymentTypeChange}/>
                            <label htmlFor="fullTime" className="checkbox-label">Full Time</label>
                        </li>
                        <li className="checkbox-item">
                            <input type="checkbox" id="partTime" className="checkbox-input" onChange={handleEmploymentTypeChange}/>
                            <label htmlFor="partTime" className="checkbox-label">Part Time</label>
                        </li>
                        <li className="checkbox-item">
                            <input type="checkbox" id="freelance" className="checkbox-input" onChange={handleEmploymentTypeChange}/>
                            <label htmlFor="freelance" className="checkbox-label">Freelance</label>
                        </li>
                        <li className="checkbox-item">
                            <input type="checkbox" id="internship" className="checkbox-input" onChange={handleEmploymentTypeChange}/>
                            <label htmlFor="internship" className="checkbox-label">Internship</label>
                        </li>
                    </ul>
                </div>
                <hr className="seperate"/>
                <div className="salary-range-container">
                    <h1 className="salary-range-heading">Salary Range</h1>
                    <ul className="salary-range-list salary-range-row">
                        <li className="radio-item">
                            <input type="radio" id="10k" name="salary" value="1000000" className="radio-input" onChange={handleSalaryChange}/>
                            <label htmlFor="10k" className="radio-label">10 LPA Above</label>
                        </li>
                        <li className="radio-item">
                            <input type="radio" id="20k" name="salary" value="2000000" className="radio-input" onChange={handleSalaryChange}/>
                            <label htmlFor="20k" className="radio-label">20 LPA above</label>
                        </li>
                        <li className="radio-item">
                            <input type="radio" id="30k" name="salary" value="3000000" className="radio-input" onChange={handleSalaryChange}/>
                            <label htmlFor="30k" className="radio-label">30 LPA above</label>
                        </li>
                        <li className="radio-item">
                            <input type="radio" id="40k" name="salary" value="4000000" className="radio-input" onChange={handleSalaryChange}/>
                            <label htmlFor="40k" className="radio-label">40 LPA above</label>
                        </li>
                    </ul>
                </div>
            </div>
        )
}

export default ProfileCard