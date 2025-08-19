import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import SearchCourse from "../components/SearchCourse"
import { Star, Users, BookOpen, Award, ChevronRight, Play, Stars } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AuthContext, type AuthContextProps } from "@/context/AuthContext"
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}

interface ICourse {
  _id: string,
  title: string,
  description: string,
  thumbnail: string,
  enrolledStudents: [],
  currency: string,
  price: number,
  category: string,
  instructor: {
    _id: string,
    name: string,
    avatar: string
  }
}

const Home = () => {
  const { fetchUser, user } = useContext(AuthContext) as AuthContextProps

  const coursesRef = useRef<HTMLElement | null>(null)

  const scrollToSection = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const [courses, setCourses] = useState<ICourse[]>([])

  const currencies = [
    { value: "INR", symbol: "₹" },
    { value: "USD", symbol: "$" },
    { value: "YEN", symbol: "¥" },
    { value: "EURO", symbol: "€" },
  ]
  const gurus = [
    {
      name: "Arjun Sharma",
      expertise: "Digital Art & Illustration",
      experience: "12 years",
      students: "15k+",
      rating: 4.4,
      isTopInstructor: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
    },
    {
      name: "Kavya Trivedi",
      expertise: "Animation & Character Design",
      experience: "24 years",
      students: "24k+",
      rating: 5.0,
      isTopInstructor: true,
      image: "https://mintlify.s3.us-west-1.amazonaws.com/dripart/images/tutorial/basic/img2img/input.jpeg"
    },
    {
      name: "Hitesh Choudhary",
      expertise: "Web Developer & Instructor",
      experience: "15 years",
      students: "20k+",
      rating: 4.8,
      isTopInstructor: false,
      image: "https://framerusercontent.com/images/X9EHD6pwUb17NFFMCCk8VOWDnD8.jpg"
    }
  ]
  const stats = [
    { icon: Users, value: "50k+", label: "Active Students" },
    { icon: BookOpen, value: "200+", label: "Expert Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Star, value: "4.8", label: "Average Rating" }
  ]

  useEffect(() => {
    const fetchProfile = async () => {
      await fetchUser()
    }

    fetchProfile()

    const fetchCourses = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/published?limit=5`)

      if (res.data.success) {
        setCourses(res.data.data)
      }
    }

    fetchCourses()
  }, [])
  
  return (
    <div className="min-h-screen">

      <section className="bg-gradient-to-br from-violet-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Master Your Creative Journey with Expert
              <span className="text-violet-600"> Gurus</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Learn from industry professionals and transform your passion into expertise. 
              Join thousands of students already mastering their craft.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors" onClick={scrollToSection}>
                Start Learning Today
              </button>
              <button className="flex items-center gap-2 border border-violet-600 text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors">
                <Play size={20} />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="mt-12">
            <SearchCourse />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-violet-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="featured-courses" ref={coursesRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Discover our most popular and highly-rated courses</p>
          </div>

          <Carousel
            className="max-w-6xl mx-auto"
            plugins={[
              Autoplay({
                delay: 200,
              }),
            ]}
          >
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem key={course._id} className="flex items-center justify-center">
                  <div className="w-full max-w-md relative group">
                    <div className="relative h-[360px] overflow-hidden rounded-xl">
                      <img 
                        src={course.thumbnail} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        alt={course.title} 
                      />
                      <div className="bg-gradient-to-t from-black/80 via-black/20 to-transparent absolute inset-0"></div>
                      
                      {/* Course Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        
                        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-200 mb-2 truncate">{course.description}</p>
                        <div className="container mx-auto">
                          <p className="text-center mb-4 bg-white/20 backdrop-blur-lg px-2 py-1 rounded-xl">{course.category}</p>
                        </div>
                        <span className="font-bold backdrop-blur-lg px-2 py-1 rounded-xl">Instructor: {course.instructor.name}</span>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-2xl font-bold text-violet-400">{
                              course.currency === currencies[0].value ? currencies[0].symbol : 
                              course.currency === currencies[1].value ? currencies[1].symbol :
                              course.currency === currencies[2].value ? currencies[2].symbol : 
                              course.currency === currencies[3].value ? currencies[3].symbol : null
                            }{course.price}</span>
                          {course.instructor._id !== user?.id ? (
                            <Link to={`/course/${course._id}`} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                              Enroll Now
                              <ChevronRight size={16} />
                            </Link>
                          ) : (
                            <Link to={`/course/${course._id}`} className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                              Edit
                              <ChevronRight size={16} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center underline">
            <Link to={"/courses"}>
              view more
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Gurus</h2>
            <p className="text-xl text-gray-600">Learn from industry experts with years of professional experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {gurus.map((guru, index) => (
              <div key={index} className="bg-white rounded-xl border border-r-4 border-b-4 border-violet-500 p-6 relative">
                {guru.isTopInstructor && <div className="absolute right-4 top-4 bg-yellow-400/20 border-yellow-400 px-2 py-2 rounded-md text-sm font-semibold text-yellow-400 flex items-center gap-1 border-l-3 border-r-3"><Stars size={12} /></div>}
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-xl border-r-4 border-b-4 border-violet-300">
                    <img 
                      src={guru.image} 
                      className="w-full h-full object-cover rounded-full" 
                      alt={guru.name} 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-violet-950 mb-2">{guru.name}</h3>
                  <p className="text-violet-700 font-semibold mb-2">{guru.expertise}</p>
                  <p className="text-gray-600 mb-4">{guru.experience} of professional experience</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-violet-500" 
                        fill={i < Math.floor(guru.rating) ? "#8b5cf6" : "none"} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">{guru.rating}</span>
                  </div>
                  <p className="text-center text-gray-600 font-medium">{guru.students} students taught</p>
                  <button className="w-full bg-violet-100 text-violet-700 py-2 rounded-lg font-semibold hover:scale-105 duration-300 transition-all border-b-4 border-violet-300">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
     
    </div>
  )
}

export default Home