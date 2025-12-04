import {useParams} from 'react-router-dom'
import FullJobDetails from './FullJobDetails'

const FullJobDetailsWrapper = () => {
  const {id} = useParams()
  return <FullJobDetails jobId={id} />
}

export default FullJobDetailsWrapper
