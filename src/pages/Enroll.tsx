import { useLocation } from 'react-router-dom'

const Enroll = () => {
    const location = useLocation()
    const { courseId }= location.state

  return (
    <div className='min-h-screen text-5xl text-center font-bold'>
        Enroll to course: {courseId}
    </div>
  )
}

export default Enroll