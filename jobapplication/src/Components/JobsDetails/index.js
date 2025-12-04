import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard';
import ProfileCard from '../ProfileCard';
import Header from '../Header';
import './index.css';

const apiStatusConstants = {
    initial : 'INITIAL',
    inProgress : 'IN_PROGRESS',
    success : 'SUCCESS',
    failure : 'FAILURE',
}
class jobs extends Component {
    state = {
        jobsList: [],
        profile: null,
        apiStatus : apiStatusConstants.initial,
        searchInput : '',
        employmentTypeFilters: [],
        salaryRangeFilter: '',
    }
    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value})
    }
    
    onChangeEmploymentType = (type, isChecked) => {
        const { employmentTypeFilters } = this.state;
        if (isChecked) {
            this.setState({ employmentTypeFilters: [...employmentTypeFilters, type] });
        } else {
            this.setState({ 
                employmentTypeFilters: employmentTypeFilters.filter(t => t !== type) 
            });
        }
    }
    
    onChangeSalaryRange = (range) => {
        this.setState({ salaryRangeFilter: range });
    }
    componentDidMount() {
        this.getJobsDetails();
        this.getProfileDetails();
    }
   
    getJobsDetails = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const jwtToken = Cookies.get('jwt_token');
        const jobsApiUrl = "https://apis.ccbp.in/jobs";
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        const response = await fetch(jobsApiUrl, options);
        if (response.ok === true) {
            const data = await response.json();
            const updatedData = data.jobs.map(job => ({
                id: job.id,
                companyLogoUrl: job.company_logo_url,
                employmentType: job.employment_type,
                jobDescription: job.job_description,
                location: job.location,
                packagePerAnnum: job.package_per_annum,
                rating: job.rating,
                title: job.title,
            }));
            this.setState({
                jobsList: updatedData,
                 apiStatus: apiStatusConstants.success,
            });
        } else{
            this.setState({
                apiStatus: apiStatusConstants.failure,
            })
        }
    }

    getProfileDetails = async () => {
        const jwtToken = Cookies.get('jwt_token');
        const profileApiUrl = "https://apis.ccbp.in/profile";
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        const response = await fetch(profileApiUrl, options);
        if (response.ok === true) {
            const data = await response.json();
            const profileDetails = data.profile_details;
            this.setState({
                profile: {
                    name: profileDetails.name,
                    profileImageUrl: profileDetails.profile_image_url,
                    shortBio: profileDetails.short_bio,
                }
            });
        }
    }

    renderJobsDetails = () => {
        const { jobsList, searchInput, employmentTypeFilters, salaryRangeFilter } = this.state;
        
        const filteredJobs = jobsList.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchInput.toLowerCase());
            const matchesEmploymentType = employmentTypeFilters.length === 0 || 
                employmentTypeFilters.some(type => 
                    job.employmentType.toLowerCase().includes(type.toLowerCase())
                );
            
            let matchesSalary = true;
            if (salaryRangeFilter) {
                const salaryText = job.packagePerAnnum.toLowerCase();
                let salary = 0;
                if (salaryText.includes('lpa') || salaryText.includes('lakh')) {
                    const numbers = salaryText.match(/\d+/g);
                    if (numbers && numbers.length > 0) {
                        salary = parseInt(numbers[0]) * 100000; // Convert lakhs to rupees
                    }
                } else {
                    salary = parseInt(job.packagePerAnnum.replace(/[^0-9]/g, ''));
                }
                
                const minSalary = parseInt(salaryRangeFilter);
                matchesSalary = salary >= minSalary;
            }
            
            return matchesSearch && matchesEmploymentType && matchesSalary;
        });
        return (
            <div className="jobs-list-container">
                <div className="search-input-container">
                    <input type="search" className="search-input" placeholder="Search" 
                        onChange={this.onChangeSearchInput} value={searchInput}
                    />
                    <button className="search-button" type="button">
                        <BsSearch className="search-icon" />
                    </button>
                </div>
                {filteredJobs.length === 0 ? (
                    <div className="render-failure-view">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                            alt="no jobs"
                        />
                        <h1>No Jobs Found</h1>
                        <p>We could not find any jobs. Try other keywords.</p>
                    </div>
                ) : (
                    <ul className="list-container">
                        {filteredJobs.map(job => (
                            <JobCard jobCardDetails={job} key={job.id} />
                        ))}
                    </ul>
                )}
            </div>
        );
    }
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
    renderProfileCard = () => {
        const { profile } = this.state;
        if (!profile) {
            return <div className="profile-details-container">Loading...</div>;
        }
        return <ProfileCard 
            {...profile} 
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
        />;
    }
    renderLoadingView = () =>(
            <div className="render-loading-view">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
            </div>
    )
     renderJob = () =>{
        const {apiStatus} = this.state
        switch(apiStatus){
            case apiStatusConstants.success:
                return this.renderJobsDetails()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default:
                return null
        }
    }
    render() {
            return (
                <> 
                    <Header />
                    <div className="jobs-details-bg-container">
                        {this.renderProfileCard()}
                        {this.renderJob()}
                    </div>
                </> 
            );
    }
}

export default jobs