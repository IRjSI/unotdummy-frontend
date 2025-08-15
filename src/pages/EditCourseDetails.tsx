import axios from "axios"
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, DollarSign, List, LucideWifiOff, NotebookPen, PenLineIcon, TrendingUp, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const EditCourseDetails = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const { courseId } = location.state

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "web development",
        level: "beginner",
        price: 0,
        currency: "INR",
        isPublished: true
    })

    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const categories = [
        "web development",
        "app development",
        "web design",
        "video editing",
        "photo editing",
        "business models",
        "content creation",
    ]

    const levels = [
        "beginner",
        "intermediate",
        "advanced"
    ]

    const currencies = [
        "INR",
        "USD",
        "YEN",
        "EURO"
    ]

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {

            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("category", formData.category);
            form.append("level", formData.level);
            form.append("price", JSON.stringify(formData.price));
            form.append("currency", formData.currency);
            form.append("isPublished", JSON.stringify(formData.isPublished));
            form.append("thumbnail", thumbnail ?? '');

            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}`, form)

            if (res.data.success) {
                setMessage("Updated successfully")
                // navigate("/create-lecture", { state: { courseId: res.data.data._id }})
            } else {
                setError("failed to create course")
            }
            
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}`)

                setFormData(res.data.data)
            } catch (error) {
                setError("Something went wrong while fetching course details")
            }
        }

        fetchCourseDetails()
    }, [])
  return (
    <div className="min-h-screen flex p-4">
        <main className="relative w-full">
            <div className="absolute top-4 left-4">
                <button
                    className="flex items-center bg-violet-500  p-4 rounded-xl hover:bg-violet-500/20 hover:text-violet-500 text-white transition-all duration-300"
                    onClick={() => navigate("/my-courses")}
                    title="back"
                >
                    <ChevronLeft size={20} className="" />
                </button>
            </div>
            <section className="container mx-auto flex flex-col items-center justify-center relative max-w-4xl">
                <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-300 px-8 py-6 w-full rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Update Course</h1>
                            <p className="text-violet-100 text-sm">Fill in the details to update your course</p>
                        </div>
                    </div>
                </div>
                <form className="text-violet-950 flex flex-col items-center justify-center space-y-4 bg-white/50 rounded-b-xl border border-violet-300 p-4 md:p-12 lg:p-16 border-b-4 border-r-4 w-full" onSubmit={submitHandler}>
                    <div className="w-full flex justify-center gap-4">

                        <div className="w-full space-y-4">

                            <div className="w-full">
                                <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
                                <div className="relative group">
                                    <PenLineIcon size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value})}
                                        type="text"
                                        placeholder="Course Title"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                        />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
                                <div className="relative group">
                                    <NotebookPen size={20} className="absolute top-8 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value})}
                                        placeholder="Course Description"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full h-[200px] border-b-4 border-violet-300 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="category" className="block text-sm font-semibold mb-2">Category</label>
                                <div className="relative group">
                                    <List size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none overflow-y-auto"
                                    >
                                        {categories.length > 0 && categories.map((category, key) => (
                                            <option value={category} key={key}>{category}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <label htmlFor="level" className="block text-sm font-semibold mb-2">Level</label>
                                <div className="relative group">
                                    <TrendingUp size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                                        >
                                        {levels.length > 0 && levels.map((level, key) => (
                                            <option value={level} key={key}>{level}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                </div>
                            </div>
                            

                        <div className="w-full space-y-4">
                            
                            <div className="w-full">
                                <label htmlFor="thumbnail" className="block text-sm font-semibold mb-2">Thumbnail</label>
                                <div className="relative group">
                                    <div className="border-2 border-dashed border-violet-300 rounded-xl p-8 text-center bg-violet-300/20 text-violet-950 hover:border-violet-400 transition-colors duration-300 hover:bg-violet-50">
                                        <Upload size={32} className="mx-auto text-violet-950/50 group-hover:text-violet-950 transition-colors duration-300 mb-3" />
                                        <p className="text-sm mb-2">Click to upload or drag and drop</p>
                                        <p className="text-xs text-violet-950/80">PNG, JPG, GIF up to 10MB</p>
                                        <input
                                            name="thumbnail"
                                            //@ts-ignore
                                            onChange={(e) => setThumbnail(e.target.files?.[0])}
                                            type="file"
                                            accept="Image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                    </div>
                                    {thumbnail && (
                                        <p className="mt-2 text-sm text-violet-600 font-medium">
                                            Selected: {thumbnail.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                            
                            <div className="w-full">
                                <label htmlFor="isPublished" className="block text-sm font-semibold mb-2">Make this course Private?</label>
                                <div className="relative group">
                                    <LucideWifiOff size={20} className="absolute top-8 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <button
                                        name="isPublished"
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished})}
                                        className="p-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    >
                                        {!formData.isPublished ? "Yes" : "No"}
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                
                    <div className="w-full grid grid-cols-[3fr_1fr] items-center gap-2">
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold mb-2">Price</label>
                            <div className="relative group">
                                <DollarSign size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value)})}
                                    type="number"
                                    placeholder="Course Price"
                                    required
                                    className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="currency" className="block text-sm font-semibold mb-2">Currency</label>
                            <div className="relative group">
                                <TrendingUp size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                                    >
                                    {currencies.length > 0 && currencies.map((currency, key) => (
                                        <option value={currency} key={key}>{currency}</option>
                                    ))}
                                </select>
                                <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                            </div>
                        </div>
                    </div>

                    {error && <div className="w-full text-center">
                        <p className="text-red-500">{error}</p>
                    </div>}
                    
                    {message && <div className="w-full text-center">
                        <p className="text-green-500">{message}</p>
                    </div>}
                    
                    <div className="">
                        <div className="group">
                            <Link
                                to={"/create-lecture"} 
                                state={{ courseId }}
                                className="flex items-center gap-2 py-4 px-6 font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300"
                            >
                                Add Lectures <ChevronRight className="group-hover:rotate-360 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <div className="group">
                            <button 
                                className="flex items-center justify-center gap-2 py-4 px-6 w-full font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300 border-b-4 border-r-4 border-violet-900 from-violet-600 via-violet-500 to-violet-600 rounded-xl"
                                type="submit"
                                >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                    
                </form> 

            </section>
        </main>
    </div>
  )
}

export default EditCourseDetails