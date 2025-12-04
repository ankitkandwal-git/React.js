
// Write your code here
import {AiFillClockCircle} from 'react-icons/ai'
import './index.css'

const CourseTimelineCard = props => {
  const {courseDetails} = props
  const {courseTitle, duration, description, tagsList} = courseDetails
  return (
    <>
      <div className="courseTitleAndDuration_container">
        <h1 className="course_title">{courseTitle}</h1>
        <div className="duration_container">
          <AiFillClockCircle color="#171f46" />
          <p className="duration">{duration}</p>
        </div>
      </div>
      <p className="course_description">{description}</p>
      <ul className="courseTagsList">
        {tagsList.map(eachTag => (
          <li key={eachTag.id} className="courseTagItem">
            <p className="courseTag">{eachTag.name}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CourseTimelineCard
