import {useNavigate} from 'react-router-dom';
import './index.css';

const JobCard = props => {
    const {jobCardDetails} = props;
    const {id, companyLogoUrl, title, location, employmentType, packagePerAnnum, rating, jobDescription} = jobCardDetails;
    const navigate = useNavigate();

    const onCardClick = () => {
        navigate(`/jobs/${id}`);
    };

    return(
        <div className="job-card-container" onClick={onCardClick} style={{cursor: 'pointer'}}>
            <div className="job-card-header">
                <div className="job-image-title-row">
                    <img src={companyLogoUrl} alt="company logo" className="company-logo" />
                    <h1 className="job-title">{title}</h1>
                </div>
                <div className="job-rating-row">
                    <p className="job-rating">⭐ {rating}</p>
                </div>
            </div>
            <div className="job-card-details-container">
                <div className="job-location-employmenttype-container">
                    <p className="job-location">{location}</p>
                    <p className="job-employment-type">{employmentType}</p>
                </div>
                <p className="job-package">{packagePerAnnum}</p>
            </div>
            <hr className="separator" />
            <div className="job-description-container">
                <h1 className="description-heading">Description</h1>
                <p className="job-description">{jobDescription}</p>
            </div>
        </div>
    );
}

export default JobCard;