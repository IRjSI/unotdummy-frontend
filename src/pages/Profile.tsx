import axios from "axios"
import { ChevronLeft, Image, NotebookPen, TriangleAlert, User, User2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AuthContext, type AuthContextProps } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

interface IData {
    avatar: string,
    email: string,
}

interface IFormData {
    name: string,
    bio: string
}

const DeleteConfirmation = ({ setDeletePage, setLoading, setError }: any) => {
    const deleteAccount = async () => {
        setLoading(true)
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/account`)
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
            setError("")
        }
    } 

    const noHandler = () => {
        setDeletePage(false)
    }

    return (
        <div className="relative z-10">
            <div className="bg-white p-4 rounded-xl shadow w-full h-full">
                <h2 className="block text-xl font-semibold mb-4">
                    Are you sure?
                </h2>
                <div className="flex items-center gap-4">
                    <button onClick={deleteAccount} className="text-white bg-red-500 px-4 py-2 rounded-lg">Yes</button>
                    <button onClick={noHandler} className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg">No</button>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    const { user, fetchUser } = useContext(AuthContext) as AuthContextProps
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [deletePage, setDeletePage] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [data, setData] = useState<IData>()
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        bio: "",
    })

    const [avatar, setAvatar] = useState<File | null>(null)

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")
        try {
            const form = new FormData()

            form.append("avatar", avatar ?? "")
            form.append("name", formData.name)
            form.append("bio", formData.bio)

            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, form)

            if (!res.data.success) {
                setError("update failed")
                return
            }

            setMessage("Updated Successfully!")
            setData(res.data.data)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const sendPasswordResetMail = async () => {
        setLoading(false)
        setMessage("")
        setError("")
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`, { email: data?.email })

            if (res.data.success) {
                setMessage("Check your mail for the reset link")
            } else {
                setError("error sending mail")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            setError("")
            setMessage("")
            try {
                await fetchUser()
    
                setFormData({
                    name: user.name,
                    bio: user.bio,
                })
    
                setData({
                    avatar: user.avatar,
                    email: user.email
                })
            } catch (error) {
                setError("error fetching details")
            }
        }

        fetchProfile()
    
    }, [])


  return (
    <div className="min-h-screen flex w-screen p-4">
        <main className="relative flex items-center justify-center w-full">
            <div className="absolute top-4 left-4">
                <button
                    className="flex items-center bg-violet-500  p-4 rounded-xl hover:bg-violet-500/20 hover:text-violet-500 text-white transition-all duration-300"
                    onClick={() => navigate("/")}
                    title="back"
                >
                    <ChevronLeft size={20} className="" />
                </button>
            </div>

            <section className="container mx-auto flex flex-col items-center justify-center max-w-4xl">

                <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-300 px-8 py-6 w-full rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <User2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Profile</h1>
                            <p className="text-violet-100 text-sm">Update your profile details</p>
                        </div>
                    </div>
                </div>
                
                <form className="text-violet-950 flex flex-col items-center justify-center space-y-4 bg-white/50 rounded-b-xl border border-violet-300 p-4 md:p-12 lg:p-16 border-b-4 border-r-4 w-full" onSubmit={submitHandler}>

                    <div className="w-full flex flex-col-reverse gap-4">

                        <div className="w-full space-y-4">

                            <div className="w-full">
                                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                                <div className="relative group">
                                    <User size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        name="name"
                                        value={formData?.name ? formData.name : ""}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                                        type="text"
                                        placeholder="Your name"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                        />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="bio" className="block text-sm font-semibold mb-2">Bio</label>
                                <div className="relative group">
                                    <NotebookPen size={20} className="absolute top-8 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <textarea
                                        name="bio"
                                        value={formData?.bio ? formData.bio: ""}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value})}
                                        placeholder="Tell about yourself..."
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full h-[200px] border-b-4 border-violet-300 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <button type="submit" onClick={sendPasswordResetMail} className="text-sm text-violet-500 hover:underline cursor-pointer">change password</button>
                            </div>
                            
                        </div>

                        <div className="w-full space-y-4">
                            
                            <div className="w-full">
                                <div className="flex items-center justify-center p-4">
                                    {data?.avatar && (
                                        <div className="w-48 h-48">
                                            <img src={data.avatar} className="w-full h-full rounded-full object-cover shadow-xl shadow-violet-100" alt="" />
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="thumbnail" className="block text-sm font-semibold mb-2">Avatar</label>
                                <div className="relative group">
                                    <Image size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        name="thumbnail"
                                        //@ts-expect-error
                                        onChange={(e) => setAvatar(e.target.files?.[0])}
                                        type="file"
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                    
                    {error && <div className="w-full text-center">
                        <p className="text-red-500">{error}</p>
                    </div>}

                    {message && <div className="w-full text-center">
                        <p className="text-green-500">{message}</p>
                    </div>}
                    
                    <div className="w-full">
                        <div className="group">
                            <button 
                                className="flex items-center justify-center gap-2 py-4 px-6 w-full font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300 border-b-4 border-r-4 from-violet-600 via-violet-500 to-violet-600 rounded-xl disabled:from-violet-400 border-violet-900 disabled:via-violet-500 disabled:to-violet-400"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                    
                </form>

                <div className="bg-violet-200/20 border border-r-4 border-b-4 border-red-500 rounded-xl w-full flex flex-col items-center space-y-4 mt-4">
                    <div className="bg-red-300/80 px-2 py-6 rounded-t-xl text-red-500 flex items-center justify-center gap-2 w-full font-semibold">
                        Danger Zone <TriangleAlert size={16} />
                    </div>

                    <div>
                        {!deletePage ? 
                            <button 
                                className="mb-4 p-4 bg-red-500 rounded-xl text-white"
                                onClick={() => setDeletePage(!deletePage)}    
                            >
                                Delete Account
                            </button>
                        :
                            <div className="mb-4">
                                <div className="h-full w-full">
                                    <DeleteConfirmation setLoading={setLoading} setDeletePage={setDeletePage} setError={setError} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
            </section>
        </main>
    </div>
  )
}


export default Profile