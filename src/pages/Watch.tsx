import axios from "axios"
import { Check, LockIcon, PlayCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import VideoJS from '../components/Player'
import { Progress as ProgressCN } from "@/components/ui/progress"

interface ILecture {
  _id: string,
  title: string,
  description: string,
  videoUrl: string,
  publicId: string,
  isPreview: boolean,
  isCompleted: boolean
}

interface ICourse {
  title: string,
  description: string,
  instructor: {
    name: string,
    avatar: string
  }
}

const Watch = () => {

  const handlePlayerReady = () => {

      // You can handle player events here, for example:

  }

  const location = useLocation()
  const { courseId } = location.state

  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)
  const [lectures, setLectures] = useState<ILecture[]>([])
  const [course, setCourse] = useState<ICourse>()
  const [currentLecture, setCurrentLecture] = useState<ILecture>()
  const [completion, setCompletion] = useState(0)

  const [tabs, setTabs] = useState("content")

  const videoJsOptions = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      sources: [{
          src: currentLecture?.videoUrl || lectures[0]?.videoUrl,
          type: 'video/mp4'
      }],
      preload: 'metadata'
  }

  const lectureProgress = async () => {
    try {
      if (!currentLecture) {
        return
      }

      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/progress/${courseId}/lectures/${currentLecture._id}`,  {})

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/progress/${courseId}`)

      const completion = res.data.data.completionPercentage
      setCompletion(completion)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    const initialize = async () => {
      try {
        const progressRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/progress/${courseId}`)

        const completion = progressRes.data.data.completionPercentage
        setCompletion(completion)

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}/lectures`);

        if (res.data.success) {
          const { lectures, isEnrolled, isInstructor } = res.data.data

          setIsEnrolled(isEnrolled)
          setIsInstructor(isInstructor)

          setLectures(lectures)

          const index = Math.floor(lectures.length * (completion / 100))
          const selectedLecture = lectures[index]

          if (selectedLecture) setCurrentLecture(selectedLecture)
        }

        const courseRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}`) 

        if (courseRes.data.success) {
          setCourse(courseRes.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch lectures", error)
      }
    }

    initialize()
  }, [])
  
  useEffect(() => {
    lectureProgress()
  }, [currentLecture])

  const Overview = ({ course }: { course: ICourse | undefined }) => {
    return (
      <section className="mt-4 px-4">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-3xl">
            {course?.title}
          </span>
          <span className="w-1/4 h-1 bg-violet-300/30"></span>
          <span className="text-xl">
            {course?.description}
          </span>

          <span className="text-lg">
            - {course?.instructor.name}
          </span>
        </div>
      </section>
    )
  }

  const Content = ({ isInstructor, completion, lectures }: { 
    isInstructor: boolean,
    completion: number,
    lectures: ILecture[]
  }) => {
    return (
      <section className="mt-4 px-4">
      <div className="flex flex-col gap-2">
        {isInstructor ? null : <div>
          Progress: {`${completion}% ${completion === 100 ? "🎉" : ""}`}
        </div>}
        {lectures.length > 0 ? (
          lectures.map((lecture, key) => (
            isInstructor ? 
              (
                <div key={key} className={`border p-4 flex items-center justify-between gap-2`}>
                  <h1 className="text-lg font-semibold">{lecture.title}</h1>
                  <div className="flex items-center gap-2">                  
                    <PlayCircle size={24} onClick={() => setCurrentLecture(lecture)} className="cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div key={key} className={`border p-4 flex items-center justify-between gap-2 ${!isEnrolled ? lecture.isPreview ? "" : "text-gray-400 cursor-not-allowed" : ""}`}>
                  <h1 className="text-lg font-semibold">{lecture.title}</h1>
                  <div className="flex items-center gap-2">
                  {lecture.isCompleted && <Check />}
                  {isEnrolled ? <PlayCircle size={24} onClick={() => setCurrentLecture(lecture)} className="cursor-pointer" /> : (lecture.isPreview ? <PlayCircle size={24} onClick={() => setCurrentLecture(lecture)} className="cursor-pointer" /> : <LockIcon size={24} />)}
                  </div>
                </div>
              )
          ))
        ) : (
          <div>No lectures found.</div>
        )}
      </div>
    </section>
    )
  }

  const Progress = ({ completion }: { completion: number }) => {
    return (
      <section className="mt-4 px-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <span>Progress: {completion}%</span>
          <ProgressCN value={completion} className="w-1/2" />
        </div>
      </section>
    )
  }

  return (
  <div className="min-h-screen flex flex-col">
    <section className="w-full max-w-5xl mx-auto p-4">
      <div className="w-full aspect-video"> 
        <VideoJS 
          options={videoJsOptions} 
          onReady={handlePlayerReady}
          title={currentLecture?.title || lectures[0]?.title}
          description={currentLecture?.description || lectures[0]?.description}
        />
      </div>
    </section>

    <section className="flex items-center justify-center mt-4">
      <span className={`border p-2 ${tabs === "overview" ? "font-bold" : ""}`} onClick={() => setTabs("overview")}>Overview</span>
      <span className={`border p-2 ${tabs === "content" ? "font-bold" : ""}`} onClick={() => setTabs("content")}>Content</span>
      <span className={`border p-2 ${tabs === "progress" ? "font-bold" : ""}`} onClick={() => setTabs("progress")}>Progress</span>
    </section>

    {tabs === "overview" && <Overview course={course} />}
    {tabs === "content" && <Content isInstructor={isInstructor} completion={completion} lectures={lectures} />}
    {tabs === "progress" && <Progress completion={completion} />}
    
  </div>
)
}

export default Watch