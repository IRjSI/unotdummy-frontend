import { AuthContext, type AuthContextProps } from '@/context/AuthContext'
import axios from 'axios'
import { Award, BookOpen, DollarSign, Star, Users } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface ICourse {
    _id: string,
    thumbnail: string,
    title: string,
    description: string,
    currency: string,
    price: number,
    enrolledStudents: [],
    totalLectures: number,
    instructor: {
        _id: string,
        name: string,
        avatar: string
    }
}

const Course = () => {
    const { user, fetchUser } = useContext(AuthContext) as AuthContextProps

    const param = useParams()
    const { courseId } = param

    const [course, setCourse] = useState<ICourse>()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const currencies = [
        { value: "INR", symbol: "₹" },
        { value: "USD", symbol: "$" },
        { value: "YEN", symbol: "¥" },
        { value: "EURO", symbol: "€" },
    ]


    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)
            setError("")
            try {
                await fetchUser()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()

        const fetchCourse = async () => {
            setLoading(true)
            setError("")
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`)
    
                if (res.data.success) {
                    setCourse(res.data.data)
                } else {
                    setError("failed to fetch course")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [])

    if (loading) {
        return <div className='text-center text-3xl font-semibold animate-pulse'>
            Loading...
        </div>
    }

    if (error) {
        return <div className='text-center text-3xl font-semibold text-red-500'>
            {error}
        </div>
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
        <section className='relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900'>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* image */}
                        <div className="">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img 
                                    src={course?.thumbnail} 
                                    className="w-full h-72 object-cover" 
                                    alt={course?.title}
                                />
                            </div>
                        </div>

                        {/* course info */}
                        <div className="text-white space-y-6">
                            <div className="flex items-center gap-2 text-blue-200">
                                <Award className="w-5 h-5" />
                                <span className="text-sm font-medium">BESTSELLER COURSE</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                {course?.title}
                            </h1>
                            
                            <p className="text-xl text-blue-100 leading-relaxed">
                                {course?.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-6 text-blue-200">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-medium">4.8 (2,474 reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8 pb-8">
                    
                    <div className="lg:col-span-2 space-y-8">

                        <div className="grid md:grid-cols-3 gap-6">
                            
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-xl">
                                        <Users className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{course?.enrolledStudents.length.toLocaleString()}</p>
                                        <p className="text-gray-600">Students Enrolled</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{course?.totalLectures}</p>
                                        <p className="text-gray-600">Total Lectures</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-100 p-3 rounded-xl">
                                        <DollarSign className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{
                                            course?.currency === currencies[0].value ? currencies[0].symbol : 
                                            course?.currency === currencies[1].value ? currencies[1].symbol :
                                            course?.currency === currencies[2].value ? currencies[2].symbol : 
                                            course?.currency === currencies[3].value ? currencies[3].symbol : null
                                        }{course?.price}</p>
                                        <p className="text-gray-600">Course Price</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Your Instructor</h2>
                            <div className="flex items-center gap-6">

                                <div className="">
                                    <img 
                                        src={course?.instructor.avatar} 
                                        className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                                        alt={course?.instructor.name}
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{course?.instructor.name}</h3>
                                    <p className="text-gray-600 mb-3">Senior Full Stack Developer & Instructor</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            4.9 Instructor Rating
                                        </span>
                                        <span>50,000+ Students</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 sticky top-8">
                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <span className="text-4xl font-bold text-gray-800">{
                                        course?.currency === currencies[0].value ? currencies[0].symbol : 
                                        course?.currency === currencies[1].value ? currencies[1].symbol :
                                        course?.currency === currencies[2].value ? currencies[2].symbol : 
                                        course?.currency === currencies[3].value ? currencies[3].symbol : null
                                    }{course?.price}</span>
                                </div>
                            </div>

                            {course?.instructor._id !== user.id ? (
                                <div className='flex flex-col items-center justify-center'>
                                    <Link 
                                        to={"/enroll"}
                                        state={{ courseId: course?._id }}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-4 text-center"
                                    >
                                        Enroll Now
                                    </Link>

                                    <Link 
                                        to={"/watch"}
                                        state={{ courseId: course?._id }}
                                        className="w-full bg-blue-500/10 border border-blue-500/50
                                         text-black font-bold py-4 px-6 rounded-xl hover:bg-blue-500/20 transform hover:scale-105 transition-all duration-200 mb-4 text-center"
                                    >
                                        Watch Preview
                                    </Link>
                                </div>
                            ) : (
                                    <div className='flex flex-col items-center justify-center'>
                                        <Link
                                            to={"/edit-course"}
                                            state={{ courseId: course?._id }}
                                            className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
                                            >
                                            Edit
                                        </Link>
                                        <Link 
                                            to={"/watch"}
                                            state={{ courseId: course?._id }}
                                            className="w-full bg-blue-500/10 border border-blue-500/50
                                            text-black font-bold py-4 px-6 rounded-xl hover:bg-blue-500/20 transform hover:scale-105 transition-all duration-200 mb-4 text-center"
                                        >
                                            Watch Preview
                                        </Link>
                                    </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
  )
}

export default Course