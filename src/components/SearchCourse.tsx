import axios from "axios"
import { ChevronDown, Search, Settings2, SortDesc, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchCourse = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        query: "",
        category: "",
        level: "",
        priceRange: "",
        sortBy: "newest"
    })

    const categories = [
        "category",
        "web development",
        "app development",
        "web design",
        "video editing",
        "photo editing",
        "business models",
        "content creation",
    ]

    const levels = [
        "level",
        "beginner",
        "intermediate",
        "advanced"
    ]

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/search?query=${formData.query}&category=${formData.category}&level=${formData.level}&priceRange=${formData.priceRange}&sortBy=${formData.sortBy}`)

            if (res.data.success) {
                navigate("/search-result", { state: { data: res.data.data } })
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="flex p-4">
        <main className="relative w-full">
            <section className="container mx-auto flex justify-center">
                <form className="text-violet-950 max-w-4xl w-full" onSubmit={submitHandler}>
                    <div className="w-full gap-4 space-y-2">

                        <div className="w-full">
                            <div className="relative group flex">

                                <Search size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <input
                                    value={formData.query}
                                    onChange={(e) => setFormData({ ...formData, query: e.target.value})}
                                    type="text"
                                    placeholder="Search Courses..."
                                    className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                />
                                <button 
                                    className={`absolute top-1/2 right-4 -translate-y-1/2 p-2 ${formData.query ? "bg-violet-300" : "bg-violet-200"} rounded-xl`} 
                                    disabled={formData.query === ""}
                                >
                                    <Search size={20} className="text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                </button>
                            </div>
                        </div>

                        {formData.query !== "" && <div className="w-full flex items-center gap-2">
                            <div className="relative group w-full">

                                <Settings2 size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <select
                                    name="level"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                                >
                                    {categories.length > 0 && categories.map((category, key) => (
                                        <option value={category} key={key}>{category}</option>
                                    ))}
                                </select>
                                <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />

                            </div>

                            <div className="relative group w-full">

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

                            <div className="relative group w-full">

                                <Settings2 size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <select
                                    name="priceRange"
                                    value={formData.priceRange}
                                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                    className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                                >
                                    <option value="" disabled>price range</option>
                                    <option value="500-1000">500-1000</option>
                                    <option value="1000-2000">1000-2000</option>
                                    <option value="2000-3000">2000-3000</option>
                                </select>
                                <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />

                            </div>

                            <div className="relative group w-full">

                                <SortDesc size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                <select
                                    name="sortBy"
                                    value={formData.sortBy}
                                    onChange={(e) => setFormData({ ...formData, sortBy: e.target.value })}
                                    className="pl-12 pr-4 py-4 bg-violet-100 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300 appearance-none"
                                >
                                    <option value="newest">newest</option>
                                    <option value="price-high">price-high</option>
                                    <option value="price-low">price-low</option>
                                    <option value="oldest">oldest</option>
                                </select>
                                <ChevronDown size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />

                            </div>
                        </div>}

                        <div className="w-full">
                            
                        </div>
                    </div>
                </form> 
            </section>
        </main>
    </div>
  )
}

export default SearchCourse 