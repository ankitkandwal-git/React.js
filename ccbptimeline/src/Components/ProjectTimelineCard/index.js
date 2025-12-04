
// Write your code here
import {AiFillCalendar} from 'react-icons/ai'
import './index.css'

const ProjectTimelineCard = props => {
  const {projectDetails} = props
  const {
    imageUrl,
    projectTitle,
    duration,
    description,
    projectUrl,
  } = projectDetails
  return (
    <div className="projectCard_container">
      <img src={imageUrl} alt="project" className="project_image" />
      <div className="projectTitleAndDuration_container">
        <h1 className="project_title">{projectTitle}</h1>
        <div className="duration_container">
          <AiFillCalendar color="#171f46" />
          <p className="duration">{duration}</p>
        </div>
      </div>
      <p className="project_description">{description}</p>
      <a href={projectUrl} className="visit_Link">
        Visit
      </a>
    </div>
  )
}

export default ProjectTimelineCard
