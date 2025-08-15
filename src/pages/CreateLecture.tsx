import axios from "axios"
import { ChevronLeft, FileVideo, Settings, Settings2, Video } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const CreateLecture = () => {
    const location = useLocation()
    const { courseId } = location.state

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPreview, setIsPreview] = useState(true)

    const [lectureFormData, setLectureFormData] = useState({
        title: "",
        description: "",
        isPreview: isPreview
    })

    const [lectureFile, setLectureFile] = useState<File | null>(null);


    const lectureSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")
        try {
            if (!lectureFile) {
                alert('Please upload a lecture');
                setLoading(false);
                return;
            }
            
            const form = new FormData();
            form.append("title", lectureFormData.title);
            form.append("description", lectureFormData.description);
            form.append("isPreview", JSON.stringify(lectureFormData.isPreview));
            form.append("video", lectureFile);
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/c/${courseId}/lectures`, form)
            if (!res.data.success) {
                return
            }
            setMessage("Added!")
            setLectureFormData({
                title: "",
                description: "",
                isPreview: false,
            })
            setLectureFile(null)
        } catch (error) {
            setError("something went wrong")
        } finally {
            setLoading(false)
        }
    }
    
  return (
    <div className="min-h-screen flex w-screen p-4">
        <main className="relative flex items-center justify-center w-full">
            <div className="absolute top-4 left-4">
                <button
                    className="flex items-center bg-violet-500  p-4 rounded-xl hover:bg-violet-500/20 hover:text-violet-500 text-white transition-all duration-300"
                    onClick={() => navigate(`/my-courses`)}
                    title="back"
                >
                    <ChevronLeft size={20} className="" />
                </button>
            </div>
            <section className="container mx-auto flex flex-col items-center justify-center relative max-w-4xl">
                <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-300 px-8 py-6 w-full rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Settings size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Add Lectures</h1>
                            <p className="text-violet-100 text-sm">Fill in the details to add lecture</p>
                        </div>
                    </div>
                </div>
                <form className="text-violet-950 flex flex-col items-center justify-center space-y-4 bg-white/50 rounded-b-xl border border-violet-300 p-4 md:p-12 lg:p-16 border-b-4 border-r-4 w-full" onSubmit={lectureSubmitHandler}>
                    <div className="w-full flex justify-center gap-4">

                        <div className="w-full space-y-4">
                            
                            <div className="w-full">
                                <label htmlFor="lecture" className="block text-sm font-semibold mb-2">Lecture File</label>
                                <div className="relative group">
                                    <FileVideo size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        id="lecture"
                                        //@ts-ignore
                                        onChange={(e) => setLectureFile(e.target.files?.[0])}
                                        type="file"
                                        accept=".mp4"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <label htmlFor="lectureTitle" className="block text-sm font-semibold mb-2">Lecture Title</label>
                                <div className="relative group">
                                    <Video size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        id="lectureTitle"
                                        value={lectureFormData.title}
                                        onChange={(e) => setLectureFormData({ ...lectureFormData, title: e.target.value })}
                                        type="text"
                                        placeholder="Lecture Title"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                        />
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <label htmlFor="lectureDescription" className="block text-sm font-semibold mb-2">Lecture Description</label>
                                <div className="relative group">
                                    <Video size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        id="lectureDescription"
                                        value={lectureFormData.description}
                                        onChange={(e) => setLectureFormData({ ...lectureFormData, description: e.target.value })}
                                        type="text"
                                        placeholder="Lecture Description"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <label htmlFor="isPreview" className="block text-sm font-semibold mb-2">Is this Lecture a preview?</label>
                                <div className="relative group">
                                    <Settings2 size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <button
                                        id="isPreview"
                                        onClick={() => setIsPreview(!isPreview)}
                                        type="button"
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 border-b-4 border-violet-300"
                                    >
                                        {isPreview ? "Yes" : "No"}
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                    {error && <div className="w-full">
                        <p className="text-red-500">{error}</p>
                    </div>}

                    {message && <div className="w-full">
                        <p className="text-green-500">{message}</p>
                    </div>}
                    
                    <div className="w-full">
                        <div className="group">
                            <button 
                                className="flex items-center justify-center gap-2 py-4 px-6 w-full font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300 border-b-4 border-r-4 from-violet-600 via-violet-500 to-violet-600 rounded-xl"
                                type="submit"
                                >
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                    
                </form>
            </section>
        </main>
    </div>
  )
}

export default CreateLecture