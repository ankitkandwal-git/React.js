import ProjectTimelineCard from '../ProjectTimelineCard'
import CourseTimelineCard from '../CourseTimelineCard'
import { Chrono } from 'react-chrono';
import './index.css'

const TimelineView = props => {
    const {timelineItemsList} = props
     const renderTimelineCard = item => {
    if (item.categoryId === 'PROJECT') {
        return <ProjectTimelineCard key={item.duration} projectDetails={item} />
    }
        return <CourseTimelineCard key={item.duration} courseDetails={item} />
    } 
    return(
         <div className="TimelineView_container">
      <div className="responsive_container">
        <div className="header_container">
          <h1 className="heading">
            MY JOURNEY OF <br />
            <span className="ccbp_heading">CCBP 4.0</span>
          </h1>
        </div>
        <Chrono
          theme={{secondary: 'white'}}
          items={timelineItemsList}
          mode="VERTICAL_ALTERNATING"
        >
          {timelineItemsList.map(eachItem => renderTimelineCard(eachItem))}
        </Chrono>
      </div>
    </div>
    )
}

export default TimelineView