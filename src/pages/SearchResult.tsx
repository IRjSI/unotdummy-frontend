import { ChevronLeft, Clock, DollarSign, Settings2, TrendingUp } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface ICourse {
    _id: string,
    title: string,
    description: string,
    thumbnail: string,
    category: string,
    instructor: {
        name: string,
        avatar?: string
    },
    level: string,
    price: number,
    totalLectures: number,
    totalEnrolledStudents: number 
}

const SearchResult = () => {
    const location = useLocation()
    const data = location.state.data

    const navigate = useNavigate()

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
            <section className="container mx-auto flex justify-center">
                <div className="grid grid-cols-3 gap-2">
                    {data.length > 0 ? (
                        data.map((course: ICourse, key: number) => (
                            <div key={key} className="rounded-xl flex flex-col items-start justify-center gap-2 border-2 border-b-4 border-r-4 border-violet-300 p-4 max-w-xl">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-full">
                                        <img src={course.thumbnail} className="w-full h-full rounded-xl border border-violet-300 border-b-4 border-r-4" alt="" />
                                    </div>
                                </div>
                                
                                <div className="text-3xl font-bold text-zinc-900">
                                    {course.title}
                                </div>

                                <div className="text-xl font-medium text-zinc-700">
                                    {course.description}
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-1 bg-violet-300/20 px-2 text-violet-950 rounded-xl">
                                        <Settings2 size={16} className="" />
                                        {course.category}
                                    </div>
                                    <div className="flex items-center gap-1 bg-violet-300/20 px-2 text-violet-950 rounded-xl">
                                        <Clock size={16} className="" />
                                        <span>
                                            {course.totalLectures} lectures
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-violet-300/20 px-2 text-violet-950 rounded-xl">
                                        <TrendingUp size={16} className=""  />
                                        {course.level}
                                    </div>
                                    <div className="flex items-center gap-1 bg-violet-300/20 px-2 text-violet-950 rounded-xl">
                                        <DollarSign size={16} className=""  />
                                        {course.price}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between gap-1 w-full">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 text-violet-950 rounded-xl">
                                            <img src={course.instructor.avatar} className="w-full h-full rounded-full" alt="sdsd" />
                                        </div>
                                        <div className="gap-1 text-violet-950 rounded-xl">
                                            <span>
                                                {course.instructor.name}
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/course/${course._id}`} className="p-2 rounded-xl bg-violet-500 text-white cursor-pointer">
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            No Course Found.
                        </div>
                    )}
                </div>
            </section>
        </main>
    </div>
  )
}

export default SearchResult