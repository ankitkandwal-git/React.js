import { Component  } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import SkillCard from "../SkillCard";
import SimilarJobItem from "../SimilarJobItem";
import Header from "../Header";
import './index.css'
const apiStatusConstants = {
    initial : 'INITIAL',    
    inProgress : 'IN_PROGRESS',
    success : 'SUCCESS',
    failure : 'FAILURE',
}
class FullJobDetails  extends Component{
    state ={
        jobItemList : {},
        similarJobsList : [],
        apiStatus : apiStatusConstants.initial,
    }
    componentDidMount(){
        const { jobId } = this.props;
        this.getFullJobDetails(jobId);
    }
    getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

    getFullJobDetails  = async(id) =>{
        this.setState({
            apiStatus : apiStatusConstants.inProgress,
        })
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/jobs/${id}`
        const options = {
            method : 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(apiUrl, options)
        if(response.ok === true){
            const data = await response.json()
            const updatedData = this.getFormattedData(data.job_details)
            const updatedSkillsData = data.similar_jobs.map(eachJob =>
                this.getFormattedSkillData(eachJob)
            )
            this.setState({
                jobItemList : updatedData,
                similarJobsList : updatedSkillsData,
                apiStatus: apiStatusConstants.success,
            })
        }else{
            this.setState({
                apiStatus : apiStatusConstants.failure,
            })
        }
    }
    renderJobsDetailView = () => {
        const {jobItemList, similarJobsList} = this.state
        const {companyLogoUrl, companyWebsiteUrl, employmentType, jobDescription, lifeAtCompany, location, rating, title, packagePerAnnum, skills} = jobItemList
        return(
            <div className="app-container">
                <div className="job-details-container">
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
                            <p className="job-location">📍 {location}</p>
                            <p className="job-employment-type">💼 {employmentType}</p>
                        </div>
                        <p className="job-package">{packagePerAnnum}</p>
                    </div>
                    <hr className="separator" />
                    <div className="job-description-container">
                        <div className="description-header-row">
                            <h1 className="description-heading">Description</h1>
                            {companyWebsiteUrl && (
                                <a
                                    href={companyWebsiteUrl}
                                    className="company-website-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit <span aria-label="external link" role="img">🔗</span>
                                </a>
                            )}
                        </div>
                        <p className="job-description">{jobDescription}</p>
                    </div>
                    <div className="skills-container">
                        <h1 className="skills-heading">Skills</h1>
                        <ul className="skills-list">
                            {skills.map(eachSkill => (
                                <SkillCard key={eachSkill.name} skillDetails={eachSkill} />
                            ))}
                        </ul>
                    </div>
                    <hr className="separator" />
                    <div className="life-at-company-container">
                        <h1 className="life-at-company-heading">Life at Company</h1>
                        <div className="life-at-company-details">
                            <p className="life-at-company-description">{lifeAtCompany.description}</p>
                        </div>
                    </div>
                    <hr className="separator" />
                    <div className="similar-jobs-container">
                        <h1 className="similar-jobs-heading">Similar Jobs</h1>
                        <ul className="similar-jobs-list">
                            {similarJobsList.map(eachJob => (   
                                <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    renderLoadingView = () => (
        <div className="loader-container" data-testid="loader">
            <ThreeDots color="#0b69ff" height={80} width={80} />
        </div>
    )
     renderFailureView = () =>(
         <div className="render-loading-view">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="failure-view"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong </h1>
            <p className="failure-desc">
                We cannot seem to find the page you are looking for
            </p>
            <button
                type="button"
                testid="button"
                className="job-item-failure-button"
                onClick={this.getJobItem}
                 >
                Retry
            </button>
        </div>
    )
    renderJobsView = () => {
        const {apiStatus} = this.state
        switch(apiStatus){
            case apiStatusConstants.success :
                return this.renderJobsDetailView ()
            case apiStatusConstants.failure :
                return this.renderFailureView()
            case apiStatusConstants.inProgress :
                return this.renderLoadingView()
            default :
                return null
        }
    }
    render(){
        return(
            <>
             <Header/>
            <div>
                {this.renderJobsView()}
            </div>
            </>
        )
    }
}

export default FullJobDetails