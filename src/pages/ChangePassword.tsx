import axios from "axios"
import { ChevronLeft, Eye, EyeClosed, Lock } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/change-password`, formData)

            if (res.data.message == "password incorrect") {
                setError(res.data.message)
                return
            }
            setMessage("password updated")
        } catch (error: any) {
            console.log(error)
            setError(error.response.data.message)
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
                    onClick={() => navigate("/profile")}
                    title="back"
                >
                    <ChevronLeft size={20} className="" />
                </button>
            </div>
            <section className="container mx-auto flex flex-col items-center justify-center max-w-2xl">
                <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-violet-300 px-8 py-6 w-full rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Lock size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Password</h1>
                            <p className="text-violet-100 text-sm">Update your password</p>
                        </div>
                    </div>
                </div>
                <form className="text-violet-950 flex flex-col items-center justify-center space-y-4 bg-white/50 rounded-b-xl border border-violet-300 p-4 md:p-12 lg:p-16 border-b-4 border-r-4 w-full" onSubmit={submitHandler}>
                    <div className="w-full flex flex-col-reverse items-center justify-center md:flex-row gap-4">

                        <div className="space-y-4 w-full">
                            <div className="">
                                <label htmlFor="password" className="block text-sm font-semibold mb-2">Current Password</label>
                                <div className="relative group">
                                    <Lock size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        id="password"
                                        value={formData.oldPassword}
                                        onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value})}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="current password"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    />
                                    {showPassword ? <Eye onClick={() => setShowPassword(false)} size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" /> : <EyeClosed onClick={() => setShowPassword(true)} size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />}
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">Confirm Password</label>
                                <div className="relative group">
                                    <Lock size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />
                                    <input
                                        id="confirmPassword"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value})}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="new password"
                                        required
                                        className="pl-12 pr-4 py-4 bg-violet-300/20 text-violet-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 w-full border-b-4 border-violet-300"
                                    />
                                    {showPassword ? <Eye onClick={() => setShowPassword(false)} size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" /> : <EyeClosed onClick={() => setShowPassword(true)} size={20} className="absolute top-1/2 right-4 -translate-y-1/2 text-violet-950/50 group-focus-within:text-violet-950 transition-colors duration-300" />}
                                </div>
                            </div>

                            {error && (
                                <div className="text-center text-red-500">
                                    {error}
                                </div>
                            )}
                            
                            {message && (
                                <div className="text-center text-green-500">
                                    {message}
                                </div>
                            )}

                            <div className="">
                                <div className="group">
                                    <button 
                                        className="flex items-center justify-center gap-2 py-4 px-6 w-full font-semibold text-lg bg-gradient-to-r hover:scale-105 transition-all duration-300 border-b-4 border-r-4 border-violet-900 from-violet-600 via-violet-500 to-violet-600 rounded-xl disabled:from-violet-400 disabled:via-violet-500 disabled:to-violet-400"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </div>
  )
}

export default ChangePassword