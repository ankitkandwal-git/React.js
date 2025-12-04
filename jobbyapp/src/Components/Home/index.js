import Header from '../Header'
import './index.css'


const Home = () => {
    return (
        <>
            <Header />
            <div className="app-container">
                <div className="home-container">
                    <div className="home-content">
                        <div className="home-text">
                            <h1 className="heading">FIND THE JOB THATS <br />FIT YOUR ROLE</h1>
                            <p className="paragraph">
                                Millions of people are searching for jobs, salary information,
                                <br />company reviews. Find the job that fits your abilities and potential.
                            </p>
                            <button type="button" className="find-jobs-button">Find Jobs</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home