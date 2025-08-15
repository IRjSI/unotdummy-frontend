import axios from "axios"
import { BookOpen, ChevronLeft, Clock, Loader2, Pen, Trash2, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';


interface ICourse {
    _id: string,
    title: string,
    description: string,
    thumbnail: string,
    totalLectures: number,
    enrolledStudents: number[]
}

const MyCreatedCourses = () => {
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [refetch, setRefetch] = useState(false)
    const [courses, setCourses] = useState<ICourse[]>([])
    
    const notify = (msg: string) => toast(msg)

    const deleteCourse = async (courseId: string) => {
        setLoading(true)
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}`)

            if (res.data.success) {
                notify("Course deleted")
                setRefetch(!refetch)
                return
            }

            notify("Error deleting course")
        } catch (error) {
            // console.log(error)
            notify("something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchCreatedCourses = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course?limit=10`)

                setCourses(res.data.data)
            } catch (error) {
                // console.log(error)
                notify("Error fetching courses")
            } finally {
                setLoading(false)
            }
        }

        fetchCreatedCourses()
    }, [refetch])

  return (
    <div className="min-h-screen flex p-4">
        <main className="relative w-full">
            <div className="absolute top-4 left-4">
                <button
                    className="flex items-center bg-violet-500  p-4 rounded-xl hover:bg-violet-500/20 hover:text-violet-500 text-white transition-all duration-300"
                    onClick={() => navigate("/")}
                    title="back"
                >
                    <ChevronLeft size={20} className="" />
                </button>
            </div>

            <section className="pt-16 px-6 pb-6 max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
                    <p className="text-gray-600">Manage and track your course content</p>
                </div>
                <div className="flex flex-col space-y-2">
                    {courses.length > 0 ? (
                        courses.map((course, key) => (
                            <div key={key} className="border border-b-4 border-r-4 bg-violet-300/20 border-violet-300 rounded-xl p-4 w-full">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="w-96 h-auto">
                                        <img src={course.thumbnail} className="w-full h-full rounded-xl" alt="" />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col justify-center space-y-2">
                                            <h1 className="text-2xl font-semibold">{course.title}</h1>
                                            <p className="text-md text-gray-700">{course.description}</p>
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <BookOpen size={16} className="text-violet-500" />
                                                    <span>{course.totalLectures} lectures</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={16} className="text-violet-500" />
                                                    <span>{course.enrolledStudents.length} students</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={16} className="text-violet-500" />
                                                    <span>{24}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <Link
                                                to="/edit-course"
                                                state={{ courseId: course._id }}
                                                className="flex items-center gap-2 py-2 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-md transition-colors duration-200"
                                            >
                                                <Pen size={16} />
                                                <span className="hidden md:block">Edit</span>
                                            </Link>
                                            <button
                                                onClick={() => deleteCourse(course._id)} 
                                                className="flex items-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                                            >
                                                {loading ? <Loader2 size={16} className="animate-spin" /> : 
                                                    <>
                                                        <Trash2 size={16} />
                                                        <span className="hidden md:block">Delete</span>
                                                    </>
                                                }
                                            </button>
                                            <Toaster />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            No courses found.
                        </div>
                    )}
                </div>
            </section>
        </main>
    </div>
  )
}

export default MyCreatedCourses